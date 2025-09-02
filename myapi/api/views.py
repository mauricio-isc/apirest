from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Producto
from .serializer import ProductoSerializer
from django.http import HttpResponse

class ProductoViewSet(viewsets.ModelViewSet):
    querySet = Producto.objects.all()
    serializer_class = ProductoSerializer

    @action(detail= False, methods=['get'])
    def con_stock(self, request):
        """Endpoint perzonalizado para productos con stock"""
        productos = Producto.objects.filter(stock__gt=0)
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

    @action(detail=True, methodss=['post'])
    def ajustar_stock(self, request, pk=None):
        """Endpoint para ajustar stock de un producto"""
        producto = self.get_object()
        cantidad = request.data.get('cantidad', 0)

        try:
            cantidad = int(cantidad)
            producto.stock += cantidad
            producto.save()
            return Response({'status': 'stock actualizado', 'nuevo_stock': producto.stock})
        except ValueError:
            return Response({'error': 'Cantidad debe ser un numero'}, status=status.HTTP_400_BAD_REQUEST)