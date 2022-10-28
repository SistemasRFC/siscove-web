$(document).ready(function () {
    
    getListarClientes();
    $(".indTipoCliente").click(function(){
        if ($(this).val()=='F') {
            $(".fisica").show();
            $(".juridica").hide();
        }else{
            $(".fisica").hide();
            $(".juridica").show();
        }
    })
    $("#nroCep").blur(function () {
        getCep($("#nroCep").val());
    });
});

var dadosRetorno;

$("#btnSalvar").click(function () {

    if ($("#dscCliente").val() == '') {
        swal('', 'Por favor preencha a Descrição !', 'warning');
        return false;
    }
    if ($("#nroCep").val() == '') {
        swal('', 'Por favor preencha o Cep !', 'warning');
        return false;
    }
    if ($("#txtLogradouro").val() == '') {
        swal('', 'Por favor preencha o Logradouro !', 'warning');
        return false;
    }
    if ($("#txtEmail").val() == '') {
        swal('', 'Por favor preencha o Email !', 'warning');
        return false;
    }
    if ($("#nroIe").val() == '') {
        swal('', 'Por favor preencha o I.E !', 'warning');
        return false;
    }
    if ($("#dtaNascimento").val() == '') {
        swal('', 'Por favor preencha o Data de Nascimento !', 'warning');
        return false;
    }
    if ($("#txtLocalidade").val() == '') {
        swal('', 'Por favor preencha a Cidade !', 'warning');
        return false;
    }
    var cliente = "F";
    if($("#indTipoCliente").is(":checked")){
        cliente = "J";
    }
    
    var dados = JSON.stringify({
        codCliente: $("#codCliente").val(),
        dscCliente: $("#dscCliente").val(),
        nroCep: $("#nroCep").val(),
        txtLogradouro: $("#txtLogradouro").val(),
        complemento: $("#txtComplemento").val(),
        txtLocalidade: $("#txtLocalidade").val(),
        sglUf: $("#sglUf").val(),
        nroTelefoneContato: $("#nroTelefoneContato").val(),
        nroTelefoneCelular: $("#nroTelefoneCelular").val(),
        nroCpf: $("#nroCpf").val(),
        nroCnpj: $("#nroCnpj").val(),
        nroIe: $("#nroIe").val(),
        codClienteFinal: $("#codClienteFinal").val(),
        dtaNascimento: $("#dtaNascimento").val(),
        txtEmail: $("#txtEmail").val(),
        indTipoCliente: cliente,

    })
    if ($("#codCliente").val() > 0) {
        dados = JSON.stringify({
            dscProduto: $("#dscProduto").val(),
            dscCliente: $("#codCliente").val(),
            nroCep: $("#nroCep").val(),
            nmeBairro: $("#nmeBairro").val(),
            txtLocalidade: $("#txtLocalidade").val(),
            complemento: $("#txtComplemento").val(),
            sglUf: $("#sglUf").val(),
            nroTelefoneContato: $("#nroTelefoneContato").val(),
            nroTelefoneCelular: $("#nroTelefoneCelular").val(),
            nroCpf: $("#nroCpf").val(),
            nroCnpj: $("#nroCnpj").val(),
            nroIe: $("#nroIe").val(),
            codClienteFinal: $("#codClienteFinal").val(),
            txtEmail: $("#txtEmail").val(),
            indTipoCliente: cliente,
            codCliente: $("#codCliente").val()
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
            console.log(data);
            if (data.retorno) {
                swal("", "Cliente confirmado!!!", "success");
                getListarClientes();
            } else {
                swal("", "Cliente não confirmado!!!", "error");
            }
        },
        error: function (err) {
            swal("", "Cliente não confirmado!!!", "error");
        }
    });

});

function getCep(nroCep) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/consulta/cep/" + nroCep,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (dados) {
            dados = dados.objeto;
            $("#txtLogradouro").val(dados.logradouro)
            $("#txtComplemento").val(dados.complemento)
            $("#nmeBairro").val(dados.bairro)
            $("#txtLocalidade").val(dados.localidade)
            $("#sglUf").val(dados.uf)
        },
        error: (err) => {
            swal("", "Erro!!!", "error");
        }
    });
}
