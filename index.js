$(function () {
    $("#btnLogar").click(function () {
        if ($("#nmeUsuario").val() == '') {
            swal('', 'Por favor preencha o Usuario ', 'warning');
            return false;
        }
        if ($("#txtSenha").val() == '') {
            swal('', 'Por favor preencha a Senha ', 'warning');
            return false;
        }
        var ativo = "N";
        if ($("#indLogado").is(":checked")) {
            ativo = 'S';
        }
        var dados = JSON.stringify({
            nmeUsuario: $("#nomeUsuario").val(),
            txtSenha: $("#txtSenha").val(),
            indLogado: ativo,

        })
        if ($("#codToken").val() > 0) {
            dados = JSON.stringify({
                nmeUsuario: $("#nmeUsuario").val(),
                txtSenha: $("#txtSenha").val(),
                indLogado: ativo,
                codToken: $("#codToken").val()
            })
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/login/validar",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "getToken");
            },
            data: dados,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.retorno) {
                    swal("", "Usuario confirmado", "success");
                    localStorage.setItem("token", data.objeto.txtToken);
                    window.location.href='MenuPrincipal/menuPrincipal.html'
                } else {
                    swal("", "Usuário não confirmado!!!", "error");
                }
            },
            error: function (err) {
                swal("", "Usuário não confirmado!!!", "error");
            }
        });
    });
})