$(function(){
    $("#btnLogar").click(function(){
        swal("Aguarde!");
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/login/validar",
            data: JSON.stringify({
                nmeUsuario: $("#nomeUsuario").val(),
                txtSenha: $("#txtSenha").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                console.log(data);
                if (data.retorno){
                    swal("", "Usuário confirmado!!!", "success");
                    window.location.href='MenuPrincipal/menuPrincipal.html'
                }else{
                    swal("", "Usuário não confirmado!!!", "error"); 
                }
            },
            error: function(err) {
                    swal("", "Usuário não confirmado!!!", "error"); 
                }
            });
        });
    })