var dadosRetorno;

$(document).ready(function(){
    $("#modalCliente").load("./cadCliente.html");
    getListarCliente();
});

$(function(){
    $("#btnNovo").click(function(){
        limparCampos();
        $("#clienteModal").modal("show");

    })
})

function getListarCliente() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cliente/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Cliente não confirmado!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
        tabela += "<table class='table table-hover table-striped table-bordered table-white'";
        tabela += "    id='tabelaCliente'>";
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
        tabela += "     <td width='70%'>" + dados[i].dscCliente+ "</td>";
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
    $("#tabelaCliente").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indTipoCliente == 'S') {
        $("#indTipoCliente").prop('checked', true);
    } else {
        $("#indTipoCliente").prop('checked', false);
    }
    $("#codCliente").val(dados.codCliente   );
    $("#dscCliente").val(dados.dscCliente);
    $("#nroCep").val(dados.nroCep);
    $("#txtLogradouro").val(dados.txtLogradouro);
    $("#txtComplemento").val(dados.txtComplemento);
    $("#txtLocalidade").val(dados.txtLocalidade);
    $("#sglUf").val(dados.sglUf);
    $("#txtUnidade").val(dados.txtUnidade);
    $("#codIgbe").val(dados.codIgbe);
    $("#codGia").val(dados.codGia);
    $("#txtEmail").val(dados.txtEmail);
    $("#dtaNascimento").val(dados.dtaNascimento);
    $("#nroIe").val(dados.nroIe);
    $("#nroCnpj").val(dados.nroCnpj);
    $("#nroCpf").val(dados.nroCpf);
    $("#nroTelefoneCelular").val(dados.nroTelefoneCelular);
    $("#nroTelefoneContato").val(dados.nroTelefoneContato);
    $("#codPerfilW").val(dados.dscCliente);
    $("#perfilModal").modal("show");
}

function limparCampos() {
    $("#dscCliente").val("");
    $("#nroCep").val("");
    $("#txtLogradouro").val("");
    $("#txtComplemento").val("");
    $("#nmeBairro").val("");
    $("#txtLocalidade").val("");
    $("#sglUf").val("");
    $("#txtUnidade").val("");
    $("#codIgbe").val("");
    $("#codGia").val("");
    $("#txtEmail").val("");
    $("#dtaNascimento").val("");
    $("#nroIe").val("");
    $("#nroCnpj").val("");
    $("#nroCpf").val("");
    $("#nroTelefoneCelular").val("");
    $("#nroTelefoneContato").val("");
    $("#indTipoCliente").prop("checked", false),
    $("#codCliente").val(0);
}

