$(document).ready(function () {
    $("#modalCliente").load("cadCliente.html")

    $("#btnNovo").click(function () {
        limparCampos();
        $(".fisica").hide();
        $(".juridica").hide()
        $("#clienteModal").modal("show");
    })
    $("#btnProcurar").click(function () {
        getListarClientes();

    })
})

var dadosRetorno;

function getListarClientes() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/cliente/listar/byTermo",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        data: $("#Termo").val(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabelaCliente();
        },
        error: (err) => {

        }
    });
}

function montaTabelaCliente() {
    var dados = dadosRetorno;
    var tabela = '';
    tabela += "<table class='table table-hover table-striped table-bordered table-white'";
    tabela += "    id='tabelaCliente'>";
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <td width="20%">CPF/CNPJ</td>';
    tabela += '        <td width="25%">Nome</td>';
    tabela += '        <td width="25%">Ação</td>';
    tabela += '    </tr>';
    tabela += '</thead>';

    for (var i in dados) {
        tabela += "<tr>";
        if (dados[i].nroCpf != null && dados[i].nroCpf !='') {
            tabela += "     <td width='10'>" + dados[i].nroCpf + "</td>";
        }else if (dados[i].nroCnpj != null && dados[i].nroCnpj !='')  {
            tabela += "     <td width='10'>" + dados[i].nroCnpj  + "</td>";
        }else{
            tabela += "     <td width='10'></td>";
        }
        tabela += "<td width='50%'>" + dados[i].dscCliente + "</td>";
        tabela += "<td width='25%'  style='text-align:center;'>";
        tabela += "    <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "        <i class='fa  fa-pen'></i>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += '</tbody>';
    tabela += '</table>';
    $("#divTabela").html(tabela);
    $("#tabelaCliente").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    $("#dscCliente").val(dados.dscCliente);
    if (dados.indTipoCliente == 'J') {
        $("#indTipoClienteJ").prop('checked', true);
        $(".juridica").show('fade');
        $(".fisica").hide('fade');
    } else {
        $("#indTipoClienteF").prop('checked', true);
        $(".juridica").hide('fade');
        $(".fisica").show('fade');
    }
    $("#dscCliente").val(dados.dscCliente);
    if (dados.indTipoCliente == "") {
        $("#indTipoCliente").prop('checked', true);
        $(".juridica").hide('fade');
        $(".fisica").hide('fade');
    }
    $("#dscCliente").val(dados.dscCliente);
    if (dados.indTipoCliente == "-1") {
        $("#indTipoCliente").prop('checked', true);
        $(".juridica").hide('fade');
        $(".fisica").hide('fade');
    }
    $("#codCliente").val(dados.codCliente);
    $("#codTipoCliente").val(dados.codTipoCliente)
    $("#nroCep").val(dados.nroCep);
    $("#dtaNascimento").val(dados.dtaNascimento);
    $("#txtLogradouro").val(dados.txtLogradouro);
    $("#txtComplemento").val(dados.txtComplemento);
    $("#nmeBairro").val(dados.nmeBairro);
    $("#txtLocalidade").val(dados.txtLocalidade);
    $("#sglUf").val(dados.sglUf);
    $("#txtEmail").val(dados.txtEmail);
    $("#nroIe").val(dados.nroIe);
    $("#nroCnpj").val(dados.nroCnpj);
    $("#nroCpf").val(dados.nroCpf);
    $("#nroTelefoneCelular").val(dados.nroTelefoneCelular);
    $("#nroTelefoneContato").val(dados.nroTelefoneContato);
    $("#clienteModal").modal("show");
}

function limparCampos() {
    $("#dscCliente").val("");
    $("#nroCep").val("");
    $("#txtLogradouro").val("");
    $("#txtComplemento").val("");
    $("#nmeBairro").val("");
    $("#txtLocalidade").val("");
    $("#sglUf").val("");
    $("#txtEmail").val("");
    $("#dtaNascimento").val("");
    $("#nroIe").val("");
    $("#nroCnpj").val("");
    $("#nroCpf").val("");
    $("#nroTelefoneCelular").val("");
    $("#nroTelefoneContato").val("");
    $("#codTipoCliente").val("");
    $("#indTipoClienteF").prop("checked", false),
        $("#indTipoClienteJ").prop("checked", false),
        $("#codCliente").val(0);
}