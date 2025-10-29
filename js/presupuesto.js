/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function () {
  const producto = document.getElementById("producto");
  const plazo = document.getElementById("plazo");
  const extras = document.querySelectorAll(".extras");
  const presupuestoFinal = document.getElementById("presupuestoFinal");

  const form = document.getElementById("formPresupuesto");

  function calcularPresupuesto() {
    let precioBase = parseFloat(producto.value)|| 0;
    let plazoValue = parseInt(plazo.value);
    let extrasTotal = 0;

    extras.forEach(extra => {
      if (extra.checked) extrasTotal += parseFloat(extra.value);
    });

    let total = precioBase + extrasTotal;

    // Descuento según plazo
    if (plazoValue >= 6) total *= 0.9; // 10% descuento
    if (plazoValue >= 12) total *= 0.8; // 20% descuento

    presupuestoFinal.textContent = total.toFixed(2) + "€";
  }

  producto.addEventListener("change", calcularPresupuesto);
  plazo.addEventListener("input", calcularPresupuesto);
  extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validación simple
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const condiciones = document.getElementById("condiciones").checked;

    if (!/^[A-Za-z]{1,15}$/.test(nombre)) {
      alert("Nombre inválido");
      return;
    }
    if (!/^[A-Za-z\s]{1,40}$/.test(apellidos)) {
      alert("Apellidos inválidos");
      return;
    }
    if (!/^\d{9}$/.test(telefono)) {
      alert("Teléfono inválido");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Email inválido");
      return;
    }
    if (!condiciones) {
      alert("Debes aceptar las condiciones");
      return;
    }

    alert("Formulario enviado ✅\nPresupuesto final: " + presupuestoFinal.textContent);
  });

  calcularPresupuesto();
});