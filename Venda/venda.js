var dadosRetorno;
$(document).ready(function () {
    $("#vlrImpostoProduto").val('0,0684');
    $("#vlrImpostoServico").val('0,1026');
    criarComboVendedores();
    criarComboFuncionarios();

    // $("#btnNovoVenda").click(function () {
    //     limparCamposVenda();
    //     $("#vendaModal").modal("show"); 

    // });

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

        var vlrImpostoP = $("#vlrImpostoProduto").val().replace(',','.');
        var vlrImpostoS = $("#vlrImpostoServico").val().replace(',','.');

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

function getListaProduto() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/venda/produto/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Venda não confirmada!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
        tabela += "<table class='table table-hover table-striped table-bordered table-white'";
        tabela += "    id='tabelaVendaProduto'>";
        tabela += "    <thead>";
        tabela += "        <tr align='center'>";
        tabela += "            <th width='50%'>Descrição</th>";         
        tabela += "            <th width='30%'>Ativo</th>";       
        tabela += "            <th width='10%'>Editar</th>";
        tabela += "        </tr>";
        tabela += "    </thead>";
        tabela += "    <tbody>";
    for (var i in dados) {
        var simNao = dados[i].indAtiva=='S'?'Sim':'Não';
        tabela += "     <tr>";
        tabela += "     <td width='50'>" + dados[i].dscProduto+ "</td>";    
        tabela += "     <td width='30%'>" + simNao + "</td>";
        tabela += "     <td width='10%'  style='text-align:center;'>";
        tabela += "         <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "             <i class='fas  fa-pen'></i>";
        tabela += "         </a>";
        tabela += "     </td>";
        tabela += "     </tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#divTabela").html(tabela);
    $("#tabelaMarca").DataTable();

}

function preencherCampos(index) {
    var dados = dadosRetorno[index];
    
    if (dados.indAtiva == 'S') {
        $("#indAtiva").prop('checked', true);
    } else {
        $("#indAtiva").prop('checked', false);
    }

    $("#codProduto").val(dados.codProduto);
    $("#dscProduto").val(dados.dscProduto);
}

function limparCampos() {
    $("#dscProduto").val("");
    $("#indAtiva").prop("checked", false),
    $("#codProduto").val(0);
}