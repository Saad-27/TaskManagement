from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, authenticate
from django.http import JsonResponse
from django.shortcuts import render
from .models import Task
from .serializers import UserSerializer, LoginSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

# --- User Registration and Login Views ---
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

# --- Views for Task Management ---
def task_management_view(request):
    return render(request, 'task_management.html')

class ProjectListView(APIView):
    def get(self, request):
        return render(request, 'projects/project_list.html')

class ProjectCreateView(APIView):
    def get(self, request):
        return render(request, 'projects/project_form.html')

class TaskListView(APIView):
    def get(self, request):
        return render(request, 'tasks/task_list.html')

class TaskCreateView(APIView):
    def get(self, request):
        return render(request, 'tasks/task_form.html')


# --- Task Detail API View (For Frontend JSON Handling) ---
class TaskDetailAPIView(APIView):
    def get(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
            serializer = TaskSerializer(task)
            return Response(serializer.data)
        except Task.DoesNotExist:
            return Response({"detail": "Task not found"}, status=status.HTTP_404_NOT_FOUND)


# --- Task Deletion API View ---
class TaskDeleteView(APIView):
    def delete(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
            task.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            return Response({"detail": "Task not found"}, status=status.HTTP_404_NOT_FOUND)


# --- Task Completion View ---
class TaskCompleteView(APIView):
    def post(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
            task.status = 'completed'
            task.save()
            return JsonResponse({'message': 'Task marked as complete'})
        except Task.DoesNotExist:
            return JsonResponse({'detail': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)


# --- Analytics Views ---
class CompletedTasksView(APIView):
    def get(self, request):
        completed_tasks = Task.objects.filter(status='completed')
        return JsonResponse({'tasks': list(completed_tasks.values())})

class OverdueTasksView(APIView):
    def get(self, request):
        overdue_tasks = Task.objects.filter(status='overdue')
        return JsonResponse({'tasks': list(overdue_tasks.values())})
