var dadosRetorno;

$(document).ready(function(){
    $("#modalMenu").load("./cadMenu.html");
    getListarMenu();
});

$(function(){
    $("#btnNovo").click(function(){


    })
})

function getListarMenu() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/menu/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Menu não confirmado!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
    for (var i in dados) {
        var simNao = dados[i].indMenuAtivoW=='S'?'Sim':'Não' ;
        tabela += "<tr>";    
        tabela += "<td width='25%'>" + dados[i].dscMenuW + "</td>";
        tabela += "<td width='25%'>" + dados[i].dscMenuPai + "</td>";
        tabela += "<td width='25%'>" + simNao + "</td>";
        tabela += "<td width='25%'  style='text-align:center;'>";
        tabela += "    <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "        <i class='fas  fa-pen'></i>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    $("#corpoTabela").html(tabela);
    $("#tabelaPerfil").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    $("#nmeController").val(dados.nmeController);
    if (dados.indAtivo == 'S') {
        $("#indMenuAtivoW").prop('checked', true);
    } else {
        $("#indMenuAtivoW").prop('checked', false);
    }
    $("#nroTelCelular").val(dados.nroTelCelular);
    $("#txtEmail").val(dados.txtEmail);
    $("#codMenuW").val(dados.codMenuW);
    $("#nmeControllerCompleto").val(dados.nmeControllerCompleto);
    $("#vlrPorcentagemGerencia").val(dados.vlrPorcentagemGerencia);
    $("#vlrPorcentagemVenda").val(dados.vlrPorcentagemVenda);
    $("#vlrPorcentagemServico").val(dados.vlrPorcentagemServico);
    $("#menuModal").modal("show");
}



