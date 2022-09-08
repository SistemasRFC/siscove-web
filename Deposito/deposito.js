var dadosRetorno;

$(document).ready(function(){
    $("#modalDeposito").load("./cadDeposito.html");
    getListaDeposito();
});

$(function(){
    $("#btnNovo").click(function(){
        limparCampos();
        $("#depositoModal").modal("show");

    })
})

function getListaDeposito() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/deposito/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Deposito não confirmado!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
        tabela += "<table class='table table-hover table-striped table-bordered table-white'";
        tabela += "    id='tabelaDeposito'>";
        tabela += "    <thead>";
        tabela += "        <tr align='center'>";
        tabela += "            <th width='70%'>Cliente</th>";         
        tabela += "            <th width='40%'>Cliente Final</th>"; 
        tabela += "            <th width='20%'>Ativo</th>";       
        tabela += "            <th width='10%'>Editar</th>";
        tabela += "        </tr>";
        tabela += "    </thead>";
        tabela += "    <tbody>";
    for (var i in dados) {
        var simNao = dados[i].indAtivo=='S'?'Sim':'Não';
        tabela += "     <tr>";
        tabela += "     <td width='10'>" + dados[i].dscDeposito+ "</td>";    
        tabela += "     <td width='70%'>" + dados[i].dscClienteFinal+ "</td>";
        tabela += "     <td width='40%'>" + simNao + "</td>";
        tabela += "     <td width='10%'  style='text-align:center;'>";
        tabela += "         <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "             <i class='fas  fa-pen'></i>";
        tabela += "         </a>";
        tabela += "     </td>";
        tabela += "     </tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#divTabela").html(tabela);
    $("#tabelaDeposito").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indAtivo == 'S') {
        $("#indAtivo").prop('checked', true);
    } else {
        $("#indAtivo").prop('checked', false);
    }

    $("#codDeposito").val(dados.codDeposito);
    $("#dscDeposito").val(dados.dscDeposito);
    $("#codClienteFinal").val(dados.codClienteFinal)
    $("#depositoModal").modal("show");
}

function limparCampos() {
    $("#dscDeposito").val("");
    $("#codClienteFinal").val(0);
    $("#indAtivo").prop("checked", false),
    $("#codDeposito").val(0);
}