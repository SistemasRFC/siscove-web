var dadosRetorno;

$(document).ready(function(){
    $("#modalMarca").load("./cadTelaMarca.html");
    getListaMarca();
});

$(function(){
    $("#btnNovo").click(function(){
        limparCampos();
        $("#marcaModal").modal("show");

    })
})

function getListaMarca() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/marca/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Marca não confirmada!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
        tabela += "<table class='table table-hover table-striped table-bordered table-white'";
        tabela += "    id='tabelaDeposito'>";
        tabela += "    <thead>";
        tabela += "        <tr align='center'>";
        tabela += "            <th width='50%'>Descrição</th>";         
        tabela += "            <th width='30%'>Ativo</th>";       
        tabela += "            <th width='10%'>Editar</th>";
        tabela += "        </tr>";
        tabela += "    </thead>";
        tabela += "    <tbody>";
    for (var i in dados) {
        var simNao = dados[i].indAtiva=='S'?'Sim':'Não';
        tabela += "     <tr>";
        tabela += "     <td width='50'>" + dados[i].dscMarca+ "</td>";    
        tabela += "     <td width='30%'>" + simNao + "</td>";
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
    $("#tabelaMarca").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indAtiva == 'S') {
        $("#indAtiva").prop('checked', true);
    } else {
        $("#indAtiva").prop('checked', false);
    }

    $("#codMarca").val(dados.codMarca);
    $("#dscMarca").val(dados.dscMarca);
    $("#codClienteFinal").val(dados.codClienteFinal)
    $("#modalMarca").modal("show");
}

function limparCampos() {
    $("#dscMarca").val("");
    $("#codClienteFinal").val(0);
    $("#indAtiva").prop("checked", false),
    $("#codMarca").val(0);
}