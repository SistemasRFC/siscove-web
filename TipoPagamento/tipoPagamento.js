$(document).ready(function(){
    $("#modalTipoPagamento").load("./cadTipoPagamento.html");
    getListarTipoPagamento();
});

$(function(){
    $("#btnNovo").click(function(){
        $("#tipoPagamentoModal").modal("show");
        limparCampos();
        
    })
})

var dadosRetorno;

function getListarTipoPagamento() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/tipo/pagamento/listar",
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
        tabela += "    id='tabelaPagamento'>";
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
        tabela += "     <td width='10%'>" + dados[i].dscTipoPagamento + "</td>";
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
    $("#divTabelaTipoPagamento").html(tabela);
    $("#tabelaTipoPagamento").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indAtivo == 'S') {
        $("#indAtivo").prop('checked', true);
    } else {
        $("#indAtivo").prop('checked', false);
    }

    $("#codTipoPagamento").val(dados.codTipoPagamento);
    $("#dscTipoPagamento").val(dados.dscTipoPagamento);
    $("#tipoPagamentoModal").modal("show");
}

function limparCampos() {
    $("#dscTipoPagamento").val("");
    $("#indAtivo").prop("checked", false),
    $("#codTipoPagamento").val(0);
}