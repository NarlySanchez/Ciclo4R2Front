//------------FUNCION PARA INICIAR SESION CON EL LOGIN
$("#btn-ingreso").click(function(){
    jQuery.support.cors = true;
    let userEmail = $.trim($("#input-email").val());                //el .trim hace que quite espacios vacios
    let userPass = $.trim($("#input-pass").val());
    let regEx = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{3,10})$/;  // Valida que el correo se ingrese con sus caracteres especiales "correo@ejemplo.com"
    
    //VALIDA SI EL CORREO Y CONTRASEÑA COINCIDEN EN LA BASE DE DATOS
    if(userEmail == "" || userPass == ""){                          //validar campos vacios
        alert("POR FAVOR INGRESE UN CORREO Y UNA CONTRASEÑA");
    }else if (!regEx.exec(userEmail)){                                  // valida que el ingreso del correo sea correcto correo@example.com
        alert("CORREO NO VALIDO");
    }else {let datos = {                                            // valida los datos para ingresar
            email: userEmail,
            password: userPass
        }
        $.ajax({
            url:"http://localhost:8080/api/user/" + datos.email + "/" + datos.password,
            method: "GET",
            dataType: "json",
            success:function(response){        
                console.log(response);
                $("#formulario1").trigger("reset");
                if(response.id != null ){
                    alert(`BIENVENIDO:  ${response.id}, ${response.name}, ${response.email}, ${response.type}`);
                    if(response.type == "ADM"){
                        location.href = "admin.html";
                    }else if(response.type == "COORD"){
                        location.href = "coord.html";
                    }else if(response.type == "ASE"){
                        location.href = "ase.html";
                    }
                }else {
                    alert("EL USUARIO NO EXISTE, ¡REGISTRATE!");
                }
            }
        });
    }
});