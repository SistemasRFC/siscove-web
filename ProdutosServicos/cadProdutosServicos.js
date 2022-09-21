

var dadosRetorno;

$("#btnSalvar").click(function () {

    if ($("#dscProduto").val() == '') {
        swal('', 'Por favor preencha a Descrição !', 'warning');
        return false;
    }
    if ($("#codMarca").val() == '') {
        swal('', 'Por favor preencha a Marca !', 'warning');
        return false;
    }
    if ($("#codTipoProduto").val() == '') {
        swal('', 'Por favor preencha o Tipo !', 'warning');
        return false;
    }
    if ($("#indSituacaoProduto").val() == '') {
        swal('', 'Por favor preencha o Perfil !', 'warning');
        return false;
    }
    if ($("#vlrProduto").val() == '') {
        swal('', 'Por favor preencha o Deposito !', 'warning');
        return false;
    }
    if ($("#vlrMinimo").val() == '') {
        swal('', 'Por favor preencha o Nome Usuario Completo !', 'warning');
        return false;
    }
    if ($("#nroAroPneu").val() == '') {
        swal('', 'Por favor preencha o Nro do Aro !', 'warning');
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
    var comissao = "N";
    if ($("#indComissaoGerencia").is(":checked")) {
        comissao = 'S';
    }
    var ativo = "N";
    if ($("#indAtivo").is(":checked")) {
        ativo = 'S';
    }
    var dados = JSON.stringify({
        dscProduto: $("#dscProduto").val(),
        codMarca: $("#codMarca").val(),
        codTipoProduto: $("#codTipoProduto").val(),            
        indSituacaoProduto: $("#indSituacaoProduto").val(),
        vlrProduto: $("#vlrProduto").val(),
        vlrMinimo: $("#vlrMinimo").val(),
        nroAroPneu: $("#nroAroPneu").val(),
        indComissaoGerencia: comissao, 
        indAtivo: ativo,
    })
    if ($("#codProduto").val() > 0) {
        dados = JSON.stringify({
            dscProduto: $("#dscProduto").val(),
            codMarca: $("#codMarca").val(),
            codTipoProduto: $("#codTipoProduto").val(),
            indSituacaoProduto: $("#indSituacaoProduto").val(),
            vlrProduto: $("#vlrProduto").val(),
            vlrMinimo: $("#vlrMinimo").val(),
            nroAroPneu: $("#nroAroPneu").val(),
            indComissaoGerencia: comissao,
            indAtivo: ativo,
            codProduto: $("#codProduto").val()
        })
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/produtos/salvar",
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