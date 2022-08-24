

$(document).ready(function () {
    $("#modalUsuario").load("cadUsuario.html")
    getListaPerfil();
});

var dadosRetorno;


function getListaPerfil() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/usuario/listar",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabela(data.objeto);
        },
        error: (err) => {
            swal("", "Perfil não confirmado!!!", "error");
        }
    });
}

function montaTabela(dados) {
    var tabela = '';
    for (var i in dados) {
        tabela += "<tr>";
        tabela += "<td width='25%'>" + dados[i].nmeUsuario + "</td>";
        tabela += "<td width='25%'>" + dados[i].codPerfilW + "</td>";
        tabela += "<td width='25%'>" + dados[i].nmeUsuarioCompleto + "</td>";
        tabela += "<td width='25%'>" + dados[i].indAtivo + "</td>";
        tabela += "<td width='25%'  style='text-align:center;'>";
        tabela += "    <a href='javascript:deleteRegistro(" + dados[i].codUsuario + ")'>";
        tabela += "        <i class='fas  fa-trash'></i>";
        tabela += "    </a>";
        tabela += "    <a href='javascript:alteraRegistro(" + dados[i].codUsuario + ")'>";
        tabela += "        <i class='fas  fa-pen'></i>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    $("#tabelaPerfil").html(tabela);
    $("#tabelaPerfil").DataTable();

}


function alteraRegistro(index) {
    var dados = dadosRetorno[index];
    console.log(dados);
    $("#nmPerfil").val(dados.nmPerfil);
    if (dados.inAtivo == 'S') {
        $("#inAtivo").prop('checked', true);
    } else {
        $("#inAtivo").prop('checked', false);
    }
    $("#idPerfil").val(dados.idPerfil)
}

function limparCampos() {
    $("#nmPerfil").val("");
    $("#nroTelCelular").val(),
    $("#txtEmail").val(),
    $("#codPerfilW").val(),
    $("#codDeposito").val(),
    $("#nmeUsuarioCompleto").val(),


    $("#inAtivo").val("");







    $("#idPerfil").val(0);
}
