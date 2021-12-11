//FUNCION PARA QUE LOS USUARIOS SE REGISTREN
$("#registrarUsuario").click(function(){
    jQuery.support.cors = true;

    let idUser = $.trim($("#idRegistrar").val());
    let name = $.trim($("#nombreRegistrar").val());
    let direction = $.trim($("#direcRegistrar").val());
    let numMovil= $.trim($("#movilRegistrar").val());
    let email = $.trim($("#correoRegistrar").val());
    let password = $.trim($("#registroPass").val());
    let password2 = $.trim($("#registroPass2").val());
    let zone = $.trim($("#registroZona").val());
    let typeRange = $.trim($("#registroTipo").val());
    let regEx = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{3,10})$/;

    //CONDICION PARA VALIDAR QUE LOS CAMPOS ESTEN LLENOS, CORREO INCORRECTO Y CONTRASEÑAS NO COINSIDEN
    if(idUser == "" || name == "" || direction == "" || numMovil == "" || email == "" || password == "" || password2 == "" || zone == "" || typeRange == ""){
        alert("POR FAVOR LLENE TODOS LOS CAMPOS");
    }else if (!regEx.exec(email)){
        alert("CORREO NO VALIDO");
    }else {
        
        if($("#regPass").val() == $("#regPass2").val()){
            let datos = {
                identification:$("#idRegistrar").val(),
                name:$("#nombreRegistrar").val(),
                address:$("#direcRegistrar").val(),
                cellPhone:$("#movilRegistrar").val(),
                email:$("#correoRegistrar").val(),
                password:$("#registroPass").val(),
                zone:$("#registroZona").val(),
                type:$("#registroTipo").val()
            }
            console.log(datos);
            $.ajax({
                url:`http://localhost:8080/api/user/emailexist/${email}`,
                type:"GET",
                success: function (result){
                    
                    if (result == true) {
                        alert("YA TIENES UNA CUENTA CON ESTE CORREO ELECTRONICO");
                        return false;
                    }else{
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
                                    $("#formulario2").trigger("reset");
                                    console.log(response);
                                    alert("CUENTA CREADA CORRECTAMENTE");
                                    location.href = "index.html";
                                }
                            }
                        });
                    }
                },
            });
        }else{
            alert("LAS CONTRASEÑAS NO COINCIDEN");
        }
    }
});