var dadosRetorno;

$(document).ready(function () {
    $("#modalFornecedor").load("./cadFornecedor.html");
    getListarFornecedor();
});

$(function () {
    $("#btnNovo").click(function () {
        limparCampos();
        $("#fornecedorModal").modal("show");
        $("nroCep").blur(function () {
            let nroCep = this.value
            nroCep();
        })
    });
})

function getListarFornecedor() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/fornecedor/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Fornecedor não confirmado!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
    tabela += "<table class='table table-hover table-striped table-bordered table-white'";
    tabela += "    id='tabelaFornecedor'>";
    tabela += "    <thead>";
    tabela += "        <tr align='center'>";
    tabela += "            <th width='70%'>Fornecedor</th>";
    tabela += "            <th width='40%'>Telefone</th>";
    tabela += "            <th width='20%'>Ativo</th>";
    tabela += "            <th width='10%'>Editar</th>";
    tabela += "        </tr>";
    tabela += "    </thead>";
    tabela += "    <tbody>";
    for (var i in dados) {
        var simNao = dados[i].indAtivo == 'S' ? 'Sim' : 'Não';
        tabela += "     <tr>";
        tabela += "     <td width='70'>" + dados[i].dscFornecedor + "</td>";
        tabela += "     <td width='50'>" + dados[i].nroTelefone + "</td>";
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
    $("#tabelaFornecedor").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];

    if (dados.indAtivo == 'S') {
        $("#indAtivo").prop('checked', true);
    } else {
        $("#indAtivo").prop('checked', false);
    }

    $("#codFornecedor").val(dados.codFornecedor);
    $("#dscFornecedor").val(dados.dscFornecedor);
    $("#nroTelefone").val(dados.nroTelefone)
    $("#txtObs").val(dados.txtObs)
    $("#codClienteFinal").val(dados.codClienteFinal)
    $("#nroCnpj").val(dados.nroCnpj)
    $("#nroIe").val(dados.nroIe)
    $("#txtLogradouro").val(dados.txtLogradouro)
    $("#txtComplemento").val(dados.txtComplemento)
    $("#nmeBairro").val(dados.nmeBairro)
    $("#txtLocalidade").val(dados.txtLocalidade)
    $("#sglUf").val(dados.sglUf)
    $("#nroCep").val(dados.nroCep)
    $("#observacao").val(dados.observacao)
    $("#fornecedorModal").modal("show");
}

function limparCampos() {
    $("#dscFornecedor").val("");
    $("#codClienteFinal").val(0);
    $("#txtObs").val("");
    $("#nroCnpj").val("");
    $("#nroIe").val("");
    $("#nroTelefone").val("");
    $("#txtLocalidade").val("");
    $("#txtLogradouro").val("");
    $("#txtComplemento").val("");
    $("#nmeBairro").val("");
    $("#sglUf").val("");
    $("#nroCep").val("");
    $("#observacao").val("");
    $("#indAtivo").prop("checked", false),
        $("#codFornecedor").val(0);
}