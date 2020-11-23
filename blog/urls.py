from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from django.contrib.auth.decorators import login_required

from blog.views import *

app_name = 'blog'

urlpatterns = [
    path('', Home.as_view(), name='home'),
    # path('login/', Login.as_view()),
    # path('createpost/', login_required(NewPost.as_view(), login_url='/auth/login/google-oauth2/'), name='create'),
    path('createpost/', NewPost.as_view(), name='create_post'),
    path('viewpost/<int:pk>/', ViewPost.as_view(), name='view_post'),
    path('viewprofile/<int:pk>/', ViewProfile.as_view(), name='view_profile'),
    path('editprofile/<int:pk>/', EditProfile.as_view(), name='update_profile')

]
