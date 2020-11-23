from datetime import datetime
from time import time

from django.conf.urls import url
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.shortcuts import *

# Create your views here.
from django.views import View
from django.core.files.storage import FileSystemStorage, DefaultStorage, default_storage

from django.contrib.auth.models import User

from blog.models import *


class Home(View):
    def get(self, request):
        # user = get_object_or_404(User, pk=pk)
        if request.user.is_authenticated:
            owner = User.objects.filter(username=request.user)[0]
        try:
            userpfp = UserBio.objects.filter(bioID=owner)[0]
        except Exception:
            userpfp = None

        # posts = Post.objects.all().order_by('-created')
        # posts=PostTag.objects.prefetch_related('postID').order_by('-postID')

        posttags = PostTag.objects.all().order_by('-postID')

        posts = {}

        for i in posttags:
            if not posts.get(i.postID):
                posts[i.postID] = [i.tagID]
            else:
                posts[i.postID].append(i.tagID)

        # for k,v in posts.items():
        #     print(k.postTitle)
        #     for t in v:
        #         print(t)

        ctx = {'userpfp': userpfp, 'posts': posts}
        return render(request, 'blog/index.html', ctx)


class ViewPost(View):
    template = 'blog/blogpost.html'

    postModel = Post
    postTagModel = PostTag

    def get(self, request, pk):
        post = get_object_or_404(self.postModel, pk=pk)
        postTags = get_list_or_404(self.postTagModel, postID=pk)
        # user = User.objects.filter(pk=post.owner)
        try:
            user = User.objects.filter(username=request.user)[0]
            userpfp = UserBio.objects.filter(bioID=user)[0]
        except Exception:
            userpfp = None

        return render(request, self.template, {'post': post, 'postTags': postTags, 'userpfp': userpfp})


class NewPost(LoginRequiredMixin, View):
    login_url = '/auth/login/google-oauth2/'
    template = 'blog/createpost.html'

    postModel = Post
    postTagModel = PostTag
    tagModel = Tag

    def get(self, request):
        user = get_object_or_404(User, username=request.user)
        try:
            userpfp = UserBio.objects.filter(bioID=user)[0]
        except Exception:
            userpfp = None
        return render(request, self.template, {'userpfp': userpfp})

    def post(self, request):

        print(request.POST, '\n')
        print(request.FILES, '\n')
        title = request.POST['title']
        image = request.FILES.get('image')
        filename = image.name
        content = request.POST['content']
        taglist = ['nsfw', 'horror', 'sad', 'happy', 'love', 'cute']
        tags = []
        for tag in taglist:
            if request.POST.get(tag, None):
                tags.append(tag)

        print(title, image, filename, content, type(image))

        post = self.postModel(
            postTitle=title,
            image=image,
            content=content,
            owner=request.user,
        )
        post.save()

        for tag in tags:
            query = self.tagModel.objects.filter(tagName__iexact=tag)[0]

            posttag = self.postTagModel(
                tagID=query,
                postID=post
            )
            posttag.save()

        return redirect('blog:view_post', pk=post.pk)


class ViewProfile(View):

    def get(self, request, pk):
        template = 'blog/profile.html'

        user = get_object_or_404(User, pk=pk)
        try:
            userbio = UserBio.objects.filter(bioID=user)[0]
            userpfp = userbio
        except Exception:
            userbio = None
            userpfp = userbio

        posts = Post.objects.filter(owner=user).order_by('-created')
        try:
            latest = posts[0]
        except Exception:
            latest = None
        last_online = user.last_login
        # print(last_online)

        # print(posts)
        ctx = {}
        ctx['user'] = user
        ctx['userbio'] = userbio
        ctx['posts'] = posts
        ctx['latest'] = latest
        ctx['last_online'] = last_online
        ctx['userpfp'] = userpfp
        # print(userpfp.pfp)
        return render(request, template, ctx)


class EditProfile(LoginRequiredMixin, View):
    template = 'blog/updateprofile.html'

    def get(self, request, pk):
        owner = get_object_or_404(User, pk=pk)
        try:
            userpfp = UserBio.objects.filter(bioID=owner)[0]
        except Exception:
            userpfp = None
        # print(owner.id)
        if request.user.is_authenticated and request.user == owner:
            ctx = {'owner': owner, 'userpfp': userpfp}
            return render(request, self.template, ctx)
        else:
            return HttpResponse(request, "Not Authorised")

    def post(self, request, pk):
        print(request.POST)
        print(request.FILES)
        try:
            bio = request.POST.get('content') or UserBio.objects.get(bioID=pk).bio
        except Exception:
            bio = None
        try:
            pfp = request.FILES.get('image') or UserBio.objects.filter(bioID=pk)[0].pfp
        except Exception:
            pfp = None
        print(bio, pfp)
        user = UserBio.objects.filter(bioID=pk)

        if not user:
            print('creating a new userbio')
            user = UserBio(
                bio=bio,
                pfp=pfp,
                bioID=User.objects.filter(pk=pk)[0]
            )
            user.save()
            print('saved')
        else:
            print('updating')
            print(user[0].pfp)
            user = user[0]
            user.bio = bio
            print(pfp)
            user.pfp = pfp
            # user.bioID = User.objects.filter(pk=pk)[0]
            # user.pfp.save('name.png', pfp)
            user.save()
            print(user.pfp)
            print('updated')

        return redirect('blog:view_profile', pk=pk)
