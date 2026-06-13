document.addEventListener("DOMContentLoaded", function () {
    // Obtener valores guardados en localStorage
    const origen = localStorage.getItem("origen");
    const destino = localStorage.getItem("destino");
    const fechaSalida = localStorage.getItem("fechaSalida");
    const fechaVuelta = localStorage.getItem("fechaVuelta");

    // Seleccionar los elementos del aside
    const selects = document.querySelectorAll(".form-vuelos select");
    const inputs = document.querySelectorAll(".form-vuelos input");

    // Rellenar "Desde" (primer select)
    if (origen) {
        selects[0].value = origen;
    }

    // Rellenar "Destino" (segundo select)
    if (destino) {
        selects[1].value = destino;
    }

    // Rellenar fechas (inputs tipo date)
    if (fechaSalida) {
        inputs[0].value = fechaSalida;
    }
    if (fechaVuelta) {
        inputs[1].value = fechaVuelta;
    }
});
