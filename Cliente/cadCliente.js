$(document).ready(function () {
    getListaMarca();
    getListaTipoProduto();
    $(".indTipoCliente").click(function(){
        if ($(this).val()=='P') {
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
        swal('', 'Por favor preencha a Situação !', 'warning');
        return false;
    }
    if ($("#vlrProduto").val() == '') {
        swal('', 'Por favor preencha o Valor do Produto !', 'warning');
        return false;
    }
    if ($("#vlrMinimo").val() == '') {
        swal('', 'Por favor preencha o Valor Minimo !', 'warning');
        return false;
    }
    if ($("#nroAroPneu").val() == '') {
        swal('', 'Por favor preencha o Nro do Aro !', 'warning');
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
    var tipo = "P";
    if ($("#indTipoRegistroS").is(":checked")) {
        tipo = 'S';
    }
    var situacao = "N";
    if($("#indSituacaoProduto").is(":checked")){
        situacao = "S";
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

function getListaMarca() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/marca/listar/ativos",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        
        success: function (data) {
            if (data.retorno) {
                montaComboMarca(data.objeto);
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: (err) => {
            swal("", "Marca não confirmada!!!", "error");
        }
    });
}

function montaComboMarca(dados) {
    var tabela = '';
    tabela += '<option value="">Selecione </option>';
    for (var i in dados) {
        tabela += '<option value="' + dados[i].codMarca + '">' + dados[i].dscMarca + ' </option>';
    }
    $("#codMarca").html(tabela);
}  

function getListaTipoProduto() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/tipo/produto/listar/ativos",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        
        success: function (data) {
            if (data.retorno) {
                montaComboTipoProduto(data.objeto);
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: (err) => {
            swal("", "Tipo Produto não confirmada!!!", "error");
        }
    });
}

function montaComboTipoProduto(dados) {
    var tabela = '';
    tabela += '<option value="">Selecione </option>';
    for (var i in dados) {
        tabela  += '<option value="' + dados[i].codTipoProduto + '">' + dados[i].dscTipoProduto + ' </option>';
    }
    $("#codTipoProduto").html(tabela);
}