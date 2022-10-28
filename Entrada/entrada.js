$(document).ready(function () {
    getListaDepositoAtivos();
    getListarAtivos();


    $("#nroSequencial").change(function () {
        if ($("#nroSequencial").val() != 0) {
            getListarEntradaEstoque($("#nroSequencial").val());
        }
    });
    $("#modalEntrada").load("cadEntrada.html")

    $("#indTipoEntrada").click(function () { 
        $("#entradaModal").modal("show");
    })

    $("#btnNovo").click(function () {

        limparCampos();
    })
    $("#btnCancelar").click(function () {

        LimparCamposCalculo();
    })

    $('.basicAutoComplete').on('autocomplete.select', function (evt, item) {
        console.log(item)
        $("#codProduto").val(item.codProduto);
        $('.basicAutoSelectSelected').html(item ? JSON.stringify(item) : 'null');
    });

    $(".basicAutoComplete").autoComplete({
        resolver: 'custom',
        formatResult: function (item) {
            return {
                value: item.codProduto,
                text: item.dscProduto,
            };
        },
        events: {
            search: function (qry, callback) {
                $.ajax(

                    {
                        type: "GET",
                        url: "http://localhost:8080/produtos/listar/byTermo/" + qry,

                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
                        },
                        data: qry
                    }
                ).done(function (res) {
                    callback(res)
                });
            }
        }
    });
});

var dadosRetorno;

$("#btnSalvar").click(function () {
    if ($("#codFornecedor").val() == '') {
        swal('', 'Por favor preencha o Fornecedor !', 'warning');
        return false;
    }
    if ($("#codDeposito").val() == '') {
        swal('', 'Por favor preencha a Quantidade !', 'warning');
        return false;
    }
    if ($("#nroNotaFiscal").val() == '') {
        swal('', 'Por favor preencha o Numero da Nota Fiscal !', 'warning');
        return false;
    }
    if ($("#dtaEntrada").val() == '') {
        swal('', 'Por favor preencha o Valor Minimo !', 'warning');
        return false;
    }

    var dados = JSON.stringify({
        codFornecedor: $("#codFornecedor").val(),
        codDeposito: $("#codDeposito").val(),
        nroNotaFiscal: $("#nroNotaFiscal").val(),
        dtaEntrada: $("#dtaEntrada").val(),
        indTipoEntrada: entrada,
    })

    if ($("#codFornecedor").val() > 0) {
        dados = JSON.stringify({
            codDeposito: $("#codDeposito").val(),
            nroNotaFiscal: $("#nroNotaFiscal").val(),
            dtaEntrada: $("#dtaEntrada").val(),
            codFornecedor: $("#codFornecedor").val(),
            indTipoEntrada: entrada,
        })
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/entrada/salvar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        data: dados,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.retorno) {
                swal({
                    title: "",
                    text: "Produto salvo!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                salvarEntrada();
            } else {
                swal("", "Produto não salvo!!!", "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao salvar Produto!!!", "error");
        }
    });
});


function getListarEntradaEstoque(nroSequencial) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/entrada/estoque/listar/" +nroSequencial,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", " não confirmado!!!", "error");
        }
    });
}

function montaTabela() {
    var dados = dadosRetorno;
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaEntradas">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <td width="50%">Codigo </td>';
    tabela += '        <td width="50%">Produto </td>';
    tabela += '        <td width="50%">Quantidade </td>';
    tabela += '        <td width="50%">Valor Custo </td>';
    tabela += '        <td width="50%">Valor Mínimo </td>';
    tabela += '        <td width="50%">Valor Venda </td>';
    tabela += '    </tr>';
    tabela += '</thead>';
    tabela += '<tbody id="corpoTabela">';

    for (var i in dados) {
        tabela += "<tr>";
        tabela += "     <td width='50'>" + dados[i].codProduto + "</td>";
        if (dados[i].produto == null) {
            tabela += "     <td width='50'></td>";
        } else {
            tabela += "     <td width='50'>" + dados[i].produto.dscProduto + "</td>";
        }
        tabela += "     <td width='50'>" + dados[i].qtdEntrada + "</td>";
        tabela += "     <td width='50'>" + dados[i].vlrUnitario + "</td>";
        tabela += "     <td width='50'>" + dados[i].vlrMinimo + "</td>";
        tabela += "     <td width='50'>" + dados[i].vlrVenda + "</td>";
        tabela += "    </a>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#tabelaProdutos").html(tabela);
    $("#tabelaEntradas").DataTable();
}

function LimparCamposCalculo() {
    $("#dscProduto").val(""),
        $("#vlrUnitario").val(""),
        $("#qtdEntrada").val(""),
        $("#vlrProduto").val(""),
        $("#vlrMinimo").val(""),
        $("#codProduto").val(0);
}

function limparCampos() {
    $("#vlrVenda").val(""),
        $("#codFornecedor").val(""),
        $("#btnProcurar").val(""),
        $("#codDeposito").val(""),
        $("#dtaEntrada").val(""),
        $("#txtObervacao").val(""),
        $("#nroNotaFiscal").val(""),
        $("#indTipoEntradaF").prop("checked", false),
        $("#indTipoEntradaA").prop("checked", false),
        $("#codProduto").val(0);
}

function getListarAtivos() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/fornecedor/listar/ativos",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaComboFornecedor(data.objeto);
        },
        error: (err) => {
            swal("", "Fornecedor não confirmado!!!", "error");
        }
    });
}

function montaComboFornecedor(dados) {
    var tabela = '';
    tabela += '<option value="">Selecione </option>';
    for (var i in dados) {
        tabela += '<option value="' + dados[i].codFornecedor + '">' + dados[i].dscFornecedor + ' </option>';
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
                montaComboDeposito(data.objeto);
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: (err) => {
            swal("", "Deposito não confirmado!!!", "error");
        }
    });
}
function montaComboDeposito(dados) {
    var tabela = '';
    for (var i in dados) {
        tabela += '<option value="">Selecione </option>';
        tabela += '<option value="' + dados[i].codDeposito + '">' + dados[i].dscDeposito + ' </option>';
    }
    $("#codDeposito").html(tabela);

}

function calcular() {
    var valor2 = parseFloat($('#vlrUnitario').val());
    $('#vlrMinimo').val(1.25 * valor2);
    $('#vlrVenda').val(1.35 * valor2);

}