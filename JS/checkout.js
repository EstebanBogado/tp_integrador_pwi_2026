const vuelos = [
    { id: 1, compania: "Aerolineas Argentinas", origen: "BUE", destino: "MAD", precioBase: 1500, precioAmigo: 1000, costoEquipaje: 80 },
    { id: 2, compania: "Fly Bondi", origen: "BUE", destino: "MIA", precioBase: 980, precioAmigo: 750, costoEquipaje: 50 },
    { id: 3, compania: "Jet Smart", origen: "AEP", destino: "LIM", precioBase: 420, precioAmigo: 310, costoEquipaje: 40 },
    { id: 4, compania: "Aerolineas Argentinas", origen: "COR", destino: "GRU", precioBase: 600, precioAmigo: 480, costoEquipaje: 60 },
    { id: 5, compania: "Fly Bondi", origen: "BRC", destino: "MAD", precioBase: 1200, precioAmigo: 900, costoEquipaje: 80 },
    { id: 6, compania: "Jet Smart", origen: "BUE", destino: "GRU", precioBase: 350, precioAmigo: 270, costoEquipaje: 35 }
];

let totalFinal = 0;
let descuentoAplicado = 0;

// Inicializador general
document.addEventListener("DOMContentLoaded", () => {
    const idVuelo = parseInt(localStorage.getItem("vueloConfirmadoId") || localStorage.getItem("vueloSeleccionadoId"));
    const vuelo = vuelos.find(v => v.id === idVuelo);

    if (!vuelo) {
        alert("Error de sesión: No se seleccionó ningún vuelo.");
        window.location.href = "../index.html";
        return;
    }

    renderizarResumenVuelo(vuelo);
    gestionarAlternanciaPagos();
    configurarDescuento();
    configurarEnvioFormulario();
});

// Renderiza ruta, asiento y calcula importes cargados previamente
function renderizarResumenVuelo(vuelo) {
    const divResumen = document.getElementById("detalle-ruta-resumen");
    const asiento = localStorage.getItem("asientoSeleccionado") || "No seleccionado";
    const conEquipaje = localStorage.getItem("equipaje") === "true";

    // Determinamos tarifa base (Club amigo o estándar simulado)
    let tarifaBase = vuelo.precioAmigo; 
    let extraEquipaje = conEquipaje ? vuelo.costoEquipaje : 0;
    totalFinal = tarifaBase + extraEquipaje;

    divResumen.innerHTML = `
        <p><strong>Ruta:</strong> ${vuelo.origen} ➔ ${vuelo.destino}</p>
        <p><strong>Línea:</strong> ${vuelo.compania}</p>
        <p><strong>Asiento:</strong> ${asiento}</p>
        <p><strong>Equipaje adicional:</strong> ${conEquipaje ? "Sí" : "No"}</p>
    `;
    actualizarVistaTotal();
}

// Alternancia visual interactiva entre inputs de pago
function gestionarAlternanciaPagos() {
    const radioCredito = document.getElementById("credito");
    const radioTransf = document.getElementById("transferencia");
    const divTarjeta = document.getElementById("bloque-tarjeta");
    const divTransf = document.getElementById("bloque-transferencia");

    const cambiarMetodo = () => {
        if (radioCredito.checked) {
            divTarjeta.style.display = "block";
            divTransf.style.display = "none";
            alternarCamposObligatorios(divTarjeta, divTransf);
        } else {
            divTarjeta.style.display = "none";
            divTransf.style.display = "block";
            alternarCamposObligatorios(divTransf, divTarjeta);
        }
    };

    radioCredito.addEventListener("change", cambiarMetodo);
    radioTransf.addEventListener("change", cambiarMetodo);
    cambiarMetodo(); // Estado inicial
}

// Activa/desactiva el atributo 'required' según la solapa visible
function alternarCamposObligatorios(bloqueActivo, bloqueInactivo) {
    bloqueActivo.querySelectorAll("input").forEach(i => { if(i.id !== "telefono") i.required = true; });
    bloqueInactivo.querySelectorAll("input").forEach(i => { i.required = false; i.value = ""; });
}

// Controlador y validador de cupones de rebaja
function configurarDescuento() {
    document.getElementById("btn-cupon").addEventListener("click", () => {
        const codigo = document.getElementById("input-cupon").value.trim().toUpperCase();
        const txtMsg = document.getElementById("mensaje-cupon");

        if (codigo === "DESC10") {
            descuentoAplicado = totalFinal * 0.10;
            txtMsg.style.color = "green";
            txtMsg.textContent = "¡Cupón del 10% aplicado con éxito!";
        } else {
            descuentoAplicado = 0;
            txtMsg.style.color = "red";
            txtMsg.textContent = "Cupón inválido.";
        }
        actualizarVistaTotal();
    });
}

function actualizarVistaTotal() {
    const neto = totalFinal - descuentoAplicado;
    document.getElementById("total-monto").textContent = `$${neto.toFixed(2)}`;
}

// Captura final y validación general nativa HTML5 antes de disparar compra
function configurarEnvioFormulario() {
    document.getElementById("btn-pagar").addEventListener("click", () => {
        const form = document.getElementById("form-checkout");
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // 1. Obtener los datos del vuelo actual que guardamos en pasos anteriores
        const idVuelo = parseInt(localStorage.getItem("vueloConfirmadoId") || localStorage.getItem("vueloSeleccionadoId"));
        const vueloActual = vuelos.find(v => v.id === idVuelo);
        const asiento = localStorage.getItem("asientoSeleccionado") || "A1";
        const conEquipaje = localStorage.getItem("equipaje") === "true";

        // 2. Calcular el monto final neto cobrado en la interfaz
        const textoMonto = document.getElementById("total-monto").textContent; // Ejemplo: "$1080.00"
        
        // 3. Crear el objeto de la nueva reserva
        const nuevaReserva = {
            id: Date.now(), // Genera un ID único basado en tiempo
            origen: vueloActual ? vueloActual.origen : "BUE",
            destino: vueloActual ? vueloActual.destino : "MAD",
            compania: vueloActual ? vueloActual.compania : "FlyNow",
            precio: textoMonto,
            fecha: "18/06/2026 al 28/06/2026", // Fecha simulada acorde al contexto actual
            horario: vueloActual && vueloActual.salidaIda ? vueloActual.salidaIda : "12:00 PM",
            asiento: asiento,
            clase: "Económica",
            pasajero: document.getElementById("nombre").value
        };

        // 4. Traer el historial existente de localStorage o crear uno nuevo si está vacío
        let historial = JSON.parse(localStorage.getItem("historialReservas")) || [];
        
        // Agregamos la nueva reserva al principio de la lista
        historial.unshift(nuevaReserva);
        
        // Guardamos la lista actualizada
        localStorage.setItem("historialReservas", JSON.stringify(historial));

        // 5. Limpieza de variables de la compra actual y redirección directa
        localStorage.removeItem("asientoSeleccionado");
        window.location.href = "../PAGES/misreservas.html";
    });
}