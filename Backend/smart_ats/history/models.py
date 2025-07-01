from django.db import models
from django.conf import settings

# class ResumeScoreHistory(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='resume_scores')
#     resume_text = models.TextField()
#     job_description = models.TextField()
#     score = models.FloatField()
#     missing_skills = models.JSONField()
#     suggestions = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.email} - {self.created_at}"
    


from django.db import models
from django.conf import settings

class ResumeScoreHistory(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='resume_scores',
        null=True,
        blank=True
    )
    resume_text = models.TextField()
    job_description = models.TextField()
    score = models.FloatField()
    missing_skills = models.JSONField()
    suggestions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email if self.user else 'Anonymous'} - {self.created_at}"