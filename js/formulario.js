
document.getElementById('formulario').addEventListener('submit', function (event) {
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('contrasenia').value;
    const errorMessage = document.getElementById('mensajeError');


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
    window.location.href = '../index.html';
    event.preventDefault();

});

function validateInput(input, inputType) {
    if (!input || input.trim() === '') {
        return false;
    }
    return true;
}



