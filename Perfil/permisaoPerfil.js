$(document).ready(function () {
    getListaPerfil();

    $("#btnPassar").click(function () {
        var itens = $("#codMenuW option:selected");
        var options = $("#codMenuPerfil").html();
        for (var i in itens) {
            if (itens[i].value != undefined) {
                options += "<option value='" + itens[i].value + "'>" + itens[i].text + "</option>";
                $("#codMenuW option[value=" + itens[i].value + "]").remove();
            }
        }
        $("#codMenuPerfil").html(options);
    })

    $("#btnPassarTodos").click(function () {
        var options = $("#codMenuPerfil").html();
        $('#codMenuW').find('option').each(function () {
            options += "<option value='" + $(this).val() + "'>" + $(this).text() + "</option>";
            $("#codMenuW option[value=" + $(this).val() + "]").remove();
        });
        $("#codMenuPerfil").html(options);
    })
    $("#btnRemover").click(function () {
        var itens = $("#codMenuPerfil option:selected");
        var options = $("#codMenuW").html();
        for (var i in itens) {
            if (itens[i].value != undefined) {
                options += "<option value='" + itens[i].value + "'>" + itens[i].text + "</option>";
                $("#codMenuPerfil option[value=" + itens[i].value + "]").remove();
            }
        }
        $("#codMenuW").html(options);
    })
    $("#btnRemoverTodos").click(function () {
        var options = $("#codMenuW").html();
        $('#codMenuPerfil').find('option').each(function () {
            options += "<option value='" + $(this).val() + "'>" + $(this).text() + "</option>";
            $("#codMenuPerfil option[value=" + $(this).val() + "]").remove();
        });
        $("#codMenuW").html(options);
    })
    $("#btnSalvar").click(function(){
        var listados=[];
        $('#codMenuVinculados').find('option').each(function () {
            listados.push({codigoMenu: $(this).val()})
        });
        console.log(listados);
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