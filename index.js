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
            beforeSend: function (xhr){ 
                xhr.setRequestHeader('Authorization', "getToken");
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                console.log(data);
                localStorage.setItem("token", data.objeto.txtToken);
                //localStorage.getItem("token");
                if (data.retorno){
                    swal("", "Usuário confirmado!!!", "success");
                    window.location.href='MenuPrincipal/menuPrincipal.html'
                }else{
                    swal("", data.mensagem, "error"); 
                }
            },
            error: function(err) {
                    swal("", "Erro ao consultar usuário!", "error"); 
                }
            });
        });
    })