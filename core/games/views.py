from django.http import HttpResponse
from django.shortcuts import render

import datetime

# Create your views here.
def games_index(request):
    return render(request, "base.html")
