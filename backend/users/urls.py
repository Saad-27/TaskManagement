from django.urls import path
from .views import (
    RegisterView, LoginView, task_management_view, ProjectListView, ProjectCreateView, 
    TaskListView, TaskCreateView, TaskDetailView, CompletedTasksView, OverdueTasksView, 
    TaskCompleteView, TaskDeleteView, TaskDetailAPIView
)

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/projects/', ProjectListView.as_view(), name='project_list'),
    path('api/projects/new/', ProjectCreateView.as_view(), name='project_create'),
    path('api/tasks/', TaskListView.as_view(), name='task_list'),
    path('api/tasks/new/', TaskCreateView.as_view(), name='task_create'),
    path('api/tasks/<int:task_id>/', TaskDetailAPIView.as_view(), name='task_detail'),
    path('api/tasks/<int:task_id>/delete/', TaskDeleteView.as_view(), name='task_delete'),
    path('api/tasks/<int:task_id>/complete/', TaskCompleteView.as_view(), name='task_complete'),
    path('api/analytics/tasks/completed/', CompletedTasksView.as_view(), name='completed_tasks'),
    path('api/analytics/tasks/overdue/', OverdueTasksView.as_view(), name='overdue_tasks'),
]
