var dadosRetorno;

$("#btnSalvar").click(function () {

    if ($("#dscMarca").val() == '') {
        swal('', 'Por favor preencha a Descrição !', 'warning');
        return false;
    }

    var ativo = "N";
    if ($("#indAtiva").is(":checked")) {
        ativo = 'S';
    }
    var dados = JSON.stringify({
        dscMarca: $("#dscMarca").val(),
        indAtiva: ativo,
        codClienteFinal: $("#codClienteFinal").val()
    })

    if ($("#codMarca").val() > 0) {
        dados = JSON.stringify({ 
            dscMarca: $("#dscMarca").val(),
            indAtiva: ativo,
            codMarca: $("#codMarca").val(),
            codClienteFinal: $("#codClienteFinal").val()
        })
    }

    if ($("#codClienteFinal").val() == '') {
        swal('', 'Por favor preencha o Cliente Final!', 'warning');
        return false;
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
                    text: "Marca salva!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                getListaMarca();
                $("#marcaModal").modal("hide");
            } else {
                swal("", "Marca não salva!", "error");
            }
        },
        error: function (err) {
            swal("", "Erro ao salvar Marca!", "error");
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