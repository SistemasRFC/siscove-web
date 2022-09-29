var dadosRetorno;

$("#btnSalvar").click(function () {

    if ($("#dscMarca").val() == '') {
        swal('', 'Por favor preencha a Descrição !', 'warning');
        return false;
    }

    var ativo = "N";
    if ($("#indAtiva").is(":checked")) {
        ativo = 'S';
    }
    var dados = JSON.stringify({
        dscMarca: $("#dscMarca").val(),
        indAtiva: ativo,
    })

    if ($("#codMarca").val() > 0) {
        dados = JSON.stringify({ 
            dscMarca: $("#dscMarca").val(),
            indAtiva: ativo,
            codMarca: $("#codMarca").val(),
        })
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/marca/salvar",
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
                    text: "Marca salva!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                getListaMarca();
                $("#marcaModal").modal("hide");
            } else {
                swal("", "Marca não salva!", "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao salvar Marca!", "error");
        }
    });
});


