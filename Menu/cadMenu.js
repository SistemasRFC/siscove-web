$(function() {
    $("#btnSalvar").click(function(){
        $("#codMenuW").val();
        $("#dscMenuW").val();
        $("#nmeController").val();
        $("#codMenuPaiW").val();
        $("#indMenuAtivoW").val();
        
        $.ajax({
        
            type: "POST",
            url: "http://localhost:8080/menu/salvar",
            data: JSON.stringify({
            codMenuW: $("#codMenuW").val(),
            dscMenuW: $("#dscMenuW").val(),
            nmeController: $("#nmeController")val(),
            codMenuPaiW: $("#codMenuPaiW").val(),
            indMenuAtivoW: $("#indMenuAtivoW").val(),
        }),

    });
    
});


function criarComboMenuPai() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/menu/listar/ativos",
        beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            if (data.retorno){
                montarComboMenuPai(data.objeto)
            }else{
                swal("", data.mensagem, "error"); 
            }
        },
        error: function(err) {
            swal("", "Erro ao consultar menu!", "error"); 
        }
    });
}

function montarComboMenuPai(obj) {
    var html = "<select id='codMenuPaiW' class='form-control dropdown-toggle'>";
    if(obj.length>0) {
        for(var i in obj) {
            html += "<option value="+obj[i].codMenuW+">"+obj[i].dscMenuW+"</option>"
        }
    }
    html += "</select>";
    $("#comboMenuPai").html(html);
}

$(document).ready(function(){
    criarComboMenuPai()
});