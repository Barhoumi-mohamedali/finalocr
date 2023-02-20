from rest_framework import serializers

from socks.models import docs

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = docs
        fields = "__all__"