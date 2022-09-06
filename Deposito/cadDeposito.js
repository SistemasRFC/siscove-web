var dadosRetorno;

$("#btnSalvar").click(function () {

    if ($("#dscDeposito").val() == '') {
        swal('', 'Por favor preencha a Descrição !', 'warning');
        return false;
    }

    var ativo = "N";
    if ($("#indAtivo").is(":checked")) {
        ativo = 'S';
    }
    var dados = JSON.stringify({
        dscDeposito: $("#dscDeposito").val(),
        indAtivo: ativo,
    })

    if ($("#codDeposito").val() > 0) {
        dados = JSON.stringify({
            dscDeposito: $("#dscDeposito").val(),
            indAtivo: ativo,
            codDeposito: $("#codDeposito").val()
        })
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/deposito/salvar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        data: dados,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.retorno) {
                swal({
                    title: "",
                    text: "Deposito salvo!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                getListarPerfil();
                $("#depositoModal").modal("hide");
            } else {
                swal("", "Deposito não salvo!", "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao salvar Deposito!", "error");
        }
    });
});