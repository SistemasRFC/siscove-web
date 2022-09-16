
$(document).ready(function () {
});
$(function () {
    $("#btnNovo").click(function () {
        
        
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

function montaTabelaProdutos(){
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
        tabela += "        <i class='fas  fa-pen'></i>";
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
