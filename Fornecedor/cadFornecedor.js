$(document).ready(function () {
    getListarFornecedor();
    $("#nroCep").blur(function () {
        getCep($("#nroCep").val());
    });
});

var dadosRetorno;

$("#btnSalvar").click(function () {

    if ($("#nroCnpj").val() == '') {
        swal('', 'Por favor preencha o CNPJ!', 'warning');
        return false;
    }
    if ($("#nroIe").val() == '') {
        swal('', 'Por favor preencha o I.E !', 'warning');
        return false;
    }
    if ($("#dscFornecedor").val() == '') {
        swal('', 'Por favor preencha o Nome do Fornecedor !', 'warning');
        return false;
    }
    if ($("#nroTelefone").val() == '') {
        swal('', 'Por favor preencha o Numero de Telefone !', 'warning');
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
    if ($("#txtLocalidade").val() == '') {
        swal('', 'Por favor preencha a Cidade !', 'warning');
        return false;
    }
    if ($("#txtComplemento").val() == '') {
        swal('', 'Por favor preencha o Complemento !', 'warning');
        return false;
    }
    if ($("#nmeBairro").val() == '') {
        swal('', 'Por favor preencha o Bairro  !', 'warning');
        return false;
    }
    if ($("#sglUf").val() == '') {
        swal('', 'Por favor a U.F !', 'warning');
        return false;
    }
    var ativo = "N";
    if ($("#indAtivo").is(":checked")) {
        ativo = 'S';
    }
    var dados = JSON.stringify({
        nroCnpj: $("#nroCnpj").val(),
        nroIe: $("#nroIe").val(),
        dscFornecedor: $("#dscFornecedor").val(),
        nroTelefone: $("#nroTelefone").val(),
        nroCep: $("#nroCep").val(),
        txtLogradouro: $("#txtLogradouro").val(),
        txtLocalidade: $("#txtLocalidade").val(),
        txtComplemento: $("#txtComplemento").val(),
        nmeBairro: $("#nmeBairro").val(),
        sglUf: $("#sglUf").val(),
        indAtivo: ativo,
    })

    if ($("#codFornecedor").val() > 0) {
        dados = JSON.stringify({
            dscFornecedor: $("#dscFornecedor").val(),
            nroCnpj: $("#nroCnpj").val(),
            nroIe: $("#nroIe").val(),
            nroTelefone: $("#nroTelefone").val(),
            nroCep: $("#nroCep").val(),
            txtLogradouro: $("#txtLogradouro").val(),
            txtLocalidade: $("#txtLocalidade").val(),
            txtComplemento: $("#txtComplemento").val(),
            nmeBairro: $("#nmeBairro").val(),
            sglUf: $("#sglUf").val(),
            indAtivo: ativo,
            codFornecedor: $("#codFornecedor").val()
        })
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/fornecedor/salvar",
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
                    text: "Fornecedor salvo!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                getListarFornecedor();
                $("#fornecedorModal").modal("hide");
            } else {
                swal("", "Fornecedor não salvo!!!", "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao salvar Fornecedor!!!", "error");
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
            swal("", "Fornecedor não confirmado!!!", "error");
        }
    });
}




