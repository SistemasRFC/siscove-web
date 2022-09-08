var dadosRetorno;

$(document).ready(function(){
    $("#modalMenu").load("./cadMenu.html");
    getListarMenu();
});

$(function(){
    $("#btnNovo").click(function(){
        limparCampos();
        $("#menuModal").modal("show");

    })
})

function getListarMenu() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/menu/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Menu não confirmado!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
        tabela += "<table class='table table-hover table-striped table-bordered table-white'";
        tabela += "    id='tabelaMenu'>";
        tabela += "    <thead>";
        tabela += "        <tr align='center'>";
        tabela += "            <th width='25%'>Descrição</th>";
        tabela += "            <th width='25%'>Menu Pai</th>";
        tabela += "            <th width='25%'>Rota</th>";
        tabela += "            <th width='25%'>Ativo</th>";
        tabela += "            <th width='25%'>Editar</th>";
        tabela += "        </tr>";
        tabela += "    </thead>";
        tabela += "    <tbody>";
    for (var i in dados) {
        var simNao = dados[i].indMenuAtivoW=='S'?'Sim':'Não' ;
        tabela += "     <tr>";    
        tabela += "     <td width='25%'>" + dados[i].dscMenuW + "</td>";
        tabela += "     <td width='25%'>" + dados[i].dscMenuPai + "</td>";
        tabela += "     <td width='25%'>" + dados [i].nmeController + "</td>";
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
    $("#divTabelaMenu").html(tabela);
    $("#tabelaMenu").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indAtivo == 'S') {
        $("#indMenuAtivoW").prop('checked', true);
    } else {
        $("#indMenuAtivoW").prop('checked', false);
    }

    $("#codMenuW").val(dados.codMenuW);
    $("#dscMenuW").val(dados.dscMenuW);
    $("#codMenuPaiW").val(dados.codMenuPaiW);
    $("#nmeController").val(dados.nmeController);
    $("#menuModal").modal("show");
}

function limparCampos() {
    $("#dscMenuW").val("");
    $("#nmeController").val(""),
    $("#codMenuPaiW").val(0),
    $("#indMenuAtivoW").prop("checked", false),
    $("#codMenuW").val(0);
}



