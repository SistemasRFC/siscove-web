var dadosRetorno;

$(document).ready(function(){
    $("#modalClienteFinal").load("./cadClienteFinal.html");
    getListaClienteFinal();
});

$(function(){
    $("#btnNovo").click(function(){
        limparCampos();
        $("#clienteFinalModal").modal("show");

    })
})

function getListaClienteFinal() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/clienteFinal/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Cliente Final não confirmado!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
        tabela += "<table class='table table-hover table-striped table-bordered table-white'";
        tabela += "    id='tabelaClienteFinal'>";
        tabela += "    <thead>";
        tabela += "        <tr align='center'>";       
        tabela += "            <th width='40%'>Cliente Final</th>"; 
        tabela += "            <th width='20%'>Ativo</th>";       
        tabela += "            <th width='10%'>Editar</th>";
        tabela += "        </tr>";
        tabela += "    </thead>";
        tabela += "    <tbody>";
    for (var i in dados) {
        var simNao = dados[i].indAtivo=='S'?'Sim':'Não';
        tabela += "     <tr>";   
        tabela += "     <td width='40%'>" + dados[i].nmeClienteFinal + "</td>";
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
    $("#tabelaClienteFinal").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indAtivo == 'S') {
        $("#indAtivo").prop('checked', true);
    } else {
        $("#indAtivo").prop('checked', false);
    }

    $("#codClienteFinal").val(dados.codClienteFinal)
    $("#clienteFinalModal").modal("show");
}

function limparCampos() {
    $("#codClienteFinal").val(0);
    $("#indAtivo").prop("checked", false);
}