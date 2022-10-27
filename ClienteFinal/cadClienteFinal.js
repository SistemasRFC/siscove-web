$(document).ready(function () {
    $(".indTipoCliente").change(function () {
        if ($("#indTipoClienteJ").prop('checked')) {
            $(".divPessoaF").hide();
            $(".divPessoaJ").show();
            $("#nroCpf").val('');
        } else if ($("#indTipoClienteF").prop('checked')) {
            $(".divPessoaJ").hide();
            $(".divPessoaF").show();
            $("#nroCnpj").val('');
        } else {
            $(".divPessoaF").hide();
            $(".divPessoaJ").hide();
        }
    })
})
var dadosRetorno;

$("#btnSalvar").click(function () {
    var ativo = $("#indAtivo").is(":checked") ? "S" : "N";
    var indTipoCliente = $("#indTipoClienteJ").prop('checked') ? "J" : "F";

    var dados = JSON.stringify({
        nmeClienteFinal: $("#nmeClienteFinal").val(),
        indTipoCliente: indTipoCliente,
        nroCnpj: $("#nroCnpj").val(),
        nroCpf: $("#nroCpf").val(),
        indAtivo: ativo,
    });

    if ($("#codClienteFinal").val() > 0) {
        dados = JSON.stringify({
            nmeClienteFinal: $("#nmeClienteFinal").val(),
            indTipoCliente: indTipoCliente,
            nroCnpj: $("#nroCnpj").val(),
            nroCpf: $("#nroCpf").val(),
            indAtivo: ativo,
            codClienteFinal: $("#codClienteFinal").val()
        });
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/clienteFinal/salvar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        data: dados,

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.retorno) {
                $("#clienteFinalModal").modal("hide");
                swal("", "Cliente Final salvo!!!", "success");
                getListaClienteFinal();
            } else {
                swal("", "Cliente Final não salvo!!!", "error");
            }
        },
        error: function (err) {
            swal("", "Cliente Final não salvo!!!", "error");
        }
    });
});


function criarComboClienteFinal() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/clienteFinal/listar/ativos",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.retorno) {
                montarComboClienteFinal(data.objeto)
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao consultar cliente final!", "error");
        }
    });
}

function montarComboClienteFinal(obj) {
    var html = "<select id='codClienteFinal' class='form-control dropdown-toggle'>";
    html += "<option value='0'>Selecione</option>"
    if (obj.length > 0) {
        for (var i in obj) {
            html += "<option value=" + obj[i].codClienteFinal + ">" + obj[i].nmeClienteFinal + "</option>"
        }
    }
    html += "</select>";
    $("#comboClienteFinal").html(html);
}

$(document).ready(function () {
    criarComboClienteFinal()
});