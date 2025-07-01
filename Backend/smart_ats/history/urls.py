from django.urls import path
from .views import ResumeScoreAPIView, ResumeScoreHistoryAPIView

urlpatterns = [
    path('resume-score/', ResumeScoreAPIView.as_view(), name='resume-score'),
    path('history/', ResumeScoreHistoryAPIView.as_view(), name='resume-score-history'),
]