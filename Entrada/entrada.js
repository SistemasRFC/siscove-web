$(document).ready(function () {
    getListaDepositoAtivos();
    getListarAtivos();
    getListarEntradaEstoque();

    $("#btnNovo").click(function () {

        limparCampos();
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


function getListarEntradaEstoque() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/entrada/estoque/listar",
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
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaEntrada">';
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
        tabela += "     <td width='50'>" + dados[i].nroSequencial + "</td>";
        if(dados[i].produto==null){
            tabela += "     <td width='50'></td>";
        }else{
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
    $("#tabelaEntrada").DataTable();
}



function limparCampos() {
    $("#dscProduto").val(""),
        $("#vlrVenda").val(""),
        $("#vlrUnitario").val(""),
        $("#qtdEntrada").val(""),
        $("#codFornecedor").val(""),
        $("#btnProcurar").val(""),
        $("#codDeposito").val(""),
        $("#dtaEntrada").val(""),
        $("#txtObervacao").val(""),
        $("#nroNotaFiscal").val(""),
        $("#vlrProduto").val(""),
        $("#vlrMinimo").val(""),
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
    var valor1 = parseInt(document.getElementById('vlrProduto').value,);
    var valor2 = parseInt(document.getElementById('vlrMinimo').value,);
    document.getElementById('vlrTotal').value = valor1 % valor2;
}