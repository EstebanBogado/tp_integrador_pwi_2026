document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");

    const radios = document.querySelectorAll('input[name="tipo-viaje"]');
    const fechaVueltaInput = document.getElementById("fecha-vuelta");
    const fechaVueltaGroup = fechaVueltaInput.closest(".form-group");

    // Mostrar/ocultar fecha vuelta según tipo de viaje
    radios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "solo-ida") {
                fechaVueltaGroup.style.display = "none";
                fechaVueltaInput.removeAttribute("required");
                fechaVueltaInput.value = "";
            } else {
                fechaVueltaGroup.style.display = "flex";
                fechaVueltaInput.setAttribute("required", "true");
            }
        });
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const tipoViaje = document.querySelector('input[name="tipo-viaje"]:checked');
        const origen = document.getElementById("desde").value;
        const destino = document.getElementById("destino").value;
        const fechaSalida = document.getElementById("fecha-salida").value;
        const fechaVuelta = fechaVueltaInput.value;
        const pasajeros = document.getElementById("pasajeros").value;
        const clase = document.getElementById("clase").value;
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        //  Validar que origen y destino no sean iguales
        if (origen === destino) {
            alert("El origen y el destino no pueden ser iguales.");
            return;
        }

        // Validar fecha de ida (no puede ser en el pasado)
        const dSalida = new Date(fechaSalida + "T00:00:00");
        if (dSalida < hoy) {
            alert("La fecha de ida no puede ser anterior a hoy.");
            return;
        }

        // Validar fecha de vuelta solo si el viaje es ida y vuelta
        if (tipoViaje.value === "ida-vuelta") {
            const dVuelta = new Date(fechaVuelta + "T00:00:00");
            if (dVuelta <= dSalida) {
                alert("La fecha de vuelta debe ser posterior a la fecha de ida.");
                return;
            }
        }
        // guardar en localStorage y redirigir
        localStorage.setItem("tipoViaje", tipoViaje.value);
        localStorage.setItem("origen", origen);
        localStorage.setItem("destino", destino);
        localStorage.setItem("fechaSalida", fechaSalida);
        localStorage.setItem("fechaVuelta", fechaVuelta);
        localStorage.setItem("pasajeros", pasajeros);
        localStorage.setItem("clase", clase);

        window.location.href = "../PAGES/resultado busqueda.html";
    });
});