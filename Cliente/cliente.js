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
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaCliente">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <td width="20%">CPF/CNPJ</td>';
    tabela += '        <td width="25%">Nome</td>';
    tabela += '    </tr>';
    tabela += '</thead>';
    tabela += '<tbody id="corpoTabela">';

    for (var i in dados) {
        tabela += "<tr>";
        tabela += "<td width='25%'>" + dados[i].nroCpf +  dados[i].nroCnpj + "</td>";
        tabela += "<td width='50%'>" + dados[i].dscCliente + "</td>";
        tabela += "<td width='25%'  style='text-align:center;'>";
        tabela += "    <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "        <i class='fa  fa-pen'></i>";
        tabela += "    </a>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += '</tbody>';
    tabela += '</table>';
    $("#tabelaCliente").DataTable();
    $("#divTabela").html(tabela);
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
    $("#nmeBairro").val(dados.nmeBairro);
    $("#codCliente").val(dados.codCliente);
    $("#codTipoCliente").val(dados.codTipoCliente)
    $("#nroCep").val(dados.nroCep);
    $("#txtLogradouro").val(dados.txtLogradouro);
    $("#txtComplemento").val(dados.txtComplemento)
    $("#txtLocalidade").val(dados.txtLocalidade);
    $("#sglUf").val(dados.sglUf);
    $("#txtEmail").val(dados.txtEmail);
    $("#dtaNascimento").val(dados.dtaNascimento);
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
    $("#indTipoClienteJ").prop("checked", false),
    $("#indTipoClienteF").prop("checked", false),
        $("#codCliente").val(0);
}

