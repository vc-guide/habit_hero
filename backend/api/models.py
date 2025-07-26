from django.db import models
from django.contrib.auth.models import User
from datetime import date

# Create your models here.
class Habit(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  habit_name = models.CharField(max_length = 150)
  habit_frequency = models.CharField(max_length = 100)
  habit_category = models.CharField(max_length =  100)
  habit_start_date = models.DateField()
  
  def __str__(self):
    return self.habit_name
  
class Habitlog(models.Model):
  habit = models.ForeignKey(Habit, on_delete = models.CASCADE, related_name = "logs")
  date = models.DateField(default=date.today)
  CHOICES = (('completed','COMPLETED'),('not_completed','NOT COMPLETED'),)
  status = models.CharField(max_length =50, choices = CHOICES)
  description = models.TextField(blank=True, null=True)
  
  class Meta:
    unique_together = ['habit', 'date']