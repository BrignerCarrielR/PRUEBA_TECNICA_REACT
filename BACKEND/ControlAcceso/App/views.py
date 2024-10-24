from rest_framework import viewsets, status
from .models import Residente, Visitante, EstadisticasVisitas
from .serializer import ResidenteSerializer, VisitanteSerializer, EstadisticasVisitasSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Residente
from rest_framework.views import APIView


class ResidenteViewSet(viewsets.ModelViewSet):
    queryset = Residente.objects.all()
    serializer_class = ResidenteSerializer


class VisitanteViewSet(viewsets.ModelViewSet):
    queryset = Visitante.objects.all()
    serializer_class = VisitanteSerializer


class EstadisticasVisitasViewSet(viewsets.ModelViewSet):
    queryset = EstadisticasVisitas.objects.all()
    serializer_class = EstadisticasVisitasSerializer


class LoginResidenteView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        nombre = request.data.get('nombre')
        numero_identificacion = request.data.get('numero_identificacion')

        # Validar que ambos campos se hayan proporcionado
        if not nombre or not numero_identificacion:
            return Response(
                {"detail": "Nombre y número de identificación son requeridos."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verificar si el residente existe
        existe = Residente.objects.filter(
            nombre=nombre,
            numero_identificacion=numero_identificacion
        ).exists()

        return Response({"existe": existe}, status=status.HTTP_200_OK)
