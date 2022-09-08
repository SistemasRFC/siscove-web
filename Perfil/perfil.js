var dadosRetorno;

$(document).ready(function(){
    $("#modalPerfil").load("./cadPerfil.html");
    getListarPerfil();
});

$(function(){
    $("#btnNovo").click(function(){
        limparCampos();
        $("#perfilModal").modal("show");

    })
})

function getListarPerfil() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/perfil/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Perfil não confirmado!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
        tabela += "<table class='table table-hover table-striped table-bordered table-white'";
        tabela += "    id='tabelaPerfil'>";
        tabela += "    <thead>";
        tabela += "        <tr align='center'>";
        tabela += "            <th width='70%'>Descrição</th>";         
        tabela += "            <th width='20%'>Ativo</th>";        
        tabela += "            <th width='10%'>Editar</th>";
        tabela += "        </tr>";
        tabela += "    </thead>";
        tabela += "    <tbody>";
    for (var i in dados) {
        var simNao = dados[i].indAtivo=='S'?'Sim':'Não' ;
        tabela += "     <tr>";    
        tabela += "     <td width='70%'>" + dados[i].dscPerfilW+ "</td>";
        tabela += "     <td width='20%'>" + simNao + "</td>";
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
    $("#tabelaPerfil").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indAtivo == 'S') {
        $("#indAtivo").prop('checked', true);
    } else {
        $("#indAtivo").prop('checked', false);
    }

    $("#coPerfilW").val(dados.codPerfilW);
    $("#dscPerfilW").val(dados.dscPerfilW);
    $("#perfilModal").modal("show");
}

function limparCampos() {
    $("#dscPerfilW").val("");
    $("#indAtivo").prop("checked", false),
    $("#codPerfilW").val(0);
}

