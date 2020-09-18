// Variable
const btnEviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

// Expresión Regular
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
1;
// Variables de campos.

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
evenListeners();
function evenListeners() {
  //Cuando la app arranca.
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //Campos del formulario.
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  // reinicia el formulario.

  btnReset.addEventListener("click", resetearFormulario);
  // enviar EMail.);
  formulario.addEventListener("submit", enviarEmail);
}
function iniciarApp() {
  btnEviar.disabled = true;
  btnEviar.classList.add("cursor-not-allowed", "opacity-50");
}

// validar Formulario

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    //Eliminar errores
    const error = document.querySelector("p.error");

    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");

      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("Email no valido");
    }
  }
  // Validar todos los campos y habilitar el botón enviar.
  if (er.test(email.value) && asunto.value && mensaje.value) {
    btnEviar.disabled = false;
    btnEviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "p-3",
    "m-5",
    "text-red-500",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");

  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

function enviarEmail(e) {
  e.preventDefault();

  // Mostrar el spiner

  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  // después de 3 segundo ocultar el spinner y mostrar el mensaje.

  setTimeout(function () {
    spinner.style.display = "none";

    // MEnsaje que se envío correctamente.

    const parrafo = document.createElement("p");
    parrafo.textContent = "Se envío correctamente";
    parrafo.classList.add(
      "text-center",
      "my-10",
      "bg-green-500",
      "text-white",
      "font-bold",
      "py-5",
      "uppercase"
    );

    // inserta el párrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);

    // Eliminar párrafo de mensaje de éxito.

    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 5000);
  }, 3000);
}

// Resetear Formulario.
function resetearFormulario() {
  formulario.reset();

  iniciarApp();
}
