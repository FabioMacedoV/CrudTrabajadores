let idTrabajadorEliminar = 0;
window.onload = function () {
    cargarTrabajadores();
}

/* Funciones del la bandeja principal */
const cargarTrabajadores = function (page = 1) {
    const nombre = $('#filtroNombre').val() ?? "";
    const sexo = $('#filtroSexo').val() ?? "";
    const dni = $('#filtroDoc').val() ?? "";

    const params = new URLSearchParams({ nombre, sexo, dni, page });

    $.ajax({
        url: `/api/trabajadorapi/listar?${params.toString()}`,
        type: "GET",
        success: function (respuesta) {
            const tbody = $('#tablaTrabajadores tbody');
            tbody.empty();

            if (respuesta.trabajadores.length === 0) {
                tbody.append('<tr><td colspan="9" class="text-center">No se encontraron trabajadores.</td></tr>');
            } else {
                $.each(respuesta.trabajadores, function (i,t) {
                    let color = t.sexo === "M" ? "tr-masculino" : "tr-femenino";
                    const row = `
                        <tr class="${color}">
                            <td>${t.fila}</td>
                            <td>${t.tipoDocumento}</td>
                            <td>${t.nroDocumento}</td>
                            <td>${t.nombres}</td>
                            <td>${t.sexo}</td>
                            <td>${t.departamento}</td>
                            <td>${t.provincia}</td>
                            <td>${t.distrito}</td>
                            <td>
                                <button class="btn btn-warning btn-sm btnEditar" data-id="${t.id}">
                                    <i class="fa fa-pencil"></i> Editar
                                </button>
                                <button class="btn btn-danger btn-sm btnEliminar" data-id="${t.id}">
                                    <i class="fa fa-trash"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                    tbody.append(row);
                });
            }

            // Paginación dinámica
            const paginador = $('#paginador');
            paginador.empty();

            for (let i = 1; i <= respuesta.totalPaginas; i++) {
                const active = (i === respuesta.paginaActual) ? "active" : "";
                paginador.append(`
                    <li class="page-item ${active}">
                        <a href="#" class="page-link" data-page="${i}">${i}</a>
                    </li>
                `);
            }

            $('#paginador .page-link').on('click', function (e) {
                e.preventDefault();
                const nuevaPagina = parseInt($(this).data('page'));
                cargarTrabajadores(nuevaPagina);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error AJAX:", error);
            $('#tablaTrabajadores tbody').html('<tr><td colspan="9" class="text-danger text-center">Ocurrió un error al buscar trabajadores.</td></tr>');
        }
    });
};

const limpiarFiltro = function () {
    $("#filtroNombre").val("");
    $("#filtroDoc").val("");
    $("#filtroSexo").val("");

    cargarTrabajadores(1);
}
/* Fin: Funciones del la bandeja principal */

/* Accion de los botones de la bandeja principal */
$("#btnBuscar").on("click", function () {
    cargarTrabajadores(1);
});

$("#btnLimpiar").on("click", function () {
    limpiarFiltro();
});

$(document).on("click", ".btnEditar", function () {
    const id = $(this).data("id");

    $.ajax({
        url: `/api/trabajadorapi/obtener/${id}`,
        type: "GET",
        success: function (trabajador) {
            limpiarModalRegistro();

            $('#txtNombres').val(trabajador.nombres);
            $('#txtNumeroDoc').val(trabajador.numeroDocumento);
            $('#txtTipoDoc').val(trabajador.tipoDocumento);
            $('input[name="sexo"][value="' + trabajador.sexo + '"]').prop("checked", true);
            $('#hdnIdTrabajador').val(trabajador.id);

            $('#modalRegistroLabel').html('<i class="fa fa-pencil"></i> Editar Trabajador');
            $('#modalRegistro').modal('show');
            cargarUbigeo(trabajador);
        },
        error: function () {
            alert("No se pudo obtener los datos del trabajador.");
        }
    });
});

$(document).on('click', '.btnEliminar', function () {
    idTrabajadorEliminar = $(this).data('id');
    $('#modalEliminar').modal('show');
});

/* Fin: Accion de los botones de la bandeja principal */

/* Funciones del registro/edición */
const limpiarModalRegistro = function () {
    $('#txtNombres').val("");
    $('#txtNumeroDoc').val("");
    $('#txtTipoDoc').val("");
    $('#txtDepartamento').val("");
    $('#txtProvincia').val("");
    $('#txtDistrito').val("");
    $('input[name="sexo"][value="M"]').prop("checked", true);
    $('#hdnIdTrabajador').val("");
}

const cargarUbigeo = async function (trabajador) {
    await cargarDepartamentos();
    await cargarProvincia(trabajador.idDepartamento);
    await cargarDistrito(trabajador.idProvincia);

    $('#txtDepartamento').val(trabajador.idDepartamento);
    $('#txtProvincia').val(trabajador.idProvincia);
    $('#txtDistrito').val(trabajador.idDistrito);
};
const cargarDepartamentos = function () {
    $.get('/api/ubigeo/departamentos', function (data) {
        $('#txtDepartamento').empty().append('<option value="">-- Seleccione --</option>');
        data.forEach(dep => {
            $('#txtDepartamento').append(`<option value="${dep.id}">${dep.nombre}</option>`);
        });

        // Deshabilitar provincia y distrito
        $('#txtProvincia').empty().append('<option value="">-- Seleccione --</option>').prop('disabled', true);
        $('#txtDistrito').empty().append('<option value="">-- Seleccione --</option>').prop('disabled', true);
    });
}

const cargarProvincia = function (idDepartamento) {
    return $.get(`/api/ubigeo/provincias/${idDepartamento}`, function (data) {
        $('#txtProvincia').empty().append('<option value="">-- Seleccione --</option>');
        data.forEach(prov => {
            $('#txtProvincia').append(`<option value="${prov.id}">${prov.nombre}</option>`);
        });
        $('#txtProvincia').prop('disabled', false);
    });
}

const cargarDistrito = function (idProvincia) {
    return $.get(`/api/ubigeo/distritos/${idProvincia}`, function (data) {
        $('#txtDistrito').empty().append('<option value="">-- Seleccione --</option>');
        data.forEach(dist => {
            $('#txtDistrito').append(`<option value="${dist.id}">${dist.nombre}</option>`);
        });
        $('#txtDistrito').prop('disabled', false);
    });
}

const validarDatos = function (trabajadores) {
    debugger
    if (trabajadores.tipoDocumento == null || trabajadores.tipoDocumento == '') {
        alert("Debe elegir un tipo de documento antes de continuar.");
        return false;
    }

    if (trabajadores.numeroDocumento.length < 8) {
        alert("Debe colocar un número de documento valido antes de continuar.");
        return false;
    }

    if (trabajadores.idDepartamento == '' || trabajadores.idDepartamento == null) {
        alert("Debe seleccionar un departamento antes de continuar.");
        return false;
    }

    if (trabajadores.idProvincia == '' || trabajadores.idProvincia == null) {
        alert("Debe seleccionar una provincia antes de continuar.");
        return false;
    }

    if (trabajadores.idDistrito == '' || trabajadores.idDistrito == null) {
        alert("Debe seleccionar un distrito antes de continuar.");
        return false;
    }

    return true;
}

$('#txtDepartamento').on('change', function () {
    const idDep = $(this).val();

    $('#txtProvincia').empty().append('<option value="">-- Seleccione --</option>').prop('disabled', true);
    $('#txtDistrito').empty().append('<option value="">-- Seleccione --</option>').prop('disabled', true);

    if (idDep) {
        cargarProvincia(idDep);
    }
});

$('#txtProvincia').on('change', function () {
    const idProv = $(this).val();

    $('#txtDistrito').empty().append('<option value="">-- Seleccione --</option>').prop('disabled', true);

    if (idProv) {
        cargarDistrito(idProv);
    }
});

$("#btnRegistrar").on("click", function () {
    $('#hdnIdTrabajador').val("");
    limpiarModalRegistro();
    cargarDepartamentos();
    $('#modalRegistroLabel').html('<i class="fa fa-user-plus"></i> Nuevo Registro');
    $('#modalRegistro').modal('show');
});

$('#btnGuardar').on('click', function () {
    const data = {
        id: $('#hdnIdTrabajador').val() || 0,
        tipoDocumento: $('#txtTipoDoc').val(),
        numeroDocumento: $('#txtNumeroDoc').val(),
        nombres: $('#txtNombres').val(),
        sexo: $('input[name="sexo"]:checked').val(),
        idDepartamento: $('#txtDepartamento').val(),
        idProvincia: $('#txtProvincia').val(),
        idDistrito: $('#txtDistrito').val()
    };

    if (validarDatos(data)) {
        $.ajax({
            url: '/api/trabajadorapi/guardar',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (res) {
                $('#modalRegistro').modal('hide');
                alert(res.mensaje);
                cargarTrabajadores();
            },
            error: function (xhr) {
                alert("Error al guardar: " + xhr.responseJSON?.mensaje || "Error desconocido");
            }
        });
    }
});

$(document).on('click', '.btnCerrarModal', function () {
    $('#modalRegistro').modal('hide');
});

/* Fin: Funciones del registro/edición */

/* Funciones del modal de eliminación */
$('#btnConfirmarEliminar').on('click', function () {
    $.ajax({
        url: `/api/trabajadorapi/eliminar/${idTrabajadorEliminar}`,
        type: 'DELETE',
        success: function (res) {
            $('#modalEliminar').modal('hide');
            alert(res.mensaje);
            cargarTrabajadores(1);
        },
        error: function (xhr) {
            alert("Error al eliminar: " + xhr.responseJSON?.mensaje || "Error desconocido");
        }
    });
});

$(document).on('click', '.cancelarEliminar', function () {
    $('#modalEliminar').modal('hide');
});
/* Fin: Funciones del modal de eliminación */