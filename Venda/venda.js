var dadosRetorno;
$(document).ready(function () {
    $("#vlrImpostoProduto").val('0,0684');
    $("#vlrImpostoServico").val('0,1026');
    criarComboVendedores();

    // $("#modalVenda").load("../Venda/venda.html", dadosVendaSelected)

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
        var vlrImpostoS = $("#vlrImpostoServico").val().replace(',',',');
        var vlrDesconto = $("#vlrDesconto").val().repalce(',',',');

        var dados = JSON.stringify({
            nroStatusVenda: $("#nroStatusVenda").val(),
            codCliente: $("#codCliente").val(),
            codVendedor: $("#codVendedor").val(),
             vlrDesconto: parseFloat(vlrDesconto),
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
                vlrDesconto: parseFloat(vlrDesconto),
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
                    getListaVenda();
                    $("#modalVenda").modal("hide");
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