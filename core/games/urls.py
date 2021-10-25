from django.urls import path
from . import views


urlpatterns = [
    path("", views.games_index, name="games-home"),
    # path("ajax/read/", views.update_works, name="update_works"),
]