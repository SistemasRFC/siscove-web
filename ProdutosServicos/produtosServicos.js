$(document).ready(function () {
    getListarProdutos();

    $("#btnNovo").click(function () {
    })
});

function getListarProdutos() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cadastoprodutos/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Erro!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaProduto">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <td width="25%">Produto </td>';
    tabela += '        <td width="25%">Ativo</td>';
    tabela += '        <td width="25%">Cod Marca</td>';
    tabela += '    </tr>';
    tabela += '</thead>';
    tabela += '<tbody id="corpoTabela">';
    tabela += "</td>";
    tabela += "</tr>";
    
    for (var i in dados) {
        tabela += "<tr>";
        tabela += "<td width='25%'>" + dados[i].dscProduto + "</td>";
        tabela += "<td width='25%'>" + dados[i].indAtivo + "</td>";
        tabela += "<td width='25%'>" + dados[i].codMarca + "</td>";
        tabela += "<td width='25%'  style='text-align:center;'>";
        tabela += "</tr>";
    }
    tabela += '</tbody>';
    tabela += '</table>';
        $("#tabelaProduto").html(tabela);
    }
