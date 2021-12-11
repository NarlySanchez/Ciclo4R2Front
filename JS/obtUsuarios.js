//FUNCION PARA QUE EL ADMIN TRAIGA A TODOS LOS USUARIOS A UNA TABLA
$("#act-usuarios").click(function () {
    var urlServicio = "http://localhost:8080/api/user/all";
    $("#tabla-usuarios tbody").empty();
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
            var identificacion = 0;
            var nombre = "";
            var correo = "";
            var tipoUsuario = "";
            var zona = "";
            var salidaProd = "";

            $("#tabla-usuarios tbody").empty();

            salidaProd = "<tr><th>Identificación</th><th>Nombre</th><th>Correo</th><th>Tipo de usuario</th><th>Zona</th><th>Acciones</th></tr>";
            $("#tabla-usuarios tbody").append(salidaProd);

            for (i = 0; i < result.length; i++) {
                identificacion = result[i]["identification"];
                nombre = result[i]["name"];
                correo = result[i]["email"];
                tipoUsuario = result[i]["type"];
                zona = result[i]["zone"];

                salidaProd = "<tr class='color-fuente'><td>" + identificacion + "</td><td>" + nombre + "</td><td>" + correo + "</td><td>" + tipoUsuario + "</td><td>" + zona +
                    "</td><td class='celda-accion'>" + "<button data-bs-toggle='modal' data-bs-target='#exampleModal2' class='btn-act-usuarios' onclick='actUsuario(" + result[i]["id"] + ")'>Editar</button>"
                    + "<button class='btn-borrar' onclick='borrarUsuarios(" + result[i]["id"] + ")'>Borrar</button>" + "</td><tr>";

                $("#tabla-usuarios tbody").append(salidaProd);
            }
        }
    })
})

//------------------------FUNCION PARA QUE EL ADM AGREGUE UN USUARIO--------------------------------------------------
$("#regUsuario").click(function () {
    jQuery.support.cors = true;

    let idUser = $.trim($("#registrarIde").val());
    let name = $.trim($("#registrarNombre").val());
    let direction = $.trim($("#registrarDirec").val());
    let numMovil = $.trim($("#registrarMovil").val());
    let email = $.trim($("#registrarCorreo").val());
    let password = $.trim($("#passRegistro").val());
    let password2 = $.trim($("#passRegistro2").val());
    let zone = $.trim($("#zonaRegistro").val());
    let typeRange = $.trim($("#tipoRegistro").val());
    let regEx = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{3,10})$/;

    if (idUser == "" || name == "" || direction == "" || numMovil == "" || email == "" || password == "" || password2 == "" || zone == "" || typeRange == "") {
        alert("POR FAVOR LLENE TODOS LOS CAMPOS");
    } else if (!regEx.exec(email)) {
        alert("CORREO NO VALIDO");
    } else {

        if ($("#passRegistro").val() == $("#passRegistro2").val()) {
            let datos = {

                identification: $("#registrarIde").val(),
                name: $("#registrarNombre").val(),
                address: $("#registrarDirec").val(),
                cellPhone: $("#registrarMovil").val(),
                email: $("#registrarCorreo").val(),
                password: $("#passRegistro").val(),
                zone: $("#zonaRegistro").val(),
                type: $("#tipoRegistro").val()
            }
            console.log(datos);
            $.ajax({
                url: `http://localhost:8080/api/user/emailexist/${email}`,
                type: "GET",
                success: function (result) {

                    if (result == true) {
                        alert("YA TIENES UNA CUENTA CON ESTE CORREO ELECTRONICO");
                        return false;
                    } else {
                        
                        $.ajax({
                            url:"http://localhost:8080/api/user/new",
                            method:"POST",
                            data:JSON.stringify(datos),
                            contentType:"application/json; charset=utf-8",
                            dataType:"json",
                            Headers:{
                                "Content-Type":"application/json"
                            },
                            statusCode: {
                                201: function(response){
                                    $("#formulario3").trigger("reset");
                                    console.log(response);
                                    alert("CUENTA CREADA CORRECTAMENTE");
                                    location.href = "admin.html";
                                }
                            }
                        });
                    }
                }
            });
        } else {
            alert("LAS CONTRASEÑAS NO COINCIDEN");
        }
    }
});

