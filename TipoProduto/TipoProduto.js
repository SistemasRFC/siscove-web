var dadosRetorno;

$(document).ready(function(){
    $("#modalTipoProduto").load("./cadTipoProduto.html");
    getListarTipoProduto();
});

$(function(){
    $("#btnNovo").click(function(){
        $("#tipoProdutoModal").modal("show");
        limparCampos();

    })
})

function getListarTipoProduto() {
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
        tabela += "            <th width='20%'>Descrição</th>";
        tabela += "            <th width='5%'>Ativo</th>"; 
        tabela += "            <th width='1%'>Editar</th>";
        tabela += "        </tr>";
        tabela += "    </thead>";
        tabela += "    <tbody>";
    for (var i in dados) {
        var simNao = dados[i].indAtivo=='S'?'Sim':'Não' ;
        tabela += "     <tr>";   
        tabela += "     <td width='10%'>" + dados[i].dscTipoProduto + "</td>";
        tabela += "     <td width='5%'>" + simNao + "</td>";
        tabela += "     <td width='1%'  style='text-align:center;'>";
        tabela += "         <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "             <i class='fas  fa-pen'></i>";
        tabela += "         </a>";
        tabela += "     </td>";
        tabela += "     </tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#divTabelaTipoProduto").html(tabela);
    $("#tabelaTipoProduto").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indAtivo == 'S') {
        $("#indAtivo").prop('checked', true);
    } else {
        $("#indAtivo").prop('checked', false);
    }

    $("#codTipoProduto").val(dados.codTipoProduto);
    $("#dscTipoProduto").val(dados.dscTipoProduto);
    $("#tipoProdutoModal").modal("show");
}

function limparCampos() {
    $("#dscTipoProduto").val("");
    $("#indAtivo").prop("checked", false),
    $("#codTipoProduto").val(0);
}