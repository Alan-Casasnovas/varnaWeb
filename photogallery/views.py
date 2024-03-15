from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Photo
from .forms import PhotoForm


def photo_list(request):
    photos = Photo.objects.all()
    return render(request, "photo_list.html", {"photos": photos})


def photo_detail(request, pk):
    photo = get_object_or_404(Photo, pk=pk)
    return render(request, "photo_detail.html", {"photo": photo})


@login_required
def add_photo(request):
    if request.method == "POST":
        form = PhotoForm(request.POST, request.FILES)
        if form.is_valid():
            photo = form.save(commit=False)
            photo.user = request.user
            photo.save()
            return redirect("photo_detail", pk=photo.pk)
    else:
        form = PhotoForm()
    return render(request, "add_photo.html", {"form": form})


@login_required
def delete_photo(request, pk):
    photo = get_object_or_404(Photo, pk=pk)
    if photo.user == request.user:
        photo.delete()
    return redirect("photo_list")