// PETICION GENERAL GET
function traerGetUser(url) {
    return $.ajax({
        url: url,
        type: "GET",
        datatype: "JSON",
    });
}

/**
* Peticion general POST (Envio de datos)
*/
function peticionPosts(url, datos) {
    return $.ajax({
        url: url,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos)
    });
}
//---------------------------FUNCION PARA QUE EL ADMIN ACTUALICE UN USUARIO----------------------------------------------------
function actUsuario(id) {
    var urlServicio = "http://localhost:8080/api/user/all";
    console.log(urlServicio);

    $.ajax({
        url: urlServicio,
        type: "GET",
        contentType: "application/json; charset=utf8",
        dataType: "json",
        cache: false,

        success: function (result) {
            console.log("entro a los datos");
            console.log(result);

            for (i = 0; i < result.length; i++) {
                idUser = result[i]["id"]
                identificacion = result[i]["identification"];
                nombre = result[i]["name"];
                direccion = result[i]["address"];
                numMovil = result[i]["cellPhone"];
                correo = result[i]["email"];
                contraseña = result[i]["password"];
                zona = result[i]["zone"];
                tipoUsuario = result[i]["type"];
                if (idUser == id) {
                    $("#regIde").val(identificacion);
                    $("#regNombre").val(nombre);
                    $("#regDirec").val(direccion);
                    $("#regMovil").val(numMovil);
                    $("#regCorreo").val(correo);
                    $("#regPass").val(contraseña);
                    $("#regPass2").val(contraseña);
                    $("#regZona").val(zona);
                    $("#regTipo").val(tipoUsuario);
                }
            }
        }
    })
    $("#actualizarUsuario").click(function () {
        var urlServicio = "http://localhost:8080/api/user/update";

        var identificacion = $("#regIde").val();
        var nombre = $("#regNombre").val();
        var direccion = $("#regDirec").val();
        var numMovil = $("#regMovil").val();
        var correo = $("#regCorreo").val();
        var contraseña1 = $("#regPass").val();
        var contraseña2 = $("#regPass2").val();
        var zona = $("#regZona").val();
        var tipoUsuario = $("#regTipo").val();
        let regEx = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{3,10})$/;

        console.log(tipoUsuario);
        if (identificacion == "" || nombre == "" || direccion == "" || numMovil == "" || correo == "" || contraseña1 == "" || contraseña2 == "" || zona == "" || tipoUsuario == "") {
            return alert("POR FAVOR LLENE TODOS LOS CAMPOS");
        } else if (!regEx.exec(correo)) {
            return alert("CORREO NO VALIDO");
        } else {
            var flag = false;
            $.ajax({
                url: urlServicio,
                type: "PUT",
                async: false,
                data: JSON.stringify({ "id": id, "identification": identificacion, "name": nombre, "address": direccion, "cellPhone": numMovil, "email": correo, "password": contraseña1, "zone": zona, "type": tipoUsuario }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function () {
                    console.log(id);
                    id = 0;
                    flag = true;
                }
            });
            if (flag == true) {
                $("#formulario3").trigger("reset");
                location.href = "admin.html";

                return alert("EL USUARIO SE EDITO CORRECTAMENTE");
            }
        }
    })
}

//---------------------FUNCION PARA QUE EL ADMIN BORRE UN USUARIO----------------------------------------------------
function borrarUsuarios(id) {
    var urlServicio = "http://localhost:8080/api/user/" + id;
    $.ajax({
        url: urlServicio,
        type: "DELETE",
    });
    alert("USUARIO BORRADO DE LA BASE DE DATOS");
    location.href = "admin.html";
}
