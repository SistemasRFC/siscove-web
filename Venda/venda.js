// var dadosClienteSelected;
$(document).ready(function () {
    criarComboVendedores();

    // $("#modalCadCliente").load("../Cliente/cadCliente.html", dadosClienteSelected)

    // $("#btnNovoCliente").click(function () {
    //     limparCamposCliente();
    //     $(".fisica").hide();
    //     $(".juridica").hide();
    //     $("#clienteModal").modal("show");

    // });

    $('.clienteAutoComplete').on('autocomplete.select', function (evt, item) {
        console.log(item)
        $("#codCliente").val(item.codCliente);
        $("#nroDoc").val(item.nroCpf);
        $("#nroCelular").html(item.nroTelefoneCelular);
        $("#nroTelefone").html(item.nroTelefoneContato);
        $("#txtEndereco").html(item.txtLogradouro);

        $('.clienteAutoSelectSelected').html(item ? JSON.stringify(item) : 'null');
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
        console.log($('.cpfCnpjAutoComplete'))
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
                label: item.nroCpf,
                text: item.nroCpf ? item.nroCpf : item.nroCnpj,
            };
        },



        events: {
            search: function (qry, callback) {
                $.ajax(

                    {
                        type: "GET",
                        url: "http://localhost:8080/listar/venda/produto/" + qry,

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
        console.log(item)
        $("#codVeiculo").val(item.codVeiculo);
        $("#dscVeiculo").val(item.dscVeiculo);
        $("#indAtivo").html(item.indAtivo);
        $('.basicAutoSelectSelected').html(item ? JSON.stringify(item) : 'null');
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
});


var dadosRetorno;

$("#btnSalvar").click(function () {
    if ($("#dscCliente").val() == '') {
        swal('', 'Por favor preencha o Nome !', 'warning');
        return false;
    }

    if ($("#nroDoc").val() == '') {
        swal('', 'Por favor preencha o Cpf ou Cnpj!', 'warning');
        return false;
    }

    var entrada = "F";
    if ($("#indTipoEntrada").is(":checked")) {
        entrada = "A";
    }

    var dados = JSON.stringify({
        dscCliente: $("#dscCliente").val(),
        nroTelefoneContato: $("#nroTelefoneContato").val(),
        nroDoc: $("#nroDoc").val(),
        nroCep: $("#nroCep").val(),
        indTipoCliente: entrada,
    })

    if ($("#codCiente").val() > 0) {
        dados = JSON.stringify({
            codCliente: $("#codCliente").val(),
            nroTelefoneContato: $("#nroTelefoneContato").val(),
            nroDoc: $("#nroDoc").val(),
            nroCep: $("#nroCep").val(),
            indTipoEntrada: entrada,
        })
    }
 
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/cliente/salvar",
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
                    text: "cliente salvo!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                salvarEntrada();
            } else {
                swal("", "Cliente não pode ser salvo!", "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao salvar Cliente", "error");
        }
    })
});



function criarComboVendedores() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/usuario/listar/vendedores/",
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
    var html = "<select id='codUsuario' class='form-control dropdown-toggle'>";
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
