from django.urls import path
from .views import RegisterView, LoginView, task_management_view, ProjectListView, ProjectCreateView, TaskListView, TaskCreateView, TaskDetailView, CompletedTasksView, OverdueTasksView, TaskCompleteView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('tasks/', task_management_view, name='task_management'),
    path('projects/', ProjectListView.as_view(), name='project_list'),
    path('projects/new/', ProjectCreateView.as_view(), name='project_create'),
    path('tasks/', TaskListView.as_view(), name='task_list'),
    path('tasks/new/', TaskCreateView.as_view(), name='task_create'),
    path('tasks/<int:task_id>/', TaskDetailView.as_view(), name='task_detail'),
    path('tasks/<int:task_id>/complete/', TaskCompleteView.as_view(), name='task_complete'),
    path('analytics/tasks/completed/', CompletedTasksView.as_view(), name='completed_tasks'),
    path('analytics/tasks/overdue/', OverdueTasksView.as_view(), name='overdue_tasks'),
]
