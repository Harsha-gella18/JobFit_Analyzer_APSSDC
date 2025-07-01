from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import ResumeScoreHistory
from .serializers import ResumeScoreHistorySerializer
from PyPDF2 import PdfReader
from groq import Groq
import os

def extract_text_from_pdf(pdf_file):
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

def build_prompt(resume_text, jd_text):
    return (
        "You are an expert ATS resume analyzer.\n"
        "Given the following resume and job description, do the following:\n"
        "1. Give a resume match score out of 100 based on how well the resume matches the job description.\n"
        "2. List the missing skills or keywords from the resume that are present in the job description.\n"
        "3. Suggest improvements for the resume to better match the job description.\n"
        "Return your answer in this JSON format:\n"
        "{\n"
        "  \"score\": <number>,\n"
        "  \"missing_skills\": [<list of strings>],\n"
        "  \"suggestions\": <string>\n"
        "}\n"
        "Resume:\n"
        f"{resume_text}\n"
        "Job Description:\n"
        f"{jd_text}\n"
    )

def call_groqai_gemma(resume_text, jd_text):
    api_key = os.getenv("GROQ_API_KEY")
    client = Groq(api_key=api_key)
    prompt = build_prompt(resume_text, jd_text)
    response = client.chat.completions.create(
    model="llama3-8b-8192",
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],
    temperature=1,
    max_tokens=1024,
    top_p=1,
    stream=False,
    stop=None,
)
    import json
    content = response.choices[0].message.content
    try:
        result = json.loads(content)
        score = float(result.get("score", 0))
        missing_skills = result.get("missing_skills", [])
        suggestions = result.get("suggestions", "")
        if not isinstance(missing_skills, list):
            missing_skills = []
        return {
            "score": score,
            "missing_skills": missing_skills,
            "suggestions": suggestions
        }
    except Exception:
        return {
            "score": 0,
            "missing_skills": [],
            "suggestions": "Could not parse model response."
        }

class ResumeScoreAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        resume_file = request.FILES.get('resume')
        jd_file = request.FILES.get('job_description')
        jd_text = request.data.get('job_description_text', '')

        if not resume_file:
            return Response({"error": "Resume file is required."}, status=400)

        resume_text = extract_text_from_pdf(resume_file)

        if jd_file:
            jd_text = extract_text_from_pdf(jd_file)
        elif not jd_text:
            return Response({"error": "Job description is required."}, status=400)

        result = call_groqai_gemma(resume_text, jd_text)

        history = ResumeScoreHistory.objects.create(
            user=None,
            resume_text=resume_text,
            job_description=jd_text,
            score=result["score"],
            missing_skills=result["missing_skills"],
            suggestions=result["suggestions"]
        )
        serializer = ResumeScoreHistorySerializer(history)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ResumeScoreHistoryAPIView(APIView):
    def get(self, request):
        history = ResumeScoreHistory.objects.all().order_by('-created_at')
        serializer = ResumeScoreHistorySerializer(history, many=True)
        return Response(serializer.data)