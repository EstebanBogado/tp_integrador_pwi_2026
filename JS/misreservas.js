document.addEventListener("DOMContentLoaded", () => {
    renderizarReservas();
});

function renderizarReservas() {
    const contenedor = document.querySelector(".acordeon-contenedor");
    if (!contenedor) return;

    // 1. Obtener EXCLUSIVAMENTE las reservas reales del localStorage
    let historial = JSON.parse(localStorage.getItem("historialReservas")) || [];
    
    // 2. Si no hay ninguna reserva hecha, mostrar un mensaje amigable en vez de datos falsos
    if (historial.length === 0) {
        contenedor.innerHTML = `
            <div style="text-align: center; padding: 3em; color: #5e5d5d; background: white; border-radius: 0.5em; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <i class="fa-solid fa-ticket-simple" style="font-size: 3em; color: #5b8787; margin-bottom: 0.5em;"></i>
                <p style="font-weight: bold; font-size: 1.1em;">No tenés reservas activas en este momento.</p>
                <p style="font-size: 0.9em; margin-top: 0.5em;">Tus vuelos comprados aparecerán listados acá.</p>
            </div>
        `;
        return;
    }

    // Limpiar el contenedor por seguridad
    contenedor.innerHTML = "";

    // 3. Renderizar únicamente tus compras reales
    historial.forEach((reserva, index) => {
        const itemAcordeon = document.createElement("div");
        itemAcordeon.className = "acordeon-item";

        itemAcordeon.innerHTML = `
            <input type="checkbox" id="vuelo-${reserva.id || index}" class="acordeon-check">
            <label for="vuelo-${reserva.id || index}" class="acordeon-header">
                <div class="info-header">
                    <i class="fa-solid fa-plane"></i>
                    <span class="ruta-principal">${traducirCiudad(reserva.origen)} (${reserva.origen}) → ${traducirCiudad(reserva.destino)} (${reserva.destino})</span>
                </div>
                <div class="meta-header">
                    <span class="precio-badge">${reserva.precio}</span>
                    <i class="fa-solid fa-chevron-down flecha"></i>
                </div>
            </label>
            <div class="acordeon-body">
                <div class="detalle-reserva">
                    <p><strong><i class="fa-regular fa-calendar"></i> Fechas:</strong> ${reserva.fecha}</p>
                    <p><strong><i class="fa-regular fa-clock"></i> Horario:</strong> ${reserva.horario} (Salida)</p>
                    <p><strong><i class="fa-solid fa-chair"></i> Asiento / Clase:</strong> Asiento ${reserva.asiento} — Clase ${reserva.clase}</p>
                    ${reserva.pasajero ? `<p><strong><i class="fa-regular fa-user"></i> Pasajero:</strong> ${reserva.pasajero}</p>` : ''}
                    <p><strong><i class="fa-solid fa-building"></i> Operado por:</strong> ${reserva.compania}</p>
                    <hr>
                    <div class="total-vuelo">
                        <span>Total Pagado:</span>
                        <span class="monto">${reserva.precio}</span>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(itemAcordeon);
    });
}

// Helper para traducir los códigos de aeropuertos a nombres de ciudades
function traducirCiudad(codigo) {
    const mapa = {
        "BUE": "Buenos Aires",
        "AEP": "Buenos Aires",
        "MAD": "Madrid",
        "MIA": "Miami",
        "LIM": "Lima",
        "GRU": "São Paulo",
        "COR": "Córdoba",
        "BRC": "Bariloche",
        "JFK": "New York",
        "CDG": "París"
    };
    return mapa[codigo.toUpperCase()] || codigo;
}