$(document).ready(function () {
    
    getListarClientes();
    $(".indTipoCliente").click(function(){
        if ($(this).val()=='F') {
            $(".fisica").show('fade');
            $(".jurídica").hide('fade');
        }else{
            $(".fisica").hide('fade');
            $(".jurídica").show('fade');
        }
    })
});

var dadosRetorno;

$("#btnSalvar").click(function () {

    if ($("#dscCliente").val() == '') {
        swal('', 'Por favor preencha a Descrição !', 'warning');
        return false;
    }
    if ($("#nroCep").val() == '') {
        swal('', 'Por favor preencha o Cep !', 'warning');
        return false;
    }
    if ($("#txtLogradouro").val() == '') {
        swal('', 'Por favor preencha o Logradouro !', 'warning');
        return false;
    }
    if ($("#txtEmail").val() == '') {
        swal('', 'Por favor preencha o Email !', 'warning');
        return false;
    }
    if ($("#nroIe").val() == '') {
        swal('', 'Por favor preencha o I.E !', 'warning');
        return false;
    }
    if ($("#dtaNascimento").val() == '') {
        swal('', 'Por favor preencha o Data de Nascimento !', 'warning');
        return false;
    }
    if ($("#txtLocalidade").val() == '') {
        swal('', 'Por favor preencha a Cidade !', 'warning');
        return false;
    }
    var cliente = "J";
    if ($("#indTipoCliente").is(":checked")) {
        cliente = 'F';
    }
    
    var dados = JSON.stringify({
        codMarca: $("#codMarca").val(),
        dscProduto: $("#dscProduto").val(),
        codTipoProduto: $("#codTipoProduto").val(),
        vlrProduto: $("#vlrProduto").val(),
        vlrMinimo: $("#vlrMinimo").val(),
        nroAroPneu: $("#nroAroPneu").val(),
        indSituacaoProduto: situacao,
        indComissaoGerencia: comissao,
        indAtivo: ativo,
        
    })
    if ($("#codProduto").val() > 0) {
        dados = JSON.stringify({
            dscProduto: $("#dscProduto").val(),
            codMarca: $("#codMarca").val(),
            codTipoProduto: $("#codTipoProduto").val(),
            vlrProduto: $("#vlrProduto").val(),
            vlrMinimo: $("#vlrMinimo").val(),
            indSituacaoProduto: situacao,
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
                swal("", "Produto/Serviço confirmado!!!", "success");
                getListarProdutos();
            } else {
                swal("", "Produto/Serviço não confirmado!!!", "error");
            }
        },
        error: function (err) {
            swal("", "Produto/Serviço não confirmado!!!", "error");
        }
    });

});
