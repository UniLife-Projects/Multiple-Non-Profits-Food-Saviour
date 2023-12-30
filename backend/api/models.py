
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import UserManager


class users(models.Model):
    FirstName = models.CharField(max_length=255)
    LastName = models.CharField(max_length=255)
    Email = models.EmailField(max_length=255, unique=True)
    Password = models.CharField(max_length=255, default='Password')
    Roles = models.CharField(max_length=255)
    Consent = models.CharField(max_length=50)
    Organization = models.CharField(max_length=255, null=True, blank=True)
    Approve = models.CharField(max_length=50, null=True)

    class Meta:
        db_table = "users"


class permissions(models.Model):
    id = models.AutoField(primary_key=True, default=1)
    role = models.CharField(max_length=255, null=True, blank=True)
    metrics = models.CharField(max_length=255, null=True, blank=True)
    network = models.CharField(max_length=10, null=True, blank=True)
    readwrite = models.CharField(max_length=10, null=True, blank=True)
    Organization = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = "permissions"


class posts(models.Model):
    product = models.CharField(max_length=255)
    Type = models.CharField(max_length=255)
    Quantity = models.IntegerField()
    Units = models.CharField(max_length=3)
    Description = models.CharField(max_length=255)
    Email = models.EmailField(max_length=255)
    date_time = models.DateTimeField(auto_now_add=True)
    state = models.CharField(max_length=255, default='open')
    shared_with = models.CharField(max_length=255, default='')
    id = models.AutoField(primary_key=True)
    public = models.CharField(max_length=255)

    class Meta:
        db_table = "posts"


class tracker(models.Model):
    Category = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    Quantity = models.FloatField()
    Qunits = models.CharField(max_length=255)
    amountToClients = models.FloatField()
    amountToAFeed = models.FloatField()
    amountToCompost = models.FloatField()
    amountToPartNet = models.FloatField()
    amountToLandfill = models.FloatField()
    percentClients = models.FloatField()
    percentAFeed = models.FloatField()
    percentCompost = models.FloatField()
    percentPartNet = models.FloatField()
    percentLandfill = models.FloatField()
    date_time = models.DateTimeField(auto_now_add=True)
    Email = models.EmailField(max_length=255)
    Organization = models.CharField(max_length=255, null=True)

    #Email = models.CharField(max_length=255)

    class Meta:
        db_table = "tracker"
