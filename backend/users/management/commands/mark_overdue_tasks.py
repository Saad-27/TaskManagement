from django.core.management.base import BaseCommand
from users.models import Task

class Command(BaseCommand):
    help = 'Mark overdue tasks'

    def handle(self, *args, **kwargs):
        tasks = Task.objects.all()
        for task in tasks:
            task.mark_as_overdue()
        self.stdout.write(self.style.SUCCESS('Successfully marked overdue tasks'))