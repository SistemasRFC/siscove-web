$(document).ready(function () {
    $("#divProdutosServicos").load("cadProdutosServicos.html")
});
$(function () {
    $("#btnNovo").click(function () {
        $("#produtosServicosModal").modal("show");

    })
})
$(function () {
    $("#btnProcurar").click(function () {
        getListarProdutos();
    })
})

var dadosRetorno;

function getListarProdutos() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/produtos/listar/byTermo",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        data: $("#Termo").val(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabelaProdutos();
        },
        error: (err) => {
            swal("", "Erro!!!", "error");
        }
    });
}

function montaTabelaProdutos() {
    var dados = dadosRetorno;
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaPerfil">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <td width="25%">Descrição </td>';
    tabela += '        <td width="25%">Marca</td>';
    tabela += '        <td width="25%">Ativo</td>';
    tabela += '        <td width="25%">Açoes</td> ';
    tabela += '    </tr>';
    tabela += '</thead>';
    tabela += '<tbody id="corpoTabela">';

    for (var i in dados) {
        tabela += "<tr>";
        tabela += "<td width='25%'>" + dados[i].dscProduto + "</td>";
        tabela += "<td width='25%'>" + dados[i].dscMarca + "</td>";
        tabela += "<td width='25%'>" + dados[i].indAtivo + "</td>";
        tabela += "<td width='25%'  style='text-align:center;'>";
        tabela += "    <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "        <i class='fa  fa-pen'></i>";
        tabela += "    </a>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += '</tbody>';
    tabela += '</table>';
    $("#tabelaProduto").html(tabela);
    $("#tabelaPerfil").DataTable();
}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    $("#dscProduto").val(dados.dscProduto);
    if (dados.indAtivo == 'S') {
        $("#indAtivo").prop('checked', true);
    } else {
        $("#indAtivo").prop('checked', false);
    }
    if (dados.indComissaoGerencia == 'S') {
        $("#indComissaoGerencia").prop('checked', true);
    } else {
        $("#indComissaoGerencia").prop('checked', false);
    }
    $("#codMarca").val(dados.codMarca);
    $("#codTipoProduto").val(dados.codTipoProduto);
    $("#indSituacaoProduto").val(dados.indSituacaoProduto);
    $("#codProduto").val(dados.codProduto);
    $("#vlrProduto").val(dados.vlrProduto);
    $("#vlrMinimo").val(dados.vlrMinimo);
    $("#produtosServicosModal").modal("show");
}

function limparCampos() {
    $("#dscProduto").val("");
    $("#codMarca").val(""),
        $("#codTipoProduto").val(""),
        $("#indSituacaoProduto").val(""),
        $("#indTipoRegistro").val(""),
        $("#codProduto").val(0);
        $("#vlrProduto").val();
        $("#vlrMinimo").val();
}