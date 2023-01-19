$(document).ready(function () {
    $("#divProdutosServicos").load("cadProdutosServicos.html")

    $("#btnNovo").click(function () {
        limparCampos();
        $("#produtosServicosModal").modal("show");
    })

    $("#btnProcurar").click(function () {
        getListarProdutos();
    })
})
$('.basicAutoComplete').on('autocomplete.select', function (evt, item) {
    console.log(item)
    $("#codProduto").val(item.codProduto);
    $('.basicAutoSelectSelected').html(item ? JSON.stringify(item) : 'null');
});
var dadosRetorno;

function getListarProdutos() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/produtos/listar/byTermo/" + $("#Termo").val(),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            dadosRetorno = data;
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
        tabela += "<td width='25%'>" + (dados[i].marca!=null?dados[i].marca.dscMarca:'') + "</td>";
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
    if (dados.indTipoRegistro == 'S') {
        $("#indTipoRegistroS").prop('checked', true);
        $(".produto").hide('fade');
        $(".servico").show('fade');
    } else {
        $("#indTipoRegistroP").prop('checked', true);
        $(".produto").show('fade');
        $(".servico").hide('fade');
    }
    if (dados.indSituacaoProduto == 'N') {
        $("#indSituacaoProdutoN").prop('checked', true);
    } else {
        $("#indSituacaoProdutoS").prop('checked', true);
    }
    $("#codMarca").val(dados.codMarca);
    $("#codTipoProduto").val(dados.codTipoProduto);
    $("#codProduto").val(dados.codProduto);
    $("#vlrProduto").val(dados.vlrProduto);
    $("#vlrMinimo").val(dados.vlrMinimo);
    $("#produtosServicosModal").modal("show");

}

function limparCampos() {
    $("#dscProduto").val("");
    $("#indComissaoGerencia").val("");
    $("#indTipoRegistro").val(""),
        $("#indSituacaoProduto").val(""),
        $("#codMarca").val(""),
        $("#codTipoProduto").val(""),
        $("#codProduto").val(""),
        $("#vlrProduto").val(""),
        $("#vlrMinimo").val(""),
        $("#indAtivo").prop('checked', false);
    $("#indSituacaoProdutoS").prop('checked', false);
    $("#indSituacaoProdutoN").prop('checked', false);
    $("#indComissaoGerencia").prop('checked', false);
    $("#indTipoRegistroP").prop('checked', false);
    $("#indTipoRegistroS").prop('checked', false);
    $("#codProduto").val(0);
}