#  backend/api/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.TaskListCreate.as_view(), name='task-list'),  # GET & POST
    path('tasks/<int:pk>/', views.TaskUpdateDelete.as_view(), name='task-update-delete'),  # PATCH & DELETE
]
