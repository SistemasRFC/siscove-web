$(document).ready(function () {
    getListaPerfil();
    getListaDeposito();
});

var dadosRetorno;

$("#btnSalvar").click(function () {

    if ($("#nmeUsuario").val() == '') {
        swal('', 'Por favor preencha o Login !', 'warning');
        return false;
    }
    if ($("#nroTelCelular").val() == '') {
        swal('', 'Por favor preencha o Numero de Telefone Celular !', 'warning');
        return false;
    }
    if ($("#txtEmail").val() == '') {
        swal('', 'Por favor preencha o Email !', 'warning');
        return false;
    }
    if ($("#codPerfilW").val() == '') {
        swal('', 'Por favor preencha o Perfil !', 'warning');
        return false;
    }
    if ($("#codDeposito").val() == '') {
        swal('', 'Por favor preencha o Deposito !', 'warning');
        return false;
    }
    if ($("#nmeUsuarioCompleto").val() == '') {
        swal('', 'Por favor preencha o Nome Usuario Completo !', 'warning');
        return false;
    }
    if ($("#txtSenhaW").val() == '') {
        swal('', 'Por favor preencha o Senha !', 'warning');
        return false;
    }
    if ($("#txtSenhaW").val() == '') {
        swal('', 'Por favor preencha o Perfil !', 'warning');
        return false;
    }
    if ($("#vlrPorcentagemGerencia").val() == '') {
        swal('', 'Por favor preencha a Porcentagem do Serviço !', 'warning');
        return false;
    }
    if ($("#vlrPorcentagemVenda").val() == '') {
        swal('', 'Por favor a Porcentagem da Gerencia !', 'warning');
        return false;
    }
    if ($("#vlrPorcentagemServico").val() == '') {
        swal('', 'Por favor preencha a Porcentagem da Venda !', 'warning');
        return false;
    }
    var ativo = "N";
    if ($("#indAtivo").is(":checked")) {
        ativo = 'S';
    }
    var dados = JSON.stringify({
        nmeUsuario: $("#nmeUsuario").val(),
        nroTelCelular: $("#nroTelCelular").val(),
        txtEmail: $("#txtEmail").val(),
        codPerfilW: $("#codPerfilW").val(),
        codDeposito: $("#codDeposito").val(),
        nmeUsuarioCompleto: $("#nmeUsuarioCompleto").val(),
        txtSenhaW: $("#txtSenhaW").val(),
        vlrPorcentagemGerencia: $("#vlrPorcentagemGerencia").val(),
        vlrPorcentagemVenda: $("#vlrPorcentagemVenda").val(),
        vlrPorcentagemServico: $("#vlrPorcentagemServico").val(),
        indAtivo: ativo,
    })

    if ($("#codUsuario").val() > 0) {
        dados = JSON.stringify({
            nmeUsuario: $("#nmeUsuario").val(),
            nroTelCelular: $("#nroTelCelular").val(),
            txtEmail: $("#txtEmail").val(),
            codPerfilW: $("#codPerfilW").val(),
            codDeposito: $("#codDeposito").val(),
            nmeUsuarioCompleto: $("#nmeUsuarioCompleto").val(),
            txtSenhaW: $("#txtSenhaW").val(),
            vlrPorcentagemGerencia: $("#vlrPorcentagemGerencia").val(),
            vlrPorcentagemVenda: $("#vlrPorcentagemVenda").val(),
            vlrPorcentagemServico: $("#vlrPorcentagemServico").val(),
            indAtivo: ativo,
            codUsuario: $("#codUsuario").val()
        })
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/usuario/salvar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        data: dados,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.retorno) {
                swal("", "Usuário confirmado!!!", "success");
            } else {
                swal("", "Usuário não confirmado!!!", "error");
            }
        },
        error: function (err) {
            swal("", "Usuário não confirmado!!!", "error");
        }
    });
});




function getListaPerfil() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/perfil/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            montaComboPerfil(data.objeto);
        },
        error: (err) => {
            swal("", "Despesas não confirmada!!!", "error");
        }
    });
}



function montaComboPerfil(dados) {
    var tabela = '';
    for (var i in dados) {

        tabela += '<option value="' + dados[i].codPerfilW + '">' + dados[i].dscPerfilW + ' </option>';
    }
    $("#codPerfilW").html(tabela);

}


function getListaDeposito() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/deposito/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            if (data.retorno) {
                montaComboDeposito(data.objeto);
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: (err) => {
            swal("", "Despesas não confirmada!!!", "error");
        }
    });
}

function montaComboDeposito(dados) {
    var tabela = '';
    for (var i in dados) {

        tabela += '<option value="' + dados[i].codDeposito + '">' + dados[i].dscDeposito + ' </option>';
    }
    $("#codDeposito").html(tabela);

}