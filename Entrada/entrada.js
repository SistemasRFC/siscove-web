$(document).ready(function () {
    getListaDepositoAtivos();

    $("#btnNovo").click(function () {
        limparCampos();
    })
});

var dadosRetorno;

function getListarEntrada() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/entrada/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Entrada não confirmado!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaEntrada">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <td width="25%">Login </td>';
    tabela += '        <td width="25%">Perfil</td>';
    tabela += '        <td width="25%">Nome</td>';
    tabela += '        <td width="25%">Ativo</td>';
    tabela += '        <td width="25%">Açoes</td> ';                                                  
    tabela += '    </tr>';
    tabela += '</thead>';
    tabela += '<tbody id="corpoTabela">';

    for (var i in dados) {
        tabela += "<tr>";
        tabela += "<td width='25%'>" + dados[i].nmeUsuario + "</td>";
        tabela += "<td width='25%'>" + dados[i].perfilDto.dscPerfilW + "</td>";
        tabela += "<td width='25%'>" + dados[i].nmeUsuarioCompleto + "</td>";
        tabela += "<td width='25%'>" + dados[i].indAtivo + "</td>";
        tabela += "<td width='25%'  style='text-align:center;'>";
        tabela += "    <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "        <i class='fas  fa-pen'></i>";
        tabela += "    </a>";
        tabela += "    </a>";
        tabela += "    <a href='javascript:reniciarSenha(" + dados[i].codUsuario + ")'>";
        tabela += "        <i class='fas fa-redo-alt'></i>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += '</tbody>';
    tabela += '</table>';
    $("#tabelaUsuario").html(tabela);
    $("#tabelaPerfil").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    $("#nmeUsuario").val(dados.nmeUsuario);
    if (dados.indAtivo == 'S') {
        $("#indAtivo").prop('checked', true);
    } else {
        $("#indAtivo").prop('checked', false);
    }
    $("#nroTelCelular").val(dados.nroTelCelular);
    $("#txtEmail").val(dados.txtEmail);
    $("#codPerfilW").val(dados.perfilDto.codPerfilW);
    $("#nmeUsuarioCompleto").val(dados.nmeUsuarioCompleto);
    $("#vlrPorcentagemGerencia").val(dados.vlrPorcentagemGerencia);
    $("#vlrPorcentagemVenda").val(dados.vlrPorcentagemVenda);
    $("#vlrPorcentagemServico").val(dados.vlrPorcentagemServico);
    $("#codUsuario").val(dados.codUsuario);
    $("#usuarioModal").modal("show");
}

function limparCampos() {
    $("#nmeUsuario").val("");
    $("#nroTelCelular").val(""),
        $("#txtEmail").val(""),
        $("#codPerfilW").val(""),
        $("#codDeposito").val(""),
        $("#nmeUsuarioCompleto").val(""),
        $("#vlrPorcentagemGerencia").val(""),
        $("#vlrPorcentagemVenda").val(""),
        $("#vlrPorcentagemServico").val(""),
        $("#indAtivo").val(""),
        $("#codUsuario").val(0);
}

function getListarAtivos() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/fornecedor/listar/ativos",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        
        success: function (data) {
            if (data.retorno) {
                montaComboFornecedorAtivo(data.objeto);
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: (err) => {
            swal("", "Fornecedor  não confirmada!!!", "error");
        }
    });
}

function montaComboFornecedorAtivo(dados) {
    var tabela = '';
    tabela += '<option value="">Selecione </option>';
    for (var i in dados) {
        tabela  += '<option value="' + dados[i].codFornecedor + '">' + dados[i].dscFornecedor + ' </option>';
    }
    $("#codFornecedor").html(tabela);
}

function getListaDepositoAtivos() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/deposito/listar/ativos",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        
        success: function (data) {
            if (data.retorno) {
                montaComboDepositoAtivos(data.objeto);
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: (err) => {
            swal("", "Deposito  não confirmada!!!", "error");
        }
    });
}

function montaComboDepositoAtivos(dados) {
    var tabela = '';
    tabela += '<option value="">Selecione </option>';
    for (var i in dados) {
        tabela  += '<option value="' + dados[i].codDeposito + '">' + dados[i].dscDeposito + ' </option>';
    }
    $("#codDeposito").html(tabela);
}