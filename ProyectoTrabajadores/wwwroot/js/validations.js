const soloLetras = function (e) {
    const tecla = e.key;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!regex.test(tecla)) {
        e.preventDefault();
    }
}

const soloNumeros = function (e) {
    const tecla = e.key;
    if (!/^[0-9]$/.test(tecla)) {
        e.preventDefault();
    }
}