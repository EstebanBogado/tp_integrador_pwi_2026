document.addEventListener("DOMContentLoaded", function () {
    const origen = localStorage.getItem("origen");
    const destino = localStorage.getItem("destino");
    const fechaSalida = localStorage.getItem("fechaSalida");
    const fechaVuelta = localStorage.getItem("fechaVuelta");

    const selects = document.querySelectorAll(".form-vuelos select");
    const inputs = document.querySelectorAll(".form-vuelos input");

    if (origen) {
        selects[0].value = origen;
    }
    if (destino) {
        selects[1].value = destino;
    }
    if (fechaSalida) {
        inputs[0].value = fechaSalida;
    }
    if (fechaVuelta) {
        inputs[1].value = fechaVuelta;
    }
});
