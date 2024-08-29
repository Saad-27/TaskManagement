from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model, authenticate  # Import get_user_model and authenticate
from .serializers import UserSerializer, LoginSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

def task_management_view(request):
    return render(request, 'task_management.html')

from django.views import View

class ProjectListView(View):
    def get(self, request):
        return render(request, 'projects/project_list.html')

class ProjectCreateView(View):
    def get(self, request):
        return render(request, 'projects/project_form.html')

class TaskListView(View):
    def get(self, request):
        return render(request, 'tasks/task_list.html')

class TaskCreateView(View):
    def get(self, request):
        return render(request, 'tasks/task_form.html')

class TaskDetailView(View):
    def get(self, request, task_id):
        return render(request, 'tasks/task_detail.html', {'task_id': task_id})

from django.http import JsonResponse
from django.views import View
from .models import Task
from .utils import send_notification

class TaskCompleteView(View):
    def post(self, request, task_id):
        task = Task.objects.get(id=task_id)
        task.status = 'completed'
        task.save()
        return JsonResponse({'message': 'Task marked as complete'})

class OverdueTasksView(View):
    def get(self, request):
        overdue_tasks = Task.objects.filter(status='overdue')
        return JsonResponse({'tasks': list(overdue_tasks.values())})
