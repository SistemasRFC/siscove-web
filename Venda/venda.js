var dadosRetorno;
$(document).ready(function () {
    montaTabelaProdutos(null);
    $("#codVenda").change(function () {
        getListaProdutosVenda();
    });

    $("#vlrImpostoProduto").val('0,0684');
    $("#vlrImpostoServico").val('0,1026');
    criarComboVendedores();
    criarComboFuncionarios();


    $("#btnCancelar").click(function () {
        limparCampos();
        $("#modalCadProduto").modal("hidden");

    });

    $("#btnAdicionar").click(function () {
        limparCampos();
        $("#modalCadProduto").modal("show");

    });

    $("#btnAdicionais").click(function (){
        if ($("#codProduto").prop('checked')){
            $(".divProduto").show();
            $("#dscProduto").val('');
        } else {
            $(".divProduto").hidden();
        }
    })

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


    $('.pesquisaDinamicaAutoComplete').on('autocomplete.select', function (evt, item) {
        $("#dscProduto").val(item.dscProduto);
        $("#codProduto").val(item.codProduto);

    });

    $(".pesquisaDinamicaAutoComplete").autoComplete({
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
                        url: "http://localhost:8080/produtos/listar/byProduto/" + qry,

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

    $("#btnSalvar").click(function () {

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
    });
});

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

function limparCampos() {
    $(".precisaLimpar").val('');
    $(".precisaLimpar").html('');

}

function editarCampos() {
    $(".precisaEditar").val('');
    $(".precisaEditar").html('');
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

function limparCampos() {
    $(".precisaLimpar").val('');
    $(".precisaLimpar").html('');

}

function editarCampos() {
    $(".precisaEditar").val('');
    $(".precisaEditar").html('');
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
    tabela += "            <th>Ações</th>";
    tabela += "        </tr>";
    tabela += "    </thead>";
    tabela += "    <tbody>";
    for (var i in dados) {
        tabela += "     <tr>";
        tabela += "     <td>" + dados[i].produto.dscProduto + "</td>";
        tabela += "     <td>" + (dados[i].produto.marca?.dscMarca || 'serviço') + "</td>";
        tabela += "     <td style='text-align:center;'>";
        tabela += "         <button class='btn btn-link' href='javascript:preencherCamposProduto(" + i + ")'>";
        tabela += "             <i class='fas  fa-pen'></i>";
        tabela += "         </button>";
        tabela += "         <button class='btn btn-link' style='color: red;' href='javascript:preencherCampos(" + i + ")'>";
        tabela += "             <i class='fas  fa-trash'></i>";
        tabela += "         </button>";
        tabela += "     </td>";
        tabela += "     </tr>";
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

function preencherCampos(index) {
    var dados = dadosRetorno[index];

    if (dados.indAtivo == 'S') {
        $("#indAtivo").prop('checked', true);
    } else {
        $("#indAtivo").prop('checked', false);
    }

    $("#codVenda").val(dados.codVenda);
    $("#dscProduto").val(dados.dscProduto);
    $("#qtdVendida").val(dados.qtdVendida);
    $("#vlrVenda").val(dados.vlrVenda);
    $("#vlrDesconto").val(dados.vlrDesconto);
    $("#codFuncionario").val(dados.codFuncionario);
    $("#txtObservacao").val(dados.txtObservacao);


}

function limparCampos() {
    $("#indAtivo").prop("checked", false),
        $("#codVenda").val(0);
    $("#dscProduto").val("");
    $("#qtdVendida").val("");
    $("vlrVenda").val("");
    $("#vlrDesconto").val("");
    $("#codFuncionario").val("");
    $("#txtObservacao")
}