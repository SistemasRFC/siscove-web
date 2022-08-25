

$(document).ready(function () {
    $("#modalUsuario").load("cadUsuario.html")
    getListaPerfil();

    $("#btnNovo").click(function(){
        limparCampos();
        $("#usuarioModal").modal("show");
    })
});

var dadosRetorno;

function getListaPerfil() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/usuario/listar",
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
    for (var i in dados) {
        tabela += "<tr>";
        tabela += "<td width='25%'>" + dados[i].nmeUsuario + "</td>";
        tabela += "<td width='25%'>" + dados[i].codPerfilW + "</td>";
        tabela += "<td width='25%'>" + dados[i].nmeUsuarioCompleto + "</td>";
        tabela += "<td width='25%'>" + dados[i].indAtivo + "</td>";
        tabela += "<td width='25%'  style='text-align:center;'>";
        tabela += "    <a href='javascript:deleteRegistro(" + dados[i].codUsuario + ")'>";
        tabela += "        <i class='fas  fa-trash'></i>";
        tabela += "    </a>";
        tabela += "    <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "        <i class='fas  fa-pen'></i>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    $("#tabelaPerfil").html(tabela);
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
    $("#codPerfilW").val(dados.codPerfilW);
    $("#nmeUsuarioCompleto").val(dados.nmeUsuarioCompleto);
    $("#vlrPorcentagemGerencia").val(dados.vlrPorcentagemGerencia);
    $("#vlrPorcentagemVenda").val(dados.vlrPorcentagemVenda);
    $("#vlrPorcentagemServico").val(dados.vlrPorcentagemServico);
    $("#codUsuario").val(dados.codUsuario);
    $("#usuarioModal").modal("show");
}

function limparCampos() {
    $("#nmeUsuario").val("");
    $("#nroTelCelular").val(),
        $("#txtEmail").val(),
        $("#codPerfilW").val(),
        $("#codDeposito").val(),
        $("#nmeUsuarioCompleto").val(),
        $("#vlrPorcentagemGerencia").val(),
        $("#vlrPorcentagemVenda").val(),
        $("#vlrPorcentagemServico").val(),
        $("#indAtivo").val("");
    $("#codUsuario").val(0);
}
