$(document).ready(function () {
    $("#btnProcurar").click(function () {
        getListarBaixaEstoque();

    })

})

function getListarBaixaEstoque() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/baixa/estoque/listar/byTermo/" + $("#Termo").val(),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            dadosRetorno = data;
            montaTabelaEstoque();
        },
        error: (err) => {
            swal("", "Erro!!!", "error");
        }
    });
}

function montaTabelaEstoque(dados) {
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaBaixaEstoque">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <th>Produto </th>';
    tabela += '        <th>Marca</th>';
    tabela += '        <th>Total Estoque </th>';
    tabela += '        <th>Açoes</th> ';
    tabela += "    </tr>";
    tabela += "</thead>";
    tabela += "<tbody";

    for (var i in dados) {
        tabela += "<tr>";
        tabela += "<td>" + dados[i].codProduto + "</td>";
        tabela += "<td>" + (dados[i].marca!=null?dados[i].marca.dscMarca:'') + "</td>";
        tabela += "<td>" + dados[i].indAtivo + "</td>";
        tabela += "<td width='10%'  style='text-align:center;'>";
        tabela += "    <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "        <i class='fa  fa-pen'></i>";
        tabela += "    </a>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += '</tbody>';
    tabela += '</table>';
    $("#tabelaEstoque").html(tabela);
    $("#tabelaBaixaEstoque").DataTable();
}