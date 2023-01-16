var dadosRetornoProdutos;

$(function () {
    $("#codVenda").change(function () {
        if ($("#codVenda").val() > 0) {
            $("#btnAdicionais").prop('disabled', false);
            getListaProdutosVenda();
        } else {
            $("#btnAdicionais").prop('disabled', true);
            montaTabelaProdutos(null);
        }
    });

    $("#btnVendasAbertas").click(function () {
        getListaVendasAbertas();
        swal({
    
            title: "Carregando Lista de Vendas Abertas!",
            text: "",
            imageUrl: "../Resources/images/preload.gif",
            showConfirmButton: false
        });
    
    });

    function getListaVendasAbertas() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/venda/listar/abertas",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
            },
        });
    }

    $("#btnNovoCliente").click(function() {
        adicionarNovoCliente();
    })

    $("#btnNovoVeiculo").click(function() {
        adicionarNovoVeiculo();
    })

    $("#btnNovoProduto").click(function() {
        adicionarNovoProduto();
    })

    $("#btnSalvar").click(function () {
        salvarVenda();
    });

    $("#btnAdicionais").click(function () {
        $("#divCodVenda").show('fade');
    });

    $("#btnCancelar").click(function () {
        $("#divCodVenda").hide('fade');
        limparCamposProduto();
    });

    $("#btnAdicionar").click(function () {
        adicionarProduto();

    })
    
});

function salvarVenda() {
    if ($("#codCliente").val() == '') {
        swal('', 'Por favor informe o cliente.', 'warning');
        return false;
    }

    if ($("#codVendedor").val() == '') {
        swal('', 'Por favor informe o vendedor.', 'warning');
        return false;
    }

    var vlrImpostoP = $("#vlrImpostoProduto").val().replace(',', '.');
    var vlrImpostoS = $("#vlrImpostoServico").val().replace(',', '.');

    var dados = JSON.stringify({
        nroStatusVenda: $("#nroStatusVenda").val(),
        codCliente: $("#codCliente").val(),
        codVendedor: $("#codVendedor").val(),
        nroPlaca: $("#nroPlaca").val(),
        codVeiculo: $("#codVeiculo").val(),
        txtObservacao: $("#txtObservacao").val(),
        vlrKmRodado: $("#vlrKmRodado").val(),
        vlrImpostoProduto: parseFloat(vlrImpostoP),
        vlrImpostoServico: parseFloat(vlrImpostoS),
    })

    if ($("#codVenda").val() > 0) {
        dados = JSON.stringify({
            codVenda: $("#codVenda").val(),
            nroStatusVenda: $("#nroStatusVenda").val(),
            codCliente: $("#codCliente").val(),
            codVendedor: $("#codVendedor").val(),
            nroPlaca: $("#nroPlaca").val(),
            codVeiculo: $("#codVeiculo").val(),
            txtObservacao: $("#txtObservacao").val(),
            vlrKmRodado: $("#vlrKmRodado").val(),
            vlrImpostoProduto: parseFloat(vlrImpostoP),
            vlrImpostoServico: parseFloat(vlrImpostoS),
        })
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/venda/salvar",
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
                    text: "Venda salva!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                swal("", "Venda não pôde ser salva!", "error");
            }
        },
        error: function (err) {
            swal("", "Não foi possível salvar a venda!", "error");
        }
    });
}


function adicionarProduto() {
    var dados = JSON.stringify({
        codVenda: $("#codVenda").val(),
        codProduto: $("#codProduto").val(),
        dscProduto: $("#dscProduto").val(),
        qtdVendida: $("#qtdVendida").val(),
        nroSequencial: $("#nroSequencial").val(),
        vlrVenda: $("#vlrVenda").val(),
        vlrDesconto: $("#vlrDesconto").val(),
        codFuncionario: $("#codFuncionario").val(),
        txtObservacao: $("#txtObservacaoProd").val(),
    });
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/venda/produto/salvar",
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
                    text: "Produto adicionado!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                getListaProdutosVenda();
            } else {
                swal("", data.mensagem, "error");
            }
        },  
        error: function (err) {
            swal("", "Não foi possível adicionar o produto!", "error");
        }
    });
}



