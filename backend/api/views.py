from django.shortcuts import render
from .models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import date, timedelta

# Create your views here.
class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer
  permission_classes = [AllowAny]
  
class HabitView(APIView):
  permission_classes = [IsAuthenticated]
  def post(self,request):
    serializer = HabitSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save(user=request.user)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
  
  def get(self,request):
    print("Authorization Header:", request.headers.get('Authorization'))
    print("user:", request.user)
    habits = Habit.objects.filter(user=request.user)
    serializer = HabitSerializer(habits, many= True)
    return Response(serializer.data)
  
class HabitTodayView(APIView):
  permission_classes = [IsAuthenticated]
  
  def get(self,request):
    user= request.user
    today_str = request.query_params.get('date')
    today = date.fromisoformat(today_str) if today_str else date.today()
    weekday_today = today.weekday()
    
    habits = Habit.objects.filter(user=user)
    response_data = []
    
    for habit in habits:
      if habit.habit_start_date > today:
        continue
      
      if habit.habit_frequency == "daily":
        pass
      elif habit.habit_frequency == "weekly":
        if habit.habit_start_date.weekday() != weekday_today:
          continue
        
        week_start = today - timedelta(days=today.weekday())
        week_end = week_start + timedelta(days=6)
        if Habitlog.objects.filter(habit=habit, date__range=(week_start, week_end)).exists():
          continue
        
      log = Habitlog.objects.filter(habit=habit, date=today).first()

      response_data.append({
          'id': habit.id,
          'name': habit.habit_name,
          'status': log.status if log else "not_completed",
      })
  
    return Response(response_data)
  
class HabitUpdateView(APIView):
  permission_classes = [IsAuthenticated]
  
  def post(self,request):
    user = request.user
    habit_id = request.data.get('habit_id')
    status_val = request.data.get('status')
    description = request.data.get('description', '')
    log_date = request.data.get('date', str(date.today()))
    
    try:
      habit = Habit.objects.get(id=habit_id, user = user)
    except Habit.DoesNotExist:
      return Response({"error": "Habit not found"}, status = 404)
    
    log, created = Habitlog.objects.get_or_create(habit=habit, date=log_date)
    log.status = status_val
    log.description = description
    log.save()
    
    return Response({"message": "Habit log updated"}, status =200)