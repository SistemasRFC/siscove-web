$(document).ready(function () {
    getListaPerfil();

    $("#btnSalvar").click(function () {

        if ($("#nmeUsuario").val() == '') {
            swal('', 'Por favor preencha o Nome Usuario Completo !', 'warning');
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
        if ($("#codPerfil").val() == '') {
            swal('', 'Por favor preencha o Perfil !', 'warning');
            return false;
        }
        if ($("#codDeposito").val() == '') {
            swal('', 'Por favor preencha o Deposito !', 'warning');
            return false;
        }
        if ($("#nmeUsuarioCompleto").val() == '') {
            swal('', 'Por favor preencha o Login !', 'warning');
            return false;
        }
        if ($("#txtSenhaW").val() == '') {
            swal('', 'Por favor preencha o Senha !', 'warning');
            return false;
        }
        if ($("#codPerfil").val() == '') {
            swal('', 'Por favor preencha o Perfil !', 'warning');
            return false;
        }
        if ($("#vlrPorcentagemServico").val() == '') {
            swal('', 'Por favor preencha a Porcentagem do Serviço !', 'warning');
            return false;
        }
        if ($("#vlrPorcentagemGerencia").val() == '') {
            swal('', 'Por favor a Porcentagem da Gerencia !', 'warning');
            return false;
        }
        if ($("#vlrPorcentagemVenda").val() == '') {
            swal('', 'Por favor preencha a Porcentagem da Venda !', 'warning');
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/usuario/salvar",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
            },
            data: JSON.stringify({
                nmeUsuario: $("#nmeUsuario").val(),
                nroTelCelular: $("#nroTelCelular").val(),
                txtEmail: $("#txtEmail").val(),
                codDeposito: $("#codDeposito").val(),
                nmeUsuarioCompleto: $("#nmeUsuarioCompleto").val(),
                codPerfilW: $("#codPerfil").val(),
                txtSenhaW: $("#txtSenhaW").val(),
                vlrPorcentagemGerencia: $("#vlrPorcentagemGerencia").val(),
                vlrPorcentagemVenda: $("#vlrPorcentagemVenda").val(),
                vlrPorcentagemServico: $("#vlrPorcentagemServico").val(),
                indAtivo: ativo
            }),
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
})


function getListaPerfil() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/perfil/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            montaComboTipoDespesa(data.objeto);
        },
        error: (err) => {
            swal("", "Despesas não confirmada!!!", "error");
        }
    });
}



function montaComboTipoDespesa(dados) {
    var tabela = '';
    for (var i in dados) {

        tabela += '<option value="' + dados[i].codPerfilW + '">' + dados[i].dscPerfilW + ' </option>';
    }
    $("#codPerfilW").html(tabela);

}
