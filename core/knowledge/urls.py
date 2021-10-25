from django.urls import path
from . import views


urlpatterns = [
    path("", views.knowledge_index, name="knowledge-home"),
    # path("ajax/read/", views.update_works, name="update_works"),
]