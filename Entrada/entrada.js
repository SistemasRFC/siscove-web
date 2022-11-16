$(document).ready(function () {
    getListaDepositoAtivos();
    getListarAtivos();

    $("#nroSequencial").change(function () {
        if ($("#nroSequencial").val() != 0) {
            getListarEntradaEstoque($("#nroSequencial").val());
        }
    });

    $("#modalEntrada").load("modalEntradasAbertas.html");

    $("#btnNovo").click(function () {
        limparCampos();
    });

    $("#btnCancelar").click(function () {

        LimparCamposCalculo();
    });



    $("#btnTipoEntrada").click(function () {
        swal({

            title: "Carregando Lista de Entradas Abertas!",
            text: "",
            imageUrl: "../Resources/images/preload.gif",
            showConfirmButton: false
        });
        getListarEntradaAbertas();
    });

    $('.basicAutoComplete').on('autocomplete.select', function (evt, item) {
        console.log(item)
        $("#codProduto").val(item.codProduto);
        $('.basicAutoSelectSelected').html(item ? JSON.stringify(item) : 'null');
    });


    var dadosRetorno;
    $("#btnSalvar").click(function () {
        // if ($("#codFornecedor").val() == '') {
        //     swal('', 'Por favor preencha o Fornecedor !', 'warning');
        //     return false;
        // }
        // if ($("#codDeposito").val() == '') {
        //     swal('', 'Por favor preencha o Deposito !', 'warning');
        //     return false;
        // }
        // if ($("#nroNotaFiscal").val() == '') {
        //     swal('', 'Por favor preencha o Numero da Nota Fiscal !', 'warning');
        //     return false;
        // }
        var dados = JSON.stringify({
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
        })
        if ($("#nroSequencial").val() > 0) {
            dados = JSON.stringify({
                depositoDto: {
                    codDeposito: $("#codDeposito").val(),
                },
                nroNotaFiscal: $("#nroNotaFiscal").val(),
                dtaEntrada: $("#dtaEntrada").val(),
                fornecedorDto: {
                    codFornecedor: $("#codFornecedor").val(),
                },
                codUsuario: $("#codUsuario").val(),
                txtObservacao: $("#txtObservacao").val(),
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
                    $('#btnSalvar').on('click', function () {
                        $('#BtnAddProduto').prop('disabled', true);
                    }
                    );
                    if ($("#nroSequencial").val() != 0) {
                        getListarEntradaEstoque($("#nroSequencial").val());
                    }

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
            url: "http://localhost:8080/entrada/estoque/listar/" + nroSequencial,
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
            produto: {
                codProduto: $("#codProduto").val(),
            },
            nroSequencial: $("#nroSequencial").val(),

            vlrVenda: $("#vlrVenda").val(),
            vlrMinimo: $("#vlrMinimo").val(),
            vlrUnitario: $("#vlrUnitario").val(),
            qtdEntrada: $("#qtdEntrada").val(),
        })
        if ($("#codUsuario").val() > 0) {
            dados = JSON.stringify({
                produto: {
                    codProduto: $("#codProduto").val(),
                },
                nroSequencial: $("#nroSequencial").val(),
                vlrVenda: $("#vlrVenda").val(),
                vlrMinimo: $("#vlrMinimo").val(),
                vlrUnitario: $("#vlrUnitario").val(),
                qtdEntrada: $("#qtdEntrada").val(),
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
        tabela += '    </tr>';
        tabela += '</thead>';

        for (var i in dados) {
            tabela += "<tr>";
            tabela += "     <td width='10'>" + dados[i].nroSequencial + "</td>";
            if (dados[i].produto == null) {
                tabela += "     <td width='50'></td>";
            } else {
                tabela += "     <td width='30'>" + dados[i].produto.dscProduto + "</td>";
            }
            tabela += "     <td width='10'>" + dados[i].qtdEntrada + "</td>";
            tabela += "     <td width='10'>" + dados[i].vlrUnitario + "</td>";
            tabela += "     <td width='10'>" + dados[i].vlrMinimo + "</td>";
            tabela += "     <td width='10'>" + dados[i].vlrVenda + "</td>";
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
            $("#codProduto").val(0);
    }

    function limparCampos() {
        $("#codFornecedor").val(""),
            $("#btnProcurar").val(""),
            $("#codDeposito").val(""),
            $("#dtaEntrada").val(""),
            $("#txtObservacao").val(""),
            $("#nroNotaFiscal").val(""),
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
function calcular() {
    var valor2 = parseFloat($('#vlrUnitario').val());
    $('#vlrMinimo').val(1.25 * valor2);
    $('#vlrVenda').val(1.35 * valor2);

}

// $('#btnSalvar').click(function () {

//     $('#BtnAddProduto').css('display', 'block');

// });

function btnSalvar() {
    alert('btnSalvar ');
    document.getElementById('BtnAddProduto').click();
}