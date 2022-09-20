$(function() {
    $("#btnSalvar").click(function(){
        var ativo = "N"
        if($("#indAtivo").is(":checked")){
            ativo = "S"
        }
        var dados = JSON.stringify({
            dscTipoProduto: $("#dscTelaProduto").val(),
            codClienteFinal: $("#codClienteFinal").val(),
            indAtivo: ativo,
        });

        if ($("#codTelaProduto").val() > 0) {
            dados = JSON.stringify({
                dscTelaProduto: $("#dscTelaProduto").val(),
                codClienteFinal: $("#codClienteFinal").val(),
                indAtivo: ativo,
                codTelaProduto: $("#codTelaProduto").val()
            });
        }
        $.ajax({ 
            type: "POST",
            url: "http://localhost:8080/produto/salvar",
            data: dados,
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.retorno) {
                    swal({
                        title: "",
                        text: "Produto salvo!",
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    getListarProduto();
                    $("#produtoModal").modal("hide");
                } else {
                    swal("", "Produto não salvo!", "error");
                }
            },
            error: function (err) {
                swal("", "Erro ao salvar o Produto!", "error");
            
            }
        });

    });
    
});


function criarComboClienteFinal() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/produto/listar/ativos",
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
            swal("", "Erro ao consultar produto!", "error"); 
        }
    });
}

function montarComboClienteFinal(obj) {
    var html = "<select id='codClienteFinal' class='form-control dropdown-toggle'>";
    html += "<option value='0'>Selecione</option>"
    if(obj.length>0) {
        for(var i in obj) {
            html += "<option value="+obj[i].codClienteFinal+">"+obj[i].dscTelaProduto+"</option>"
        }
    }
    html += "</select>";
    $("#comboClienteFinal").html(html);
}

$(document).ready(function(){
    criarComboClienteFinal()
});