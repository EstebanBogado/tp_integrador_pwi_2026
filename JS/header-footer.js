//Creación del heaer y el footer con js, para modificar un único archivo y que impacte en toda la página
document.addEventListener("DOMContentLoaded", function () {
    const header = document.createElement("nav");
    header.innerHTML = `
    <nav class="menu">
            <a href="../index.html" class="logo">
                <img src="../IMG/logo-aero-viajes.jpg" width="300px" height="200px" alt="logo aero viajes">
            </a>
            <a href="../index.html">
                <p>inicio</p>
            </a>
            <a href="../PAGES/resultado busqueda.html">
                <p>vuelos</p>
            </a>
            <a href="">
                <p>Ofertas</p>
            </a>
            <a href="/PAGES/contacto.html">
                <p>Contacto</p>
            </a>
            <a href="/PAGES/ingresar.html">
                <p>ingresar/registrarse</p>
            </a>
        </nav>
  `;
    document.getElementById("header").appendChild(header);

    const footer = document.createElement("p");
    footer.innerHTML = `
            <p>&copy; Todos los derechos reservados 2026.</p>
  `;
    document.getElementById("footer").appendChild(footer);
});