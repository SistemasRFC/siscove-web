$(document).ready(function () {
    $("#btnNovo").click(function () {
        editarCampos();
        $("#vendaModal").modal("show");
    });

    $('.basicAutoComplete').on('autocomplete.select', function (evt, item) {
        console.log(item)
        $("#codCliente").val(item.codCliente);
        $("#nroDoc").val(item.nroCpf);
        $("#nroCelular").html(item.nroTelefoneCelular);
        $("#nroTelefone").html(item.nroTelefoneContato);
        $("#txtEndereco").html(item.txtLogradouro);

        $('.basicAutoSelectSelected').html(item ? JSON.stringify(item) : 'null');
    });

    $(".basicAutoComplete").autoComplete({
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
                        url: "http://localhost:8080/cliente/listar/byTermo/"+qry,

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
                        url: "http://localhost:8080/cliente/listar/byCpfCnpj/"+qry,

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
    });
});

function limparCampos() {
    $(".precisaLimpar").val('');
    $(".precisaLimpar").html('');
        
}

function editarCampos() {
    $(".precisaEditar").val('');
    $(".precisaEditar").html('');
}