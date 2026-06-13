document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const tipoViaje = document.querySelector('input[name="tipo-viaje"]:checked').value;
        const origen = document.getElementById("desde").value;
        const destino = document.getElementById("destino").value;
        const fechaSalida = document.getElementById("fecha-salida").value;
        const fechaVuelta = document.getElementById("fecha-vuelta").value;
        const pasajeros = document.getElementById("pasajeros").value;
        const clase = document.getElementById("clase").value;

        localStorage.setItem("tipoViaje", tipoViaje);
        localStorage.setItem("origen", origen);
        localStorage.setItem("destino", destino);
        localStorage.setItem("fechaSalida", fechaSalida);
        localStorage.setItem("fechaVuelta", fechaVuelta);
        localStorage.setItem("pasajeros", pasajeros);
        localStorage.setItem("clase", clase);

        window.location.href = "../PAGES/resultado busqueda.html";
    });
});
