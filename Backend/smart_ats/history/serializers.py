from rest_framework import serializers
from .models import ResumeScoreHistory

class ResumeScoreHistorySerializer(serializers.ModelSerializer):
    resume_file_url = serializers.SerializerMethodField()
    jd_file_url = serializers.SerializerMethodField()

    class Meta:
        model = ResumeScoreHistory
        fields = [
            'id', 'resume_file_url', 'jd_file_url', 'resume_text', 'job_description', 'score',
            'missing_skills', 'suggestions', 'created_at'
        ]

    def get_resume_file_url(self, obj):
        if obj.resume_file:
            return obj.resume_file.url
        return None

    def get_jd_file_url(self, obj):
        if obj.jd_file:
            return obj.jd_file.url
        return None