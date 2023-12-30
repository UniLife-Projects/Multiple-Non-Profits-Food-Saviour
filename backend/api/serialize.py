from rest_framework import serializers
from api.models import users
from api.models import permissions
from api.models import posts
from api.models import tracker

# Insert - POST


class userSerialize(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = '__all__'


class passwordSerialize(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ['Email', 'Password']


class postSharedSerialize(serializers.ModelSerializer):
    class Meta:
        model = posts
        fields = ['shared_with']


class postNameSerialize(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ['FirstName', 'LastName']


class adminInsertSerialize(serializers.ModelSerializer):
    class Meta:
        model = permissions
        fields = '__all__'


class adminPullSerialize(serializers.ModelSerializer):
    class Meta:
        model = users
        exclude = ('Password',)


class adminUpdateSerialize(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ['Approve']


class networkInsertSerialize(serializers.ModelSerializer):
    class Meta:
        model = posts
        fields = '__all__'


class networkUpdateSerialize(serializers.ModelSerializer):
    class Meta:
        model = posts
        fields = ['state', 'shared_with']


class networkPullSerialize(serializers.ModelSerializer):
    class Meta:
        model = posts
        fields = '__all__'

# Update - PUT


class profileSerialize(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ['FirstName', 'LastName', 'Roles', 'Organization', 'Consent']


class trackerInsertSerialize(serializers.ModelSerializer):
    class Meta:
        model = tracker
        fields = '__all__'


class trackerPullSerialize(serializers.ModelSerializer):
    class Meta:
        model = tracker
        fields = '__all__'


class trackerUpdateSerialize(serializers.ModelSerializer):
    class Meta:
        model = tracker
        fields = '__all__'
