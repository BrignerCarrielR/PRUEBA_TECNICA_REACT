from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from App.views import ResidenteViewSet, VisitanteViewSet, EstadisticasVisitasViewSet, LoginResidenteView

# Configurar el router
router = DefaultRouter()
router.register(r'residentes', ResidenteViewSet)
router.register(r'visitantes', VisitanteViewSet)
router.register(r'estadisticas-visitas', EstadisticasVisitasViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),  # Incluye las rutas del router
    path('login/', LoginResidenteView.as_view(), name='login_residente'),
]