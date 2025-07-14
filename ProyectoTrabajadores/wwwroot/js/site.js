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

$("#btnLimpiar").on("click", function () {
    limpiarFiltro();
});

const cargarTrabajadores = function () {

};

const limpiarFiltro = function () {
    $("#filtroNombre").val("");
    $("#filtroDoc").val("");
    $("#filtroSexo").val("");
}

//$(document).ready(function () {
//    $(".btn-editar").on("click", function () {
//        const btn = $(this);

//        $("#formTrabajador #nombres").val(btn.data("nombres"));
//        $("#formTrabajador #apellidos").val(btn.data("apellidos"));
//        $("#formTrabajador #dni").val(btn.data("dni"));
//        $("#formTrabajador #direccion").val(btn.data("direccion"));
//        $("#formTrabajador #sexo").val(btn.data("sexo"));

//        $("#formTrabajador").data("modo", "editar");
//        $("#formTrabajador").data("id", btn.data("id"));

//        const codDistrito = btn.data("ubigeo");
//        $("#distrito").val(codDistrito);

//        // Cambiar título
//        $("#modalRegistroLabel").html("<i class="fa fa-pencil"></i> Editar Trabajador");

//        // Mostrar modal
//        $("#modalRegistro").modal("show");
//    });

//    // CLICK en "Eliminar"
//    $(".btn-eliminar").on("click", function () {
//        const btn = $(this);
//        const id = btn.data("id");
//        const nombre = btn.data("nombre");

//        // Mostrar nombre en el mensaje
//        $("#mensajeEliminar").text(`¿Estás seguro de que deseas eliminar a ${nombre}?`);

//        // Guardar ID en botón de confirmar
//        $("#confirmarEliminar").data("id", id);

//        // Mostrar modal
//        $("#modalEliminar").modal("show");
//    });

//    // Confirmar eliminación
//    $("#confirmarEliminar").on("click", function () {
//        const id = $(this).data("id");

//        // Aquí haces la llamada a tu API o backend
//        console.log("Eliminar trabajador ID:", id);

//        // Cierra modal
//        $("#modalEliminar").modal("hide");

//        // Luego refrescas la tabla o recargas
//    });

//    // Enviar formulario
//    $("#formTrabajador").on("submit", function (e) {
//        e.preventDefault();

//        const modo = $(this).data("modo") || "nuevo";
//        const id = $(this).data("id") || 0;

//        const datos = {
//            id,
//            nombres: $("#nombres").val(),
//            apellidos: $("#apellidos").val(),
//            dni: $("#dni").val(),
//            direccion: $("#direccion").val(),
//            sexo: $("#sexo").val(),
//            codDistrito: $("#distrito").val()
//        };

//        if (modo === "editar") {
//            console.log("Actualizar:", datos);
//            // Llamar API PUT
//        } else {
//            console.log("Registrar:", datos);
//            // Llamar API POST
//        }

//        $("#modalRegistro").modal("hide");
//    });
//});
