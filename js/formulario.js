// document.getElementById('formulario').addEventListener('submit', function(event) {
//     const usuario = document.getElementById('usuario').value;
//     const contrasena = document.getElementById('contrasena').value;

//     if (usuario.trim() === '' || contrasena.trim() === '') {
//         alert('Por favor, completa todos los campos.'); // Muestra el mensaje en la consola
//         event.preventDefault(); // Evita que el formulario se envíe
//     }
// });

document.getElementById('formulario').addEventListener('submit', function(event) {
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('contrasenia').value;
    const errorMessage = document.getElementById('mensajeError');

    // Clear any previous error messages
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');

    if (!validateInput(username, 'username')) {
        errorMessage.textContent = 'Por favor, complete con su email';
        errorMessage.classList.add('show');
        event.preventDefault();
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
        return;
    }

    if (!validateInput(password, 'password')) {
        errorMessage.textContent = 'Por favor, complete su contraseña.';
        errorMessage.classList.add('show');
        event.preventDefault();
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
        return;
    }

    // Form is valid, submit the form
    event.preventDefault();
    // Submit the form using JavaScript or make an AJAX request
});

function validateInput(input, inputType) {
    if (!input || input.trim() === '') {
        return false;
    }
    return true;
}



