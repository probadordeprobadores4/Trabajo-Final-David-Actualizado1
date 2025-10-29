/* jshint esversion: 6 */
/* global L */

document.addEventListener("DOMContentLoaded", function () {
  // Coordenadas de la empresa (Plaza Mayor, Madrid)
  const empresaLatLng = [40.415363, -3.707398];

  // Inicializar mapa
  const map = L.map("map").setView(empresaLatLng, 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  // Marcador de la empresa
  L.marker(empresaLatLng)
    .addTo(map)
    .bindPopup("<b>NeoApps</b><br>Plaza Mayor, Madrid")
    .openPopup();

  // Función para dibujar la ruta usando OSRM
  function dibujarRuta(clienteLatLng, empresaLatLng) {
    const url = `https://router.project-osrm.org/route/v1/driving/${clienteLatLng[1]},${clienteLatLng[0]};${empresaLatLng[1]},${empresaLatLng[0]}?overview=full&geometries=geojson`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.routes && data.routes.length > 0) {
          // Dibujar ruta en el mapa
          const ruta = L.geoJSON(data.routes[0].geometry, {
            style: { color: "blue", weight: 4 }
          }).addTo(map);

          // Ajustar vista para que quepa toda la ruta
          map.fitBounds(ruta.getBounds());

          // Mostrar info de distancia y tiempo
          const summary = data.routes[0].legs[0];
          document.getElementById("ruta-info").innerHTML = `
            <p>Distancia: ${(summary.distance / 1000).toFixed(2)} km</p>
            <p>Duración estimada: ${(summary.duration / 60).toFixed(0)} min</p>
          `;
        }
      })
      .catch(() => alert("No se pudo calcular la ruta."));
  }

  // Obtener ubicación del usuario automáticamente
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const clienteLatLng = [
          position.coords.latitude,
          position.coords.longitude
        ];

        // Marcador del usuario
        L.marker(clienteLatLng)
          .addTo(map)
          .bindPopup("<b>Tu ubicación</b>")
          .openPopup();

        // Dibujar la ruta automáticamente
        dibujarRuta(clienteLatLng, empresaLatLng);
      },
      () => alert("No se pudo obtener tu ubicación. Activa la geolocalización.")
    );
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
});
