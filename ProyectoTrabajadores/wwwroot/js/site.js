window.onload = function () {
    cargarTrabajadores();
}

$("#btnRegistrar").on("click", function () {
    $("#modalRegistro").modal("show")
});-

$("#btnEditar").on("click", function () {
    $("#modalRegistro").modal("show")
});

$("#btnEliminar").on("click", function () {
    $("#modalEliminar").modal("show");
});

$("#btnBuscar").on("click", function () {
    cargarTrabajadores(1);
});

$("#btnLimpiar").on("click", function () {
    limpiarFiltro();
});

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
                $.each(respuesta.trabajadores, function (i, t) {
                    const row = `
                        <tr>
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
