const vuelos = [
    {
        id: 1,
        compania: "Aerolineas Argentinas",
        nroVuelo: "AR1023",
        origen: "BUE",
        destino: "MAD",
        salidaIda: "10:50",
        llegadaIda: "04:30",
        salidaVuelta: "09:00",
        llegadaVuelta: "19:45",
        duracion: "13h 40m",
        escalas: 0,
        tipovuelo: "directo",
        precioBase: 1500,
        precioAmigo: 1000,
        costoEquipaje: 80 //equipaje
    },
    {
        id: 2,
        compania: "Fly Bondi",
        nroVuelo: "FO205",
        origen: "BUE",
        destino: "MIA",
        salidaIda: "14:20",
        llegadaIda: "22:10",
        salidaVuelta: "08:30",
        llegadaVuelta: "20:15",
        duracion: "11h 50m",
        escalas: 1,
        tipovuelo: "con-escalas",
        precioBase: 980,
        precioAmigo: 750,
        costoEquipaje: 50 //equipaje
    },
    {
        id: 3,
        compania: "Jet Smart",
        nroVuelo: "JA410",
        origen: "AEP",
        destino: "LIM",
        salidaIda: "06:00",
        llegadaIda: "09:40",
        salidaVuelta: "11:00",
        llegadaVuelta: "15:30",
        duracion: "3h 40m",
        escalas: 0,
        tipovuelo: "directo",
        precioBase: 420,
        precioAmigo: 310,
        costoEquipaje: 40 //equipaje
    },
    {
        id: 4,
        compania: "Aerolineas Argentinas",
        nroVuelo: "AR887",
        origen: "COR",
        destino: "GRU",
        salidaIda: "07:15",
        llegadaIda: "10:50",
        salidaVuelta: "13:00",
        llegadaVuelta: "17:20",
        duracion: "3h 35m",
        escalas: 1,
        tipovuelo: "con-escalas",
        precioBase: 600,
        precioAmigo: 480,
        costoEquipaje: 60 //equipaje
    },
    {
        id: 5,
        compania: "Fly Bondi",
        nroVuelo: "FO312",
        origen: "BRC",
        destino: "MAD",
        salidaIda: "18:00",
        llegadaIda: "12:30",
        salidaVuelta: "15:00",
        llegadaVuelta: "07:45",
        duracion: "18h 30m",
        escalas: 2,
        tipovuelo: "con-escalas",
        precioBase: 1200,
        precioAmigo: 900,
        costoEquipaje: 80 //equipaje
    },
    {
        id: 6,
        compania: "Jet Smart",
        nroVuelo: "JA520",
        origen: "BUE",
        destino: "GRU",
        salidaIda: "09:30",
        llegadaIda: "12:15",
        salidaVuelta: "14:00",
        llegadaVuelta: "17:45",
        duracion: "2h 45m",
        escalas: 0,
        tipovuelo: "directo",
        precioBase: 350,
        precioAmigo: 270,
        costoEquipaje: 35 //equipaje
    }
];
// ESTADO DE FILTROS
let filtros = {
    precioMin: 0,
    precioMax: Infinity,
    tipoVuelo: [],       // "directo" | "con-escalas"
    aerolineas: []       // nombres de compañías
};
 
let equipajeSeleccionado = false; //equipaje
 
// PRECARGA DEL FORMULARIO LATERAL DESDE LOCALSTORAGE
function precargarFormulario() {
    const origen     = localStorage.getItem("origen");
    const destino    = localStorage.getItem("destino");
    const fechaSalida = localStorage.getItem("fechaSalida");
    const fechaVuelta = localStorage.getItem("fechaVuelta");
 
    if (origen)      document.getElementById("desde").value        = origen;
    if (destino)     document.getElementById("destino").value      = destino;
    if (fechaSalida) document.getElementById("fecha-salida").value = fechaSalida;
    if (fechaVuelta) document.getElementById("fecha-vuelta").value = fechaVuelta;
}
// RENDERIZADO DE TARJETAS
function crearTarjeta(vuelo) {
    const div = document.createElement("div");
    div.className = "datos-de-vuelos";
    div.dataset.id = vuelo.id;
 
    const precioBaseTotal  = equipajeSeleccionado ? vuelo.precioBase  + vuelo.costoEquipaje : vuelo.precioBase; //equipaje
    const precioAmigoTotal = equipajeSeleccionado ? vuelo.precioAmigo + vuelo.costoEquipaje : vuelo.precioAmigo; //equipaje
 
    div.innerHTML = `
        <div class="compania aerolinea">
            <p>Compañía: ${vuelo.compania}</p>
            <p>|</p>
            <p>Nro. de vuelo: ${vuelo.nroVuelo}</p>
        </div>
        <div class="ida">Ida</div>
        <div class="salida salida-llegada">
            <h2>Salida</h2>
            <p class="horario">${vuelo.salidaIda}</p>
        </div>
        <div class="llegada salida-llegada">
            <h2>Llegada</h2>
            <p class="horario">${vuelo.llegadaIda}</p>
        </div>
        <div class="vuelta">Vuelta</div>
        <div class="salida salida-llegada">
            <h2>Salida</h2>
            <p class="horario">${vuelo.salidaVuelta}</p>
        </div>
        <div class="llegada salida-llegada">
            <h2>Llegada</h2>
            <p class="horario">${vuelo.llegadaVuelta}</p>
        </div>
        <div class="tarifas">
            <p>Tarifa base</p>
            <p class="precio-base">$${precioBaseTotal.toFixed(2)}</p>
        </div>
        <div class="tarifas">
            <p>Club Amigos</p>
            <p class="precio-amigo">$${precioAmigoTotal.toFixed(2)}</p>
        </div>
        <div class="tarifas">
            <p>Duración: ${vuelo.duracion} | Escalas: ${vuelo.escalas === 0 ? "Directo" : vuelo.escalas}</p>
        </div>
        ${equipajeSeleccionado ? `<div class="tarifas equipaje-tag">🧳 Equipaje incluido (+$${vuelo.costoEquipaje})</div>` : ""} 
    `; //equipaje
 
    // Al hacer click navega al detalle guardando el id del vuelo
    div.addEventListener("click", function () {
        localStorage.setItem("vueloSeleccionadoId", vuelo.id);
        window.location.href = "../PAGES/detalle_vuelo.html";
    });
 
    return div;
}
 
function renderizarVuelos(lista) {
    const grilla = document.getElementById("grilla-resultados");
    grilla.innerHTML = "";
 
    if (lista.length === 0) {
        grilla.innerHTML = `<p style="color:white; padding:1em;">No se encontraron vuelos con los filtros seleccionados.</p>`;
        return;
    }
 
    lista.forEach(vuelo => grilla.appendChild(crearTarjeta(vuelo)));
}
// FILTRADO DINÁMICO
function aplicarFiltros() {
    const origen  = localStorage.getItem("origen");
    const destino = localStorage.getItem("destino");
 
    const resultado = vuelos.filter(v => {
        const coincideOrigen  = origen  ? v.origen  === origen  : true;
        const coincideDestino = destino ? v.destino === destino : true;
        const coincidePrecio  = v.precioBase >= filtros.precioMin && v.precioBase <= filtros.precioMax;
        const coincideTipo    = filtros.tipoVuelo.length === 0 || filtros.tipoVuelo.includes(v.tipovuelo);
        const coincideAero    = filtros.aerolineas.length === 0  || filtros.aerolineas.includes(v.compania);
 
        return coincideOrigen && coincideDestino && coincidePrecio && coincideTipo && coincideAero;
    });
 
    renderizarVuelos(resultado);
}
// FILTRO DE PRECIO
function inicializarFiltroPrecio() {
    const precios = vuelos.map(v => v.precioBase);
    const min = Math.min(...precios);
    const max = Math.max(...precios);
 
    filtros.precioMin = min;
    filtros.precioMax = max;
 
    const contenedor = document.getElementById("filtro-precio");
    if (!contenedor) return;
 
    const labelMin = contenedor.querySelector("#label-precio-min");
    const labelMax = contenedor.querySelector("#label-precio-max");
    const rangeMin = contenedor.querySelector("#range-precio-min");
    const rangeMax = contenedor.querySelector("#range-precio-max");
 
    rangeMin.min = min;
    rangeMin.max = max;
    rangeMin.value = min;
 
    rangeMax.min = min;
    rangeMax.max = max;
    rangeMax.value = max;
 
    labelMin.textContent = `$${min}`;
    labelMax.textContent = `$${max}`;
 
    rangeMin.addEventListener("input", function () {
        if (parseInt(rangeMin.value) > parseInt(rangeMax.value)) {
            rangeMin.value = rangeMax.value;
        }
        filtros.precioMin = parseInt(rangeMin.value);
        labelMin.textContent = `$${rangeMin.value}`;
        aplicarFiltros();
    });
 
    rangeMax.addEventListener("input", function () {
        if (parseInt(rangeMax.value) < parseInt(rangeMin.value)) {
            rangeMax.value = rangeMin.value;
        }
        filtros.precioMax = parseInt(rangeMax.value);
        labelMax.textContent = `$${rangeMax.value}`;
        aplicarFiltros();
    });
}
// FILTRO TIPO DE VUELO (checkboxes)
function inicializarFiltroTipoVuelo() {
    const checkboxes = document.querySelectorAll('input[name="tipo-vuelo"]');
    checkboxes.forEach(cb => {
        cb.addEventListener("change", function () {
            filtros.tipoVuelo = Array.from(checkboxes)
                .filter(c => c.checked)
                .map(c => c.value);
            aplicarFiltros();
        });
    });
}
// FILTRO AEROLÍNEA (checkboxes generados dinámicamente)
function inicializarFiltroAerolinea() {
    const contenedor = document.getElementById("filtro-aerolineas");
    if (!contenedor) return;
 
    const companias = [...new Set(vuelos.map(v => v.compania))];
 
    companias.forEach(compania => {
        const label = document.createElement("label");
        label.style.display = "flex";
        label.style.alignItems = "center";
        label.style.gap = "0.5em";
        label.style.color = "white";
 
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.name = "aerolinea";
        cb.value = compania;
 
        cb.addEventListener("change", function () {
            filtros.aerolineas = Array.from(
                document.querySelectorAll('input[name="aerolinea"]:checked')
            ).map(c => c.value);
            aplicarFiltros();
        });
 
        label.appendChild(cb);
        label.appendChild(document.createTextNode(compania));
        contenedor.appendChild(label);
    });
}
// ACCORDIONS DE FILTROS
function inicializarAccordions() {
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(header => {
        header.addEventListener("click", function () {
            const body = this.nextElementSibling;
            const estaAbierto = body.style.display === "block";
            body.style.display = estaAbierto ? "none" : "block";
            this.classList.toggle("abierto", !estaAbierto);
        });
    });
}
//equipaje
function inicializarCheckEquipaje() {
    const cb = document.getElementById("check-equipaje");
    if (!cb) return;
 
    cb.addEventListener("change", function () {
        equipajeSeleccionado = this.checked;
        localStorage.setItem("equipaje", equipajeSeleccionado ? "true" : "false");
        aplicarFiltros();
    });
}
 
document.addEventListener("DOMContentLoaded", function () {
    precargarFormulario();
    inicializarAccordions();
    inicializarFiltroPrecio();
    inicializarFiltroTipoVuelo();
    inicializarFiltroAerolinea();
    inicializarCheckEquipaje(); //equipaje
    aplicarFiltros(); // render inicial
});
 