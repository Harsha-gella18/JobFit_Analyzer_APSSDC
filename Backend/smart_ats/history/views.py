from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
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
        "You are an expert ATS (Applicant Tracking System) resume analyzer.\n"
        "Your job is to compare a candidate's resume with a job description and provide a detailed, objective evaluation.\n"
        "\n"
        "Instructions:\n"
        "1. Carefully read both the resume and the job description.\n"
        "2. Score the resume out of 100 based on these criteria:\n"
        "   - Skills match (40 points): How many required skills from the JD are present in the resume?\n"
        "   - Experience relevance (30 points): Does the candidate have relevant experience/projects for the JD?\n"
        "   - Education match (10 points): Does the education fit the JD requirements?\n"
        "   - Communication & formatting (10 points): Is the resume clear, well-structured, and free of major errors?\n"
        "   - Certifications/awards (10 points): Are there relevant certifications or achievements?\n"
        "3. List the most important missing skills or keywords from the resume that are present in the job description.\n"
        "4. Suggest specific improvements for the resume to better match the job description.\n"
        "\n"
        "Return your answer in this exact JSON format (no extra text):\n"
        "{\n"
        "  \"score\": <number>,\n"
        "  \"missing_skills\": [<list of strings>],\n"
        "  \"suggestions\": <string>\n"
        "}\n"
        "\n"
        "Example:\n"
        "{\n"
        "  \"score\": 78,\n"
        "  \"missing_skills\": [\"Docker\", \"CI/CD\", \"Unit Testing\"],\n"
        "  \"suggestions\": \"Add more details about your experience with software testing and deployment. Mention any CI/CD tools you have used.\"\n"
        "}\n"
        "\n"
        "Resume:\n"
        f"{resume_text}\n"
        "\n"
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
    print(response)

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
    permission_classes = [IsAuthenticated]
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
            user=request.user,
            resume_file=resume_file,
            jd_file=jd_file,
            resume_text=resume_text,
            job_description=jd_text,
            score=result["score"],
            missing_skills=result["missing_skills"],
            suggestions=result["suggestions"]
        )
        serializer = ResumeScoreHistorySerializer(history)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ResumeScoreHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        history = ResumeScoreHistory.objects.filter(user=request.user).order_by('-created_at')
        serializer = ResumeScoreHistorySerializer(history, many=True)
        return Response(serializer.data)