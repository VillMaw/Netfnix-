document.getElementById('registro').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    const username = document.getElementById('usuario').value;
    const password = document.getElementById('contrasenia').value;
    const email = document.getElementById('email').value;
    const fechaNac = document.getElementById('fechaNac').value;
    const pais = document.getElementById('pais').value;
    const errorMessage = document.getElementById('mensajeError');
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');

    // Validar cada campo
    if (!validateInput(username, 'username')) {
        errorMessage.textContent = 'Por favor, complete con su nombre de usuario';
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
        return;
    }

    if (!validateInput(password, 'password')) {
        errorMessage.textContent = 'Por favor, complete su contraseña';
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
        return;
    }

    if (!validateInput(email, 'email')) {
        errorMessage.textContent = 'Por favor, complete con su correo electrónico';
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
        return;
    }

    if (!validateInput(fechaNac, 'fechaNac')) {
        errorMessage.textContent = 'Por favor, complete con su fecha de nacimiento';
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
        return;
    }

    if (!validateInput(pais, 'pais')) {
        errorMessage.textContent = 'Por favor, seleccione su país';
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
        return;
    }

    window.location.href = '../index.html';
});

function validateInput(input, inputType) {
    if (!input || input.trim() === '') {
        return false;
    }

    if (inputType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);

    }

    return true;
}


