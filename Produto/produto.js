var dadosRetorno;

$(document).ready(function(){
    $("#modalProduto").load("./cadProduto.html");
    getListarProduto();
});

$(function(){
    $("#btnNovo").click(function(){
        limparCampos();
        $("#produtoModal").modal("show");

    })
})

function getListarProduto() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/produto/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Produto não confirmado!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
        tabela += "<table class='table table-hover table-striped table-bordered table-white'";
        tabela += "    id='tabelaProduto'>";
        tabela += "    <thead>";
        tabela += "        <tr align='center'>";
        tabela += "            <th width='25%'>Descrição</th>";
        tabela += "            <th width='25%'>Cliente Final</th>";
        tabela += "            <th width='25%'>Rota</th>";
        tabela += "            <th width='25%'>Ativo</th>";
        tabela += "            <th width='25%'>Editar</th>";
        tabela += "        </tr>";
        tabela += "    </thead>";
        tabela += "    <tbody>";
    for (var i in dados) {
        var simNao = dados[i].indAtivo=='S'?'Sim':'Não' ;
        tabela += "     <tr>";    
        tabela += "     <td width='25%'>" + dados[i].dscTipoProduto + "</td>";
        tabela += "     <td width='25%'>" + dados[i].dscTipoProduto + "</td>";
        tabela += "     <td width='25%'>" + dados [i].dscClienteFinal + "</td>";
        tabela += "     <td width='25%'>" + simNao + "</td>";
        tabela += "     <td width='25%'  style='text-align:center;'>";
        tabela += "         <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "             <i class='fas  fa-pen'></i>";
        tabela += "         </a>";
        tabela += "     </td>";
        tabela += "     </tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#divTabelaProduto").html(tabela);
    $("#tabelaProduto").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indAtivo == 'S') {
        $("#indAtivo").prop('checked', true);
    } else {
        $("#indAtivo").prop('checked', false);
    }

    $("#codTipoProduto").val(dados.codMenuW);
    $("#dscTipoProduto").val(dados.dscMenuW);
    $("#codClienteFinal").val(dados.codMenuPaiW);
    $("#produtoModal").modal("show");
}

function limparCampos() {
    $("#dscTipoProduto").val("");
    $("#codClienteFinal").val(0),
    $("#indAtivo").prop("checked", false),
    $("#codTipoProduto").val(0);
}