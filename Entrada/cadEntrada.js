$(document).ready(function () {
    getListarEntradaEstoque();

})

function getListarEntradaEstoque() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/entrada/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabelaEntrada(data.objeto);
        },
        error: (err) => {
            swal("", " não confirmado!!!", "error");
        }
    });
}
function montaTabelaEntrada() {
    var dados = dadosRetorno;
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaEntradaAberta">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <td width="10%">Codigo </td>'
    tabela += '        <td width="50%">Data </td>'
    tabela += '        <td width="50%">Fornecedor </td>'
    tabela += '        <td width="50%">Valor Total </td>'
    tabela += '    </tr>';
    tabela += '</thead>';
    tabela += '<tbody id="corpoTabela">';

    for (var i in dados) {
        tabela += "<tr>";
        tabela += "     <td width='10'>" + dados[i].nroSequencial + "</td>";
        tabela += "     <td width='50'>" + dados[i].dtaEntrada + "</td>"; 
        if (dados[i].fornecedor == null) {
            tabela += "     <td width='50'></td>";
        } else {
            tabela += "     <td width='50'>" + dados[i].fornecedor.dscFornecedor + "</td>";
        }
        tabela += "     <td width='50'>" + dados[i].vlrTotal + "</td>"; 
        tabela += "    </a>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#tabelaEntradaAberta").html(tabela);
    $("#tabelaEntrada").DataTable();
}

// function getCalcular() {
//     $.ajax({
//         type: "GET",
//         url: "http://localhost:8080/entrada/estoque/calcular",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
//         },
