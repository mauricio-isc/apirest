from django.contrib import admin
from .models import Producto
# Register your models here.
@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'precio', 'stock', 'creado']
    list_filter = ['creado']
    search_fields = ['nombre', 'descripcion']