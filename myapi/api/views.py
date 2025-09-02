from rest_framework import viewsets
from .models import Producto
from .serializer import ProductoSerializer
from django.http import HttpResponse

def home(request):
        return HttpResponse("Bienvenido a mi Api ve a <a href= '/api/'>/api/</a> o "
        "<a href='/admin/'>/admin/</a>")
    
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

