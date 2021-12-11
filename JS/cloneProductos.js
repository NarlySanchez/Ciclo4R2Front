//-------------FUNCION PARA TRAER TODOS LOS PRODUCTOS A LA TABLA-----------------------------------
$("#act-productos").click(function () {
    var urlServicio = "http://localhost:8080/api/clone/all";
    $("#tabla-productos tbody").empty();
    console.log(urlServicio);
    $.ajax({
        url: urlServicio,
        type: "GET",
        contentType: "application/json; charset=utf8",
        dataType: "json",
        cache: false,

        success: function (result) {

            console.log("ENTRO AL SERVICIO REST");
            console.log(result);

            var i = 0;
            var marca = 0;
            var procesador = "";
            var sisOperativo = "";
            var descripcion = "";
            var memoria = "";
            var discoDuro = "";
            var disponible = Boolean;
            var precio = 0;
            var cantidad = 0;
            var fotografia = "";
            var salidaFila = "";

            $("#tabla-productos tbody").empty();

            salidaFila = "<tr><th>Marca</th><th>Procesador</th><th>Sistema Operativo</th><th>Descripción</th><th>Memoria</th><th>Disco Duro</th><th>Disponibilidad</th><th>Precio</th><th>Cantidad</th><th>Fotografía</th><th>Acciones</th></tr>";
            $("#tabla-productos tbody").append(salidaFila);

            for (i = 0; i < result.length; i++) {
                marca = result[i]["brand"];
                procesador = result[i]["procesor"];
                sisOperativo = result[i]["os"];
                descripcion = result[i]["description"];
                memoria = result[i]["memory"];
                discoDuro = result[i]["hardDrive"];
                disponible = result[i]["availability"];
                precio = result[i]["price"];
                cantidad = result[i]["quantity"];
                fotografia = result[i]["photography"];

                if (disponible == true) {
                    disponible = "SI";
                } else {
                    disponible = "NO";
                }

                salidaFila = "<tr class='color-fuente'><td>" + marca + "</td><td>" + procesador + "</td><td>" + sisOperativo + "</td><td>" + descripcion + "</td><td>" +
                    memoria + "</td><td>" + discoDuro + "</td><td>" + disponible + "</td><td>" + precio + "</td><td>" + cantidad + "</td><td>" + fotografia + "</td><td class='celda-accion'>" + "<button class='btn-act-productos' data-bs-toggle='modal' data-bs-target='#exampleModal4' onclick='actProductos(" + result[i]["id"] + ")'>Editar</button>" +
                    "<button class='btn-borrar' onclick='borrarProductos(" + result[i]["id"] + ")'>Borrar</button>" + "</td></tr>";

                $("#tabla-productos tbody").append(salidaFila);
            }
        }
    })
})

