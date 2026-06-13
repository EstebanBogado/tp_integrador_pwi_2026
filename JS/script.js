document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");

    const radios = document.querySelectorAll('input[name="tipo-viaje"]');
    const fechaVueltaGroup = document.getElementById("grupo-fecha-vuelta");
    const fechaVueltaInput = document.getElementById("fecha-vuelta");
    const fechaVueltaLabel = document.querySelector('label[for="fecha-vuelta"]');

    radios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "solo-ida") {
                fechaVueltaInput.style.display = "none";
                fechaVueltaLabel.style.display = "none";
                fechaVueltaInput.removeAttribute("required");
            } else {
                fechaVueltaGroup.style.display = "block";
                fechaVueltaInput.style.display = "block";
                fechaVueltaLabel.style.display = "block";
                fechaVueltaInput.setAttribute("required", "true");
            }
        });
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const tipoViaje = document.querySelector('input[name="tipo-viaje"]:checked').value;
        const origen = document.getElementById("desde").value;
        const destino = document.getElementById("destino").value;
        const fechaSalida = document.getElementById("fecha-salida").value;
        const fechaVuelta = fechaVueltaInput.value;
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
