var dadosRetorno;

$("#btnSalvar").click(function () {

    if ($("#codPerfilW").val() == '') {
        swal('', 'Por favor preencha o Perfil !', 'warning');
        return false;
    }
    if ($("#dscPerfilW").val() == '') {
        swal('', 'Por favor preencha a Descrição !', 'warning');
        return false;
    }

     
    var ativo = "N";
    if ($("#indAtivo").is(":checked")) {
        ativo = 'S';
    }
    var dados = JSON.stringify({
        dscPerfilW: $("#dscPerfilW").val(),
        indAtivo: ativo,
    })

    if ($("#codPerfil").val() > 0) {
        dados = JSON.stringify({
            dscPerfilW: $("#dscPerfilW").val(),
            indAtivo: ativo,
            codPerfilW: $("#codPerfilW").val()
        })
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/perfil/salvar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        data: dados,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.retorno) {
                swal("", "Perfil confirmado!!!", "success");
            } else {
                swal("", "Perfil não confirmado!!!", "error");
            }
        },
        error: function (err) {
            swal("", "Perfil não confirmado!!!", "error");
        }
    });
});