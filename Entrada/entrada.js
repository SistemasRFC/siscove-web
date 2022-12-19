
var dadosRetorno;
$(document).ready(function () {
    $("#modalEntradasAbertas").load("modalEntradasAbertas.html");
    $("#modalEntradasFechadas").load("modalEntradasFechadas.html");
    getListaDepositoAtivos();
    getListarFornecedorAtivos("codFornecedor");
    getListarFornecedorAtivos("codFornecedorModalFechada");

    $("#botaoAdicionarProduto").prop('disabled', true);

    $("#nroSequencial").change(function () {
        if ($("#nroSequencial").val() > 0) {
            $("#botaoAdicionarProduto").prop('disabled', false);

            getListaEntradaEstoqueByNroSequencial($("#nroSequencial").val());
        } else {
            $("#botaoAdicionarProduto").prop('disabled', true);
            montaTabela(null);
        }
    });
    $("#btnNovo").click(function () {
        limparCampos();
    });
    $("#btnCancelar").click(function () {
        LimparCamposCalculo();
    });

    $("#btnEntradasAbertas").click(function () {
        swal({

            title: "Carregando Lista de Entradas Abertas!",
            text: "",
            imageUrl: "../Resources/images/preload.gif",
            showConfirmButton: false
        });
        getListarEntradaAbertas();
    });
    $("#btnEntradasFechadas").click(function () {

        $("#entradaModalFechada").modal("show");
    });
    $('.basicAutoComplete').on('autocomplete.select', function (evt, item) {
        console.log(item)
        $("#codProduto").val(item.codProduto);
        $('.basicAutoSelectSelected').html(item ? JSON.stringify(item) : 'null');
    });
    $("#btnSalvar").click(function () {
        salvarEntrada();
    });

    $("#btnFecharEntrada").click(function () {
        $("#indEntrada").val('F');
        salvarEntrada();
    });

    $("#btnAdicionar").click(function () {
        if ($("#codProduto").val() == '') {
            swal('', 'Por favor preencha o Produto !', 'warning');
            return false;
        }
        if ($("#vlrUnitario").val() == '') {
            swal('', 'Por favor preencha o Valor Unitario !', 'warning');
            return false;
        }
        var dados = JSON.stringify({
            ProdutoDto: {
                codProduto: $("#codProduto").val(),
            },
            nroSequencial: $("#nroSequencial").val(),
            vlrVenda: $("#vlrVenda").val(),
            vlrMinimo: $("#vlrMinimo").val(),
            vlrUnitario: $("#vlrUnitario").val(),
            vlrTotal: $("#vlrTotal").val(),
            qtdEntrada: $("#qtdEntrada").val(),
            codUsuario: $("#codUsuario").val()
        })
        if ($("#codProduto").val() > 0) {
            dados = JSON.stringify({
                produto: {
                    codProduto: $("#codProduto").val(),
                },
                VlrVenda: $("#VlrVenda").val(),
                vlrMinimo: $("#vlrMinimo").val(),
                vlrUnitario: $("#vlrUnitario").val(),
                qtdEntrada: $("#qtdEntrada").val(),
                codUsuario: $("#codUsuario").val(),
                nroSequencial: $("#nroSequencial").val()
            })
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/entrada/estoque/adicionar/produto",
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
                    adicionarProduto();
                } else {
                    swal("", "Produto não salvo!!!", "error");
                }
            },
            error: function (err) {
                swal("", "Erro ao salvar Produto!!!", "error");
            }
        });
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

function getListaEntradaEstoqueByNroSequencial(nroSequencial) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/entrada/estoque/listar/" + nroSequencial,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela();
        },
        error: (err) => {
            swal("", "Não confirmado!!!", "error");
        }
    });
}

function montaTabela() {
    var dados = dadosRetorno;
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaEntradas">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <th >Codigo </th>';
    tabela += '        <th >Produto </th>';
    tabela += '        <th >Quantidade </th>';
    tabela += '        <th >Valor Custo </th>';
    tabela += '        <th >Valor Mínimo </th>';
    tabela += '        <th >Valor Venda </th>';
    tabela += '        <th >Editar </th>';
    tabela += '    </tr>';
    tabela += '</thead>';

    for (var i in dados) {
        tabela += "<tr class='remove' id='" + i + "'>";
        tabela += "     <td>" + dados[i].nroSequencial + "</td>";
        if (dados[i].produto == null) {
            tabela += "     <td></td>";
        } else {
            tabela += "     <td>" + dados[i].produto.dscProduto + "</td>";
        }
        tabela += "     <td>" + dados[i].qtdEntrada + "</td>";
        tabela += "     <td>" + dados[i].vlrUnitario + "</td>";
        tabela += "     <td>" + dados[i].vlrMinimo + "</td>";
        tabela += "     <td>" + dados[i].vlrVenda + "</td>";
        tabela += "     <td style='text-align:center;'>";
        tabela += "         <a href='javascript:removerProduto(" + i + ")'>";
        tabela += "             <i class='fa  fa-trash'></i>";
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
        $("#vlrVenda").val(""),
        $("#vlrUnitario").val(""),
        $("#qtdEntrada").val(""),
        $("#vlrProduto").val(""),
        $("#vlrMinimo").val(""),
        $("#vlrTotal").val(""),
        $("codFornecedorModalFechada").val("");
    $("#codProduto").val(0);
}

function limparCampos() {
    $("#codFornecedor").val("");
    $("#codDeposito").val("");
    $("#btnProcurar").val("");
    $("#dtaEntrada").val("");
    $("#txtObservacao").val("");
    $("#nroNotaFiscal").val("");
    $("#nroSequencial").val("");
    $("#nroSequencial").change();
    $("#codProduto").val(0);
    $("#nroSequencial").val(0);
    $("#codFornecedorModalFechada").val("");
    $("#tabelaProdutos").html("");
    $("#tabelaEntradaFechada").html("");

}

function getListarFornecedorAtivos(nomeCombo) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/fornecedor/listar/ativos",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            montaComboFornecedor(data.objeto, nomeCombo);
        },
        error: (err) => {
            swal("", "Fornecedor não confirmado!!!", "error");
        }
    });
}

function montaComboFornecedor(dados, nomeCombo) {
    var tabela = '';
    tabela += '<option value="">Selecione </option>';
    for (var i in dados) {
        tabela += '<option value="' + dados[i].codFornecedor + '">' + dados[i].dscFornecedor + ' </option>';
    }
    $("#" + nomeCombo).html(tabela);
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
    tabela += '<option value="">Selecione </option>';
    for (var i in dados) {
        tabela += '<option value="' + dados[i].codDeposito + '">' + dados[i].dscDeposito + ' </option>';
    }
    $("#codDeposito").html(tabela);
}

function salvarEntrada() {
    if ($("#codFornecedor").val() == '') {
        swal('', 'Por favor preencha o Fornecedor !', 'warning');
        return false;
    }
    if ($("#codDeposito").val() == '') {
        swal('', 'Por favor preencha o Deposito !', 'warning');
        return false;
    }
    if ($("#nroNotaFiscal").val() == '') {
        swal('', 'Por favor preencha o Numero da Nota Fiscal !', 'warning');
        return false;
    }

    var dados = {
        fornecedorDto: {
            codFornecedor: $("#codFornecedor").val(),
        },
        depositoDto: {
            codDeposito: $("#codDeposito").val(),
        },
        nroNotaFiscal: $("#nroNotaFiscal").val(),
        dtaEntrada: $("#dtaEntrada").val(),
        txtObservacao: $("#txtObservacao").val(),
        codUsuario: $("#codUsuario").val(),
        codClienteFinal: $("#codClienteFinal").val(),
        indEntrada: $("#indEntrada").val(),
        vlrTotal: $("#vlrTotal").val()
    }
    if ($("#nroSequencial").val() > 0) {
        dados.nroSequencial = $("#nroSequencial").val();
    }
    dados = JSON.stringify(dados);
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
            if ($("#indEntrada").val() == 'A') {
                swal({
                    title: "",
                    text: "Dados da Entrada Salvos!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                swal({
                    title: "",
                    text: "Entrada Fechada!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        },
        error: function (err) {
            swal("", "Erro ao salvar Entrada!!!", "error");
        }
    });
}

function calcular() {
    var valor2 = parseFloat($('#vlrUnitario').val());
    $('#vlrMinimo').val(1.25 * valor2);
    $('#vlrVenda').val(1.35 * valor2);
}

function preencherCampos(index) {
    var dados = dadosRetorno[index];

    $("#indEntrada").val(dados.indEntrada);
    $("#codDeposito").val(dados.codDeposito);
    $("#codFornecedor").val(dados.codFornecedor);
    $("#dtaEntradaFormatada").val(dados.dtaEntrada);
    $("#dtaEntrada").val(dados.dtaEntrada.substring(0, 10));
    $("#txtObservacao").val(dados.txtObservacao);
    $("#nroNotaFiscal").val(dados.nroNotaFiscal);
    $("#codUsuario").val(dados.codUsuario);
    $("#codClienteFinal").val(dados.codClienteFinal);
    $("#nroSequencial").val(dados.nroSequencial);
    $("#nroSequencial").change();
    $("#entradaModalFechada").modal("hide");
    $("#entradaModalAberta").modal("hide");
}

function removerProduto(indece) {
    var nroSequencial = dadosRetorno[indece].nroSequencial;
    var produto = dadosRetorno[indece].produto;

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/entrada/estoque/remover/" + nroSequencial + "/" + produto.codProduto,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        // data: dados,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.retorno) {
                dadosRetorno = data.objeto;
                montaTabela();
                swal("", "Produto Removido com sucesso!", "success");

            } else {
                swal("", data.mensage, "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao Deletar o Produto!", "error");
        }
    });
}
