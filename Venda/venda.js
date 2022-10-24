var dadosRetorno;

$(document).ready(function(){
    $("#modalVenda").load("./venda.html");
    getListaVenda();
});

$(function(){
    $("#btnNovo").click(function(){
        limparCampos();
        $("#modalVenda").modal("show");

    })
})

function getListaVenda() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/venda/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Venda não confirmada!!!", "error");
        }
    });
}


function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indAtiva == 'S') {
        $("#indAtiva").prop('checked', true);
    } else {
        $("#indAtiva").prop('checked', false);
    }

    $("#codVenda").val(dados.codMarca);
    $("#dsc").val(dados.dscMarca);
    $("#marcaModal").modal("show");
}

function limparCampos() {
    $("#dscMarca").val("");
    $("#indAtiva").prop("checked", false),
    $("#codMarca").val(0);
}