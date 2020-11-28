from django.db import models
from django.conf import settings


class Tag(models.Model):
    tagID = models.AutoField(primary_key=True)
    tagName = models.CharField(max_length=15)

    def __str__(self):
        return self.tagName


class Post(models.Model):
    postID = models.AutoField(primary_key=True)
    postTitle = models.CharField(max_length=100)
    content = models.TextField(max_length=20000)
    image = models.ImageField(upload_to='post_images/')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.postTitle + '@' + self.owner.username + ' ' + str(self.created)


class PostTag(models.Model):
    postID = models.ForeignKey(Post, on_delete=models.CASCADE)
    tagID = models.ForeignKey(Tag, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.postID) + ' ' + str(self.tagID)


class UserBio(models.Model):
    bio = models.TextField(max_length=500, default='Hello, i am a user of BlogIt.')
    pfp = models.ImageField(upload_to='user_images/', default='user_images/defa.jpg')
    bioID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        if len(self.bio) > 20:
            b = self.bio[:20]
        else:
            b = self.bio

        if not self.pfp:
            p = False
        elif self.pfp is None:
            p = None
        else:
            p = True

        return str(b) + ' ' + str(p)
