$(document).ready(function () {
    getListaDeposito();
    getListarAtivos();
    getListarEntrada();

    $("#btnNovo").click(function () {
        limparCampos();
    })
    
    $('.advancedAutoComplete').autoComplete({
        resolver: 'custom',
        events: {
            search: function (qry, callback) {
                // let's do a custom ajax call
                $.ajax(
                    
                    {
                        type: "POST",
                        url: "http://localhost:8080/entrada/produto",
                        
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
                        },
                    }
                ).done(function (res) {
                    callback(res.results)
                });
            }
        }
    });
});

var dadosRetorno;

function getListarEntrada() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/entrada/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Entrada não confirmado!!!", "error");
        }
    });
}
function montaTabela() {
    var dados = dadosRetorno;
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaProduto">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <td width="25%">Fornecedor </td>';
    tabela += '        <td width="25%">Deposito </td>';
    tabela += '    </tr>';
    tabela += '</thead>';
    tabela += '<tbody id="corpoTabela">';

    for (var i in dados) {
        tabela += "<tr>";
        tabela += "     <td width='70'>" + dados[i].codFornecedor + "</td>";
        tabela += "     <td width='70'>" + dados[i].codDeposito + "</td>";
        tabela += "    </a>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#tabelaProdutos").html(tabela);
    $("#tabelaProduto").DataTable();
}



function limparCampos() {
    $("#codFornecedor").val(""),
        $("#btnProcurar").val(""),
        $("#codDeposito").val(""),
        $("#dtaEntrada").val(""),
        $("#txtObervacao").val(""),
        $("#codProduto").val(0);
}

function  getListarAtivos() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/fornecedor/listar/ativos",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },

        success: function (data) {
            if (data.retorno) {
                montaComboFornecedorAtivo(data.objeto);
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: (err) => {
            swal("", "Fornecedor  não confirmada!!!", "error");
        }
    });
}

function montaComboFornecedorAtivo(dados) {
    var tabela = '';
    tabela += '<option value="">Selecione </option>';
    for (var i in dados) {
        tabela += '<option value="' + dados[i].codFornecedor + '">' + dados[i].dscFornecedor + ' </option>';
    }
    $("#codFornecedor").html(tabela);
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
            swal("", "Deposito não confirmado!!!", "error");
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