//-------------------FUNCION PARA AGREGAR PRODUCTOS A LA BD--------------------------------------------------
$("#registrarProductos").click(function () {
    jQuery.support.cors = true;

    //var id = $.trim($("#idRegProducto").val());
    let marca = $.trim($("#marcaReg").val());
    let procesador = $.trim($("#procesadorReg").val());
    let sisOperativo = $.trim($("#sisOperativoReg").val());
    let descripcion = $.trim($("#descripcionReg").val());
    let memoria = $.trim($("#memoriaReg").val());
    let discoDuro = $.trim($("#discoDuroReg").val());
    let disponible = $.trim($("#disponibleReg").val());
    let precio = $.trim($("#precioReg").val());
    let cantidad = $.trim($("#cantidadReg").val());
    let foto = $.trim($("#fotoReg").val());

    if (marca == "" || procesador == "" || sisOperativo == "" || descripcion == "" || memoria == "" || discoDuro == "" || disponible == "" || precio == "" || cantidad == "" || foto == "") {
        alert("POR FAVOR LLENE TODOS LOS CAMPOS");
    } else {
        let datos = {
            brand: $("#marcaReg").val(),
            procesor: $("#procesadorReg").val(),
            os: $("#sisOperativoReg").val(),
            description: $("#descripcionReg").val(),
            memory: $("#memoriaReg").val(),
            hardDrive: $("#discoDuroReg").val(),
            availability: $("#disponibleReg").val(),
            price: $("#precioReg").val(),
            quantity: $("#cantidadReg").val(),
            photography: $("#fotoReg").val(),
        };
        $.ajax({
            url: "http://localhost:8080/api/clone/new",
            method: 'POST',
            data: JSON.stringify(datos),
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            Headers: {
                "Content-Type": "application/json"
            }
        });
        alert("FICHA DE PRODUCTO CREADA CORRECTAMENTE");
        $("#formulario5").trigger("reset");
        location.href = "admin.html";
    }
})
//------------------------------FUNCION PARA ACTUALIZAR PRODUCTOS---------------------------------------------
function actProductos(id) {

    //------TRAE LOS DATOS SELECCIONADOS A LOS INPUTS PARA EDITAR UN PRODUCTO
    var urlServicio = "http://localhost:8080/api/clone/all";
    console.log(urlServicio);

    $.ajax({
        url: urlServicio,
        type: "GET",
        contentType: "application/json; charset=utf8",
        dataType: "json",
        cache: false,

        success: function (result) {
            console.log("entro a los datos");

            for (i = 0; i < result.length; i++) {
                idProducto = result[i]["id"]
                marca = result[i]["brand"];
                procesador = result[i]["procesor"];
                sisOperativo = result[i]["os"];
                descripcion = result[i]["description"];
                memoria = result[i]["memory"];
                discoDuro = result[i]["hardDrive"];
                disponible = result[i]["availability"];
                precio = result[i]["price"];
                cantidad = result[i]["quantity"];
                fotografia = result[i]["photography"];

                if (idProducto == id) {
                    $("#regMarca").val(marca);
                    $("#regProcesador").val(procesador);
                    $("#regSis").val(sisOperativo);
                    $("#regDescripcion").val(descripcion);
                    $("#regMemoria").val(memoria);
                    $("#regDiscoDuro").val(discoDuro);
                    $("#regDisponible").val(disponible);
                    $("#regPrecio").val(precio);
                    $("#regCantidad").val(cantidad);
                    $("#regFoto").val(fotografia);
                }
            }
        }
    })
    $("#actualizarProducto").click(function () {
        var urlServicio = "http://localhost:8080/api/clone/update";

        var marca = $("#regMarca").val();
        var procesador = $("#regProcesador").val();
        var sisOperativo = $("#regSis").val();
        var descripcion = $("#regDescripcion").val();
        var memoria = $("#regMemoria").val();
        var discoDuro = $("#regDiscoDuro").val();
        var disponible = $("#regDisponible").val();
        var precio = $("#regPrecio").val();
        var cantidad = $("#regCantidad").val();
        var foto = $("#regFoto").val();

        if (marca == "" || procesador == "" || sisOperativo == "" || descripcion == "" || memoria == "" || discoDuro == "" || disponible == "" || precio == "" || cantidad == "" || foto == "") {
            alert("POR FAVOR LLENE TODOS LOS CAMPOS");
        } else {
            $.ajax({
                url: urlServicio,
                type: "PUT",
                async: false,
                data: JSON.stringify({ "id": id, "brand": marca, "procesor": procesador, "os": sisOperativo, "description": descripcion, "memory": memoria, "hardDrive": discoDuro, "availability": disponible, "price": precio, "quantity": cantidad, "photography": foto, }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function () {
                    console.log(id);
                    alert("LA FICHA PRODUCTO SE EDITTO CORRECTAMENTE");
                    $("#formulario5").trigger("reset");
                    location.href = "admin.html";
                }
            });
        }
    });
}

//---------------FUNCION PARA BORRAR UN PRODUCTO-------------------------------------------------------
function borrarProductos(id) {
    var urlServicio = "http://localhost:8080/api/clone/" + id;
    $.ajax({
        url: urlServicio,
        type: "DELETE",
    });
    alert("PRODUCTO BORRADO DE LA BASE DE DATOS");
    location.href = "admin.html";
}