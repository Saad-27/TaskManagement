from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

# Create your models here.

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('in-progress', 'In Progress'), ('completed', 'Completed'), ('overdue', 'Overdue')], default='pending')
    deadline = models.DateTimeField()
    project = models.ForeignKey('Project', on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def mark_as_overdue(self):
        if self.status != 'completed' and self.deadline < timezone.now():
            self.status = 'overdue'
            self.save()
