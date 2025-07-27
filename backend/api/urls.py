from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
  path("api/register/", RegisterView.as_view()),
  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('habitview/',HabitView.as_view()),
  path('viewhabit/', HabitTodayView.as_view(),),
  path('habitlog/', HabitUpdateView.as_view()),
  path('habithistory/<int:habit_id>/', HabitHistoryView.as_view()),
]