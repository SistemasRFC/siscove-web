$(document).ready(function () {
    $("#modalCliente").load("cadCliente.html")

    $("#btnNovo").click(function () {
        limparCampos();
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
            swal("", "Sao Paulo Campeao!!!", "error");
        }
    });
}

function montaTabelaCliente() {
    var dados = dadosRetorno;
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaCliente">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <td width="25%">CPF </td>';
    tabela += '        <td width="25%">Nome</td>';
    tabela += '    </tr>';
    tabela += '</thead>';
    tabela += '<tbody id="corpoTabela">';

    for (var i in dados) {
        tabela += "<tr>";
        tabela += "<td width='50%'>" + dados[i].nroCpf + "</td>";
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

    if (dados.indTipoCliente == 'J') {
        $("#indTipoCLienteJ").prop('checked', true);
        $(".fisica").show('fade');
        $(".jurídica").hide('fade');
    } else {
        $("#indTipoCLienteF").prop('checked', true);
        $(".fisica").show('fade');
        $(".jurídica").hide('fade');
    }
    $("#codCliente").val(dados.codCliente);
    $("#codTipoCliente").val(dados.codTipoCliente)
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
    $("#dscCliente").val(dados.dscCliente);
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
    $("#codTipoCliente").val("");
    $("#indTipoCliente").prop("checked", false),
        $("#codCliente").val(0);
}

