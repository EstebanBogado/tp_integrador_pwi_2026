const vuelos = [
    { id: 1, compania: "Aerolineas Argentinas", nroVuelo: "AR1023", origen: "BUE", destino: "MAD", salidaIda: "10:50", llegadaIda: "04:30", salidaVuelta: "09:00", llegadaVuelta: "19:45", duracion: "13h 40m", escalas: 0, precioBase: 1500, precioAmigo: 1000, costoEquipaje: 80 },
    { id: 2, compania: "Fly Bondi", nroVuelo: "FO205", origen: "BUE", destino: "MIA", salidaIda: "14:20", llegadaIda: "22:10", salidaVuelta: "08:30", llegadaVuelta: "20:15", duracion: "11h 50m", escalas: 1, precioBase: 980, precioAmigo: 750, costoEquipaje: 50 },
    { id: 3, compania: "Jet Smart", nroVuelo: "JA410", origen: "AEP", destino: "LIM", salidaIda: "06:00", llegadaIda: "09:40", salidaVuelta: "11:00", llegadaVuelta: "15:30", duracion: "3h 40m", escalas: 0, precioBase: 420, precioAmigo: 310, costoEquipaje: 40 },
    { id: 4, compania: "Aerolineas Argentinas", nroVuelo: "AR887", origen: "COR", destino: "GRU", salidaIda: "07:15", llegadaIda: "10:50", salidaVuelta: "13:00", llegadaVuelta: "17:20", duracion: "3h 35m", escalas: 1, precioBase: 600, precioAmigo: 480, costoEquipaje: 60 },
    { id: 5, compania: "Fly Bondi", nroVuelo: "FO312", origen: "BRC", destino: "MAD", salidaIda: "18:00", llegadaIda: "12:30", salidaVuelta: "15:00", llegadaVuelta: "07:45", duracion: "18h 30m", escalas: 2, precioBase: 1200, precioAmigo: 900, costoEquipaje: 80 },
    { id: 6, compania: "Jet Smart", nroVuelo: "JA520", origen: "BUE", destino: "GRU", salidaIda: "09:30", llegadaIda: "12:15", salidaVuelta: "14:00", llegadaVuelta: "17:45", duracion: "2h 45m", escalas: 0, precioBase: 350, precioAmigo: 270, costoEquipaje: 35 }
];

const asientosOcupadosPorVuelo = {
    1: ["A1", "D1", "C2", "A4", "C5", "D5"],
    2: ["B1", "C3", "A2", "D4", "B6"],
    3: ["A1", "C1", "B2", "D3", "A5"],
    4: ["D1", "A3", "C4", "B5", "D6"],
    5: ["A1", "B3", "C2", "D5", "A6"],
    6: ["C1", "A2", "D3", "B4", "C6"]
};

const filas = ["A", "B", "C", "D"];
const columnas = [1, 2, 3, 4, 5, 6];
let asientoSeleccionado = null;

// Carga ficha técnica del vuelo
function cargarDetalleVuelo(vuelo) {
    const contenedor = document.getElementById("detalle-vuelo");
    contenedor.innerHTML = `
        <div class="compania aerolinea">
            <p>Compañía: ${vuelo.compania}</p>
            <p>|</p>
            <p>Nro. de vuelo: ${vuelo.nroVuelo}</p>
        </div>
        <div class="ida">Ida</div>
        <div class="salida salida-llegada"><h2>Salida</h2><p class="horario">${vuelo.salidaIda}</p></div>
        <div class="llegada salida-llegada"><h2>Llegada</h2><p class="horario">${vuelo.llegadaIda}</p></div>
        <div class="vuelta">Vuelta</div>
        <div class="salida salida-llegada"><h2>Salida</h2><p class="horario">${vuelo.salidaVuelta}</p></div>
        <div class="llegada salida-llegada"><h2>Llegada</h2><p class="horario">${vuelo.llegadaVuelta}</p></div>
        <div class="tarifas">
            <p>Duración: ${vuelo.duracion} | Escalas: ${vuelo.escalas === 0 ? "Directo" : vuelo.escalas}</p>
        </div>
        <div id="contenedor-equipaje-tag"></div>
    `;
    recalcularPrecios(vuelo);
}

// Recalcula montos basándose en el equipaje opcional y actualiza vista
function recalcularPrecios(vuelo) {
    const chkEquipaje = document.getElementById("chk-equipaje");
    const contenedorTag = document.getElementById("contenedor-equipaje-tag");
    const quiereEquipaje = chkEquipaje ? chkEquipaje.checked : false;

    const precioBaseFinal = quiereEquipaje ? vuelo.precioBase + vuelo.costoEquipaje : vuelo.precioBase;
    const precioAmigoFinal = quiereEquipaje ? vuelo.precioAmigo + vuelo.costoEquipaje : vuelo.precioAmigo;

    localStorage.setItem("equipaje", quiereEquipaje ? "true" : "false");

    if (contenedorTag) {
        contenedorTag.innerHTML = quiereEquipaje 
            ? `<div class="tarifas equipaje-tag">🧳 Equipaje agregado (+$${vuelo.costoEquipaje})</div>` 
            : "";
    }

    actualizarResumenPrecio(vuelo, precioBaseFinal, precioAmigoFinal);
}

// Actualiza barra de precios inferior
function actualizarResumenPrecio(vuelo, precioBase, precioAmigo) {
    const contenedor = document.getElementById("resumen-precio");
    const asiento = asientoSeleccionado ? ` — Asiento: ${asientoSeleccionado}` : " — Sin asiento seleccionado";

    contenedor.innerHTML = `
        <p>Tarifa base: <span>$${precioBase.toFixed(2)}</span></p>
        <p>Club Amigos: <span>$${precioAmigo.toFixed(2)}</span></p>
        <p>${asiento}</p>
    `;
}

// Genera la cuadrícula de asientos
function generarCabina(vuelo) {
    const contenedor = document.getElementById("armado-del-vuelo");
    const ocupados = asientosOcupadosPorVuelo[vuelo.id] || [];
    const bloque1 = columnas.slice(0, 3);
    const bloque2 = columnas.slice(3, 6);

    [bloque1, bloque2].forEach(bloque => {
        const cabina = document.createElement("div");
        cabina.className = "asientos-cabina";

        bloque.forEach(col => {
            const separacion = document.createElement("div");
            separacion.className = "separacion-asientos";

            filas.forEach(fila => {
                const codigo = `${fila}${col}`;
                const div = document.createElement("div");
                
                if (ocupados.includes(codigo)) {
                    div.className = "asiento asiento-ocupado";
                } else {
                    div.className = "asiento";
                    div.addEventListener("click", function () {
                        seleccionarAsiento(codigo, div, vuelo);
                    });
                }

                div.textContent = codigo;
                separacion.appendChild(div);
            });
            cabina.appendChild(separacion);
        });
        contenedor.appendChild(cabina);
    });
}

// Maneja la selección del asiento libre
function seleccionarAsiento(codigo, elemento, vuelo) {
    const anterior = document.querySelector(".asiento-seleccionado");
    if (anterior) anterior.classList.remove("asiento-seleccionado");

    if (asientoSeleccionado === codigo) {
        asientoSeleccionado = null;
        localStorage.removeItem("asientoSeleccionado");
    } else {
        asientoSeleccionado = codigo;
        elemento.classList.add("asiento-seleccionado");
        localStorage.setItem("asientoSeleccionado", codigo);
    }
    recalcularPrecios(vuelo);
}

// Validación final
function inicializarBotonConfirmar(vuelo) {
    document.getElementById("btn-confirmar").addEventListener("click", function () {
        if (!asientoSeleccionado) {
            alert("Por favor seleccioná un asiento antes de continuar.");
            return;
        }
        localStorage.setItem("vueloConfirmadoId", vuelo.id);
        window.location.href = "../PAGES/pagos.html";
    });
}

// Evento de inicialización
document.addEventListener("DOMContentLoaded", function () {
    const id = parseInt(localStorage.getItem("vueloSeleccionadoId"));
    const vuelo = vuelos.find(v => v.id === id);

    if (!vuelo) {
        document.querySelector(".ubicacion-cabina").innerHTML =
            `<p style="color:white; padding:2em;">No se encontró el vuelo. <a href="../index.html">Volver al inicio</a></p>`;
        return;
    }

    cargarDetalleVuelo(vuelo);

    const chkEquipaje = document.getElementById("chk-equipaje");
    if (chkEquipaje) {
        chkEquipaje.checked = localStorage.getItem("equipaje") === "true";
        chkEquipaje.addEventListener("change", () => recalcularPrecios(vuelo));
    }

    generarCabina(vuelo);
    inicializarBotonConfirmar(vuelo);
    recalcularPrecios(vuelo);
});