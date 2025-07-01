from rest_framework import serializers
from .models import ResumeScoreHistory

class ResumeScoreHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeScoreHistory
        fields = [
            'id', 'resume_text', 'job_description', 'score',
            'missing_skills', 'suggestions', 'created_at'
        ]