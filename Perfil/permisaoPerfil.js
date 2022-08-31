$(document).ready(function () {
    carregaComboMenuPerfil();
})

$("#btndireita").click(function () {

})

function carregaComboMenuPerfil(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/menuperfil/listar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data){
            montaComboMenuPerfil(data.objeto);
        },
        error: (err) => {
            swal("", "Erro!!!", "error");
        }
    });
}

function montaComboMenuPerfil(dados){
    var tabela = '';
    for  (var i in dados){
        
        tabela+= '<option value="'+dados[i].codPerfilW+'">'+dados[i].codMenuW+' </opition>' ;
    }
    $("#codPerfilW").html(tabela);
}