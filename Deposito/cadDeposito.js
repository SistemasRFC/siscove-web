var dadosRetorno;

$("#btnSalvar").click(function () {

    if ($("#dscDeposito").val() == '') {
        swal('', 'Por favor preencha a Descrição !', 'warning');
        return false;
    }

    var ativo = "N";
    if ($("#indAtivo").is(":checked")) {
        ativo = 'S';
    }
    var dados = JSON.stringify({
        dscDeposito: $("#dscDeposito").val(),
        indAtivo: ativo,
    })

    if ($("#codDeposito").val() > 0) {
        dados = JSON.stringify({
            dscDeposito: $("#dscDeposito").val(),
            indAtivo: ativo,
            codDeposito: $("#codDeposito").val()
        })
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/deposito/salvar",
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
                    text: "Deposito salvo!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                getListarDeposito();
                $("#depositoModal").modal("hide");
            } else {
                swal("", "Deposito não salvo!", "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao salvar Deposito!", "error");
        }
    });
});

function criarComboClienteFinal() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/clienteFinal/listar/ativos",
        beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            if (data.retorno){
                montarComboClienteFinal(data.objeto)
            }else{
                swal("", data.mensagem, "error"); 
            }
        },
        error: function(err) {
            swal("", "Erro ao consultar cliente final!", "error"); 
        }
    });
}

function montarComboClienteFinal(obj) {
    var html = "<select id='codClienteFinal' class='form-control dropdown-toggle'>";
    html += "<option value='0'>Selecione</option>"
    if(obj.length>0) {
        for(var i in obj) {
            html += "<option value="+obj[i].codClienteFinal+">"+obj[i].nmeClienteFinal+"</option>"
        }
    }
    html += "</select>";
    $("#comboClienteFinal").html(html);
}

$(document).ready(function(){
    criarComboClienteFinal()
});
