console.log("hola mundo!");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".panel-registro .form-auth");

    form.addEventListener("submit", function (e) {
        e.preventDefault();


        const radios = document.querySelector('input[name="auth-tab"]:checked').value;
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const correo = document.getElementById("email-registro").value;
        const dni = document.getElementById("dni").value;
        const pass_registro = document.getElementById("password-registro").value;
        const pass_confirm = document.getElementById("password-confirm").value;
        const confirmar_datos = document.querySelector('input[name="terminos"]').checked;

        localStorage.setItem("auth-tab", radios);
        if(!nombre){
            alert("Ingrese un dato válido")}else{
        localStorage.setItem("nombre", nombre);}
        
        localStorage.setItem("apellido", apellido);
        localStorage.setItem("email-registro", correo);
        localStorage.setItem("dni", dni);
        localStorage.setItem("password-registro", pass_registro);
        localStorage.setItem("password-confirm", pass_confirm);
        localStorage.setItem("terminos", confirmar_datos);

        console.log("Datos guardados en localStorage ✅");
        window.location.href = "../PAGES/ingresar.html";
    });

    const formLogin = document.querySelector(".panel-login .form-auth");
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const correo_usuario = document.getElementById("email-login").value;
        const pass_login = document.getElementById("password-login").value;
        let validar_usuario = false;
        let validar_password = false;

        if (correo_usuario === localStorage.getItem("email-registro")) {
            sessionStorage.setItem("correo_usuario", correo_usuario);
            validar_usuario = true;
        }
        if (pass_login === localStorage.getItem("password-confirm")) {
            sessionStorage.setItem("pass_login", pass_login);
            validar_password = true;
        }

        if (validar_usuario && validar_password) {
            console.log("usuario validado ✅");
            window.location.href = "../index.html";

        } else {
            console.log("usuario o contraseña incorrectos ❌");
        }
    })
});