function criarCampoCliente() {
    $('.clienteAutoComplete').on('autocomplete.select', function (evt, item) {
        $("#codCliente").val(item.codCliente);
        $("#nroDoc").val(item.nroCpf);
        $("#nroCelular").html(item.nroTelefoneCelular);
        $("#nroTelefone").html(item.nroTelefoneContato);
        $("#txtEndereco").html(item.txtLogradouro);
    });

    $(".clienteAutoComplete").autoComplete({
        resolver: 'custom',
        formatResult: function (item) {
            return {
                value: item.codCliente,
                text: item.dscCliente,
            };
        },
        events: {
            search: function (qry, callback) {
                $.ajax(
                    {
                        type: "GET",
                        url: "http://localhost:8080/cliente/listar/byTermo/" + qry,
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
}

function criarCampoCpfCnpj() {
    $('.cpfCnpjAutoComplete').on('autocomplete.select', function (evt, item) {
        $("#codCliente").val(item.codCliente);
        $("#dscCliente").val(item.dscCliente);
        $("#nroDoc").val(item.nroCpf ? item.nroCpf : item.nroCnpj);
        $("#nroCelular").html(item.nroTelefoneCelular);
        $("#nroTelefone").html(item.nroTelefoneContato);
        $("#txtEndereco").html(item.txtLogradouro);
    });

    $(".cpfCnpjAutoComplete").autoComplete({
        resolver: 'custom',
        formatResult: function (item) {
            return {
                value: item.codCliente,
                label: item.dscCliente,
                text: item.nroCpf ? item.nroCpf : item.nroCnpj,
            };
        },
        events: {
            search: function (qry, callback) {
                $.ajax(
                    {
                        type: "GET",
                        url: "http://localhost:8080/cliente/listar/byCpfCnpj/" + qry,
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
}


function criarCampoVeiculo() {
    $('.veiculoAutoComplete').on('autocomplete.select', function (evt, item) {
        $("#dscVeiculo").val(item.dscVeiculo);
        $("#codVeiculo").val(item.codVeiculo);
    });

    $(".veiculoAutoComplete").autoComplete({
        resolver: 'custom',
        formatResult: function (item) {
            return {
                value: item.codVeiculo,
                text: item.dscVeiculo,
            };
        },
        events: {
            search: function (qry, callback) {
                $.ajax(
                    {
                        type: "GET",
                        url: "http://localhost:8080/veiculo/listar/byTermo/" + qry,
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
}

function criarCampoProduto() {
    $('.pesquisaDinamicaAutoComplete').on('autocomplete.select', function (evt, item) {
        $("#codProduto").val(item.codProduto);
        $("#dscProduto").val(item.dscProduto);
        $("#nroSequencial").val(item.nroSequencial);
        $("#indEstoque").val(item.qtdEstoque>0?"S":"N");
    });

    $(".pesquisaDinamicaAutoComplete").autoComplete({
        resolver: 'custom',
        formatResult: function (item) {
            return {
                value: item.codProduto,
                text: item.dscProduto + '  ' + (item.marca?.dscMarca || ''),
            };
        },
        events: {
            search: function (qry, callback) {
                $.ajax(
                    {
                        type: "GET",
                        url: "http://localhost:8080/produtos/listar/autoComplete/" + qry,
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
}

function preencherCampoVendasAbertas(){
    $("#codProduto").val(dados.codProduto);
    $("#dscProduto").val(dados.dscProduto);
    $("#codCliente").val(dados.codCliente);
    $("#vlrVenda").val(dados.vlrVenda);
    $("#nroStatusVenda").val(dados.nroStatusVenda);
}

function criarComboVendedores() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/usuario/listar/vendedores",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.retorno) {
                montarComboVendedores(data.objeto)
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao consultar Vendedor!", "error");
        }
    });

}

function montarComboVendedores(obj) {
    var html = "<select id='codVendedor' class='form-control dropdown-toggle'>";
    html += "<option value='0'>Selecione</option>"
    if (obj.length > 0) {
        for (var i in obj) {
            html += "<option value=" + obj[i].codUsuario + ">" + obj[i].nmeUsuarioCompleto + "</option>"
        }
    }
    html += "</select>";
    $("#comboVendedor").html(html);
}

function criarComboFuncionarios() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/usuario/listar/funcionarios",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.retorno) {
                montarComboFuncionarios(data.objeto)
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao consultar Funcionario!", "error");
        }
    });

}

function montarComboFuncionarios(obj) {
    var html = "<select id='codFuncionario' class='form-control dropdown-toggle'>";
    html += "<option value='0'>Selecione</option>"
    if (obj.length > 0) {
        for (var i in obj) {
            html += "<option value=" + obj[i].codUsuario + ">" + obj[i].nmeUsuarioCompleto + "</option>"
        }
    }
    html += "</select>";
    $("#comboFuncionarios").html(html);
}

function getListaProdutosVenda() {
    var codVenda = $("#codVenda").val();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/venda/produto/listar/" + codVenda,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.retorno) {
                montaTabelaProdutos(data.objeto)
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: (err) => {
            swal("", "Erro ao buscar os produtos da venda " + codVenda, "error");
        }
    });
}
 

function montaTabelaProdutos(dados) {   
    var tabela = '';
    tabela += "<table class='table table-hover table-striped table-bordered table-white'";
    tabela += "    id='tabelaProdutosVenda'>";
    tabela += "    <thead>";
    tabela += "        <tr align='center'>";
    tabela += "            <th>Produto</th>";
    tabela += "            <th>Marca</th>";
    tabela += "            <th>Valor</th>";
    tabela += "            <th>Quantidade</th>";
    tabela += "            <th>Desconto</th>";
    tabela += "            <th>Funcionario</th>";
    tabela +="             <th>Total</th>";
    tabela += "            <th>Ações</th>";
    tabela += "        </tr>";
    tabela += "    </thead>";
    tabela += "    <tbody>";
    if (dados.length > 0) {
        dadosRetornoProdutos = dados;
        for (var i in dados) {
            tabela += "     <tr>";
            tabela += "     <td>" + dados[i].produto.dscProduto + "</td>";
            tabela += "     <td>" + (dados[i].produto.marca?.dscMarca || 'serviço') + "</td>";
            tabela += "     <td>"+ dados[i].vlrVenda+ "</td>";
            tabela += "     <td>"+ dados[i].qtdVendida + "</td>";
            tabela += "     <td>"+ dados[i].vlrDesconto + "</td>";
            tabela += "     <td>"+ dados[i].funcionario.nmeUsuarioCompleto + "</td>";
            tabela += "     <td>"+ dados [i].vlrTotalProduto + "</td>";
            tabela += "     <td style='text-align:center;'>";
            tabela += "         <a class='btn btn-link' style='color: red;' href='javascript:removerProduto(" + i + ")'>";
            tabela += "             <i class='fas  fa-trash'></i>";
            tabela += "         </a>";
            tabela += "     </td>";
            tabela += "     </tr>";
        }
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#divTabela").html(tabela);
    $("#tabelaProdutosVenda").DataTable({
        "filter": false,
        "ordering": false,
        "info": false,
        "paging": false
    });
}

function limparCamposProduto() {
    $("#dscProduto").val("");
    $("#qtdVendida").val("");
    $("#vlrVenda").val("");
    $("#vlrDesconto").val("");
    $("#codFuncionario").val("0");
    $("#txtObservacaoProd").val("");
}


function removerProduto(indice){
    var nroSequencial = dadosRetornoProdutos[indice].nroSequencial;
    var codVenda = dadosRetornoProdutos[indice].codVenda;
    var codProduto = dadosRetornoProdutos[indice].codProduto;
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/venda/produto/excluir/"+nroSequencial+"/"+codVenda+"/"+codProduto,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.retorno) {
                montaTabelaProdutos(data.objeto);
                swal("", "Produto removido com sucesso!", "success");
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao excluir Vendedor!", "error");
        }
    });

}


$(document).ready(function () {
    $("#divCodVenda").hide();
    $("#codVenda").change();
    $("#vlrImpostoProduto").val('0,0684');
    $("#vlrImpostoServico").val('0,1026');
    criarComboVendedores();
    criarComboFuncionarios();
    criarCampoCliente();
    criarCampoCpfCnpj();
    criarCampoVeiculo();
    criarCampoProduto();
});


