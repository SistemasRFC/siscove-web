$(document).ready(function () {
    $("#modalEntradasAbertas").load("modalEntradasAbertas.html");
    $("#modalEntradasFechadas").load("modalEntradasFechadas.html");
    getListaDepositoAtivos();
    getListarFornecedorAtivos("codFornecedor");
    getListarFornecedorAtivos("codFornecedorModalFechada");

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

    $("#btnSalvar").click(function () {
        salvarEntrada();
    });
    
    $("#btnFecharEntrada").click(function () {
        $("#indEntrada").val('F');
        salvarEntrada();
    });

    $("#btnNovo").click(function () {
        limparCamposEntrada();
    });

    $("#botaoAdicionarProduto").prop('disabled', true);

    
    $("#indEntrada").change(function () {
        if ($("#indEntrada").val() == "F") {
            $(".bloquear").attr('disabled', true);
        } else {
            $(".bloquear").attr('disabled', false);
        }
    });

    $("#nroSequencial").change(function () {
        if ($("#nroSequencial").val() > 0) {
            $("#botaoAdicionarProduto").prop('disabled', false);
        } else {
            $("#botaoAdicionarProduto").prop('disabled', true);
            montaTabela(null);
        }
    });

    /*
    * Código para implementar a rotina do autoComplete do produto
    */
    $('.autoCompleteProduto').on('autocomplete.select', function (evt, item) {
        console.log(item)
        $("#codProduto").val(item.codProduto);
        $('.basicAutoSelectSelected').html(item ? JSON.stringify(item) : 'null');
    });

    $(".autoCompleteProduto").autoComplete({
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

    $(".precisaCalcular").blur(function(){
        if (($("#vlrUnitario").val()!='' && $("#vlrUnitario").val()!=null)){
            calcular();
        }
    })

    $("#btnAdicionar").click(function () {
        salvarProduto();
    });
});

function recuperaDados(nroSequencial){
    recuperaDadosEntrada(nroSequencial);
    recuperaDadosProdutosEntrada(nroSequencial);
}

function recuperaDadosEntrada(nroSequencial){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/entrada/" + nroSequencial,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.retorno) {
                preencherCampos(data.objeto);
            } else {
                swal("", data.mensage, "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao Deletar o Produto!", "error");
        }
    });
}

function recuperaDadosProdutosEntrada(nroSequencial) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/entrada/estoque/listar/" + nroSequencial,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            montaTabelaProdutosEntrada(data.objeto);
        },
        error: (err) => {
            swal("", "Não confirmado!!!", "error");
        }
    });
}

function montaTabelaProdutosEntrada(dados) {
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
        tabela += "     <td>" + dados[i].dscProduto + "</td>";
        tabela += "     <td>" + dados[i].qtdEntrada + "</td>";
        tabela += "     <td>" + dados[i].vlrUnitario + "</td>";
        tabela += "     <td>" + dados[i].vlrMinimo + "</td>";
        tabela += "     <td>" + dados[i].vlrVenda + "</td>";
        if($("#indEntrada").val()== "F"){
            tabela += "     <td style='text-align:center;'>";
            tabela += "         <a href='javascript:removerProduto(" + dados[i].nroSequencial + ","+dados[i].codProduto+")' >";
            tabela += "             <i class='fa  fa-trash'></i>";
            tabela += "</td>";
        }else{     
            tabela += "     <td></td>";
        }
        tabela += "</tr>";

    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#tabelaProdutos").html(tabela);
    $("#tabelaEntradas").DataTable();
}

function preencherCampos(dados) {
    $("#indEntrada").val(dados.indEntrada);
    $("#codDeposito").val(dados.codDeposito);
    $("#codFornecedor").val(dados.codFornecedor);
    $("#codProduto").val(dados.codProduto);
    $("#dtaEntradaFormatada").val(dados.dtaEntrada);
    $("#dtaEntrada").val(dados.dtaEntrada.substring(0, 10));
    $("#txtObservacao").val(dados.txtObservacao);
    $("#nroNotaFiscal").val(dados.nroNotaFiscal);
    $("#codUsuario").val(dados.codUsuario);
    $("#codClienteFinal").val(dados.codClienteFinal);
    $("#nroSequencial").val(dados.nroSequencial);
    $("#nroSequencial").change();
    $("#indEntrada").change();
    $("#entradaModalFechada").modal("hide");
    $("#entradaModalAberta").modal("hide");
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
        codFornecedor: $("#codFornecedor").val(),
        codDeposito: $("#codDeposito").val(),
        nroNotaFiscal: $("#nroNotaFiscal").val(),
        dtaEntrada: $("#dtaEntrada").val(),
        txtObservacao: $("#txtObservacao").val(),
        codUsuario: $("#codUsuario").val(),
        codClienteFinal: $("#codClienteFinal").val(),
        indEntrada: $("#indEntrada").val(),
        vlrVenda: $("#vlrVenda").val(),
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

function limparCamposEntrada() {
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

function calcular() {
    var valor2 = parseFloat($('#vlrUnitario').val());
    $('#vlrMinimo').val(1.25 * valor2);
    $('#vlrVenda').val(1.35 * valor2);
}

function salvarProduto(){
    if ($("#codProduto").val() == '') {
        swal('', 'Por favor preencha o Produto !', 'warning');
        return false;
    }
    if ($("#vlrUnitario").val() == '') {
        swal('', 'Por favor preencha o Valor Unitario !', 'warning');
        return false;
    }
    dados = {
        codProduto: $("#codProduto").val(),
        nroSequencial: $("#nroSequencial").val(),
        vlrVenda: $("#vlrVenda").val(),
        vlrMinimo: $("#vlrMinimo").val(),
        vlrUnitario: $("#vlrUnitario").val(),
        qtdEntrada: $("#qtdEntrada").val(),
        codUsuario: $("#codUsuario").val()
    }

    if ($("#codProduto").val() > 0) {
        dados.nroSequencial= $("#nroSequencial").val();
    }

    var dados = JSON.stringify(dados);
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
                recuperaDadosProdutosEntrada($("#nroSequencial").val());
                limparCamposAdicionarProduto();
            } else {
                swal("", "Produto não salvo!!!", "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao salvar Produto!!!", "error");
        }
    });
}

function limparCamposAdicionarProduto() {
    $("#dscProduto").val("");
    $("#vlrVenda").val("");
    $("#vlrUnitario").val("");
    $("#qtdEntrada").val("");
    $("#vlrProduto").val("");
    $("#vlrMinimo").val("");
    $("#codProduto").val(0);
}

function removerProduto(nroSequencial,codProduto) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/entrada/estoque/remover/" + nroSequencial + "/" + codProduto,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.retorno) {
                swal("", "Produto Removido com sucesso!", "success");
                recuperaDadosProdutosEntrada(nroSequencial)
            } else {
                swal("", data.mensage, "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao Deletar o Produto!", "error");
        }
    });
}