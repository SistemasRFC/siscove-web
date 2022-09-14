$(document).ready(function () {
    getListaPerfil();
    

    $("#btnPassar").click(function () {
        var itens = $("#codMenuDesvinculados option:selected");
        var options = $("#codMenuVinculados").html();
        for (var i in itens) {
            if (itens[i].value != undefined) {
                options += "<option value='" + itens[i].value + "'>" + itens[i].text + "</option>";
                $("#codMenuDesvinculados option[value=" + itens[i].value + "]").remove();
            }
        }
        $("#codMenuVinculados").html(options);
    })

    $("#btnPassarTodos").click(function () {
        var options = $("#codMenuVinculados").html();
        $('#codMenuDesvinculados').find('option').each(function () {
            options += "<option value='" + $(this).val() + "'>" + $(this).text() + "</option>";
            $("#codMenuDesvinculados option[value=" + $(this).val() + "]").remove();
        });
        $("#codMenuVinculados").html(options);
    })
    $("#btnRemover").click(function () {
        var itens = $("#codMenuVinculados option:selected");
        var options = $("#codMenuDesvinculados").html();
        for (var i in itens) {
            if (itens[i].value != undefined) {
                options += "<option value='" + itens[i].value + "'>" + itens[i].text + "</option>";
                $("#codMenuVinculados option[value=" + itens[i].value + "]").remove();
            }
        }
        $("#codMenuDesvinculados").html(options);
    })
    $("#btnRemoverTodos").click(function () {
        var options = $("#codMenuDesvinculados").html();
        $('#codMenuVinculados').find('option').each(function () {
            options += "<option value='" + $(this).val() + "'>" + $(this).text() + "</option>";
            $("#codMenuVinculados option[value=" + $(this).val() + "]").remove();
        });
        $("#codMenuDesvinculados").html(options);
    })
    $("#btnSalvar").click(function(){
        var listados=[];
        swal({
            title: "Aguarde, salvando permissões",
            imageUrl: "../Resources/images/preload.gif",
            showConfirmButton: false
            });
        $('#codMenuVinculados').find('option').each(function () {
            listados.push(parseInt($(this).val()));
        });

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/menuperfil/vincular",
            data: JSON.stringify({
                codPerfilW: parseInt($("#codPerfilW").val()),
                listaMenus: listados}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
            },
            success: function (data) {
                swal({
                    title: "",
                    text: "Permissões salvas!",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            error: (err) => {
                swal("", "Perfil não confirmado!!!", "error");
            }
        });        
    })
})

function getListaPerfil() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/perfil/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            montaComboPerfil(data.objeto);
        },
        error: (err) => {
            swal("", "Perfil não confirmado!!!", "error");
        }
    });
}



function montaComboPerfil(dados) {
    var tabela = '';
    tabela += '<option value="">Selecione </option>';
    for (var i in dados) {

        tabela += '<option value="' + dados[i].codPerfilW + '">' + dados[i].dscPerfilW + ' </option>';
    }
    $("#codPerfilW").html(tabela);
    $("#codPerfilW").change(function () {
        ListarMenuVinculados();
        listarMenusDesvinculados();
    });
}
function ListarMenuVinculados() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/menuperfil/listar/menu/vinculados/" + $("#codPerfilW").val(),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            montaComboListarMenu(data.objeto);
        },
        error: (err) => {
            swal("", "Perfil não confirmado!!!", "error");
        }
    });
}

function montaComboListarMenu(dados) {
    var tabela = '';
    for (var i in dados) {

        tabela += '<option value="' + dados[i].codMenuW + '">' + dados[i].dscMenuW + ' </option>';
    } codPerfilW
    $("#codMenuVinculados").html(tabela);
}

function listarMenusDesvinculados() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/menuperfil/listar/menu/desvinculados/" + $("#codPerfilW").val(),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            montaComboMenuDesvinculados(data.objeto);
        },
        error: (err) => {
            swal("", "Perfil não confirmado!!!", "error");
        }
    });
}

function montaComboMenuDesvinculados(dados) {
    var tabela = '';
    for (var i in dados) {

        tabela += '<option value="' + dados[i].codMenuW + '">' + dados[i].dscMenuW + ' </option>';
    } codPerfilW
    $("#codMenuDesvinculados").html(tabela);

}