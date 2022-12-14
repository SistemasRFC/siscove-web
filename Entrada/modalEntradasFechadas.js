$(document).ready(function () {
    //     getListarEntradaFechadas();

    // })
    $("#btnProcurar").click(function () {
        getListarEntradaFechadas();

    })
})

function getListarEntradaFechadas() {
    swal({

        title: "Carregando Lista de Entradas Fechadas!",
        text: "",
        imageUrl: "../Resources/images/preload.gif",
        showConfirmButton: false
    });
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/entrada/listar/fechadas/" + $("#codFornecedorModalFechada").val(),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },

        success: function (data) {
            if (data.retorno) {
                dadosRetorno = data.objeto;
                montaTabelaEntradaFechada(data.objeto);
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: (err) => {
            swal("", " não confirmado!!!", "error");
        }
    });
}


function montaTabelaEntradaFechada() {
    var dados = dadosRetorno;
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaEntradaF">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <th>Codigo </th>'
    tabela += '        <th>Data </th>'
    tabela += '        <th>Fornecedor </th>'
    tabela += '        <th>Deposito </th>'
    tabela += '        <th>Valor Total </th>'
    tabela += '        <th><br/></th>'
    tabela += "        </tr>";
    tabela += "    </thead>";
    tabela += "    <tbody>";

    for (var i in dados) {
        tabela += "<tr class='preenche' id='" + i + "'>";
        tabela += "     <td>" + dados[i].nroSequencial + "</td>";
        tabela += "     <td>" + dados[i].dtaEntradaFormatada + "</td>";
        tabela += "     <td>" + dados[i].dscFornecedor + "</td>";
        tabela += "     <td>" + dados[i].dscDeposito + "</td>";
        tabela += "     <td>" + dados[i].vlrTotalFormatada + "</td>";
        tabela += "     <td width='10%'  style='text-align:center;'>";
        tabela += "         <a href='javascript:preencherCampos(" + i + ")'>";
        tabela += "             <i class='fas  fa-file'></i>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";

    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#tabelaEntradaFechada").html(tabela);
    $("#tabelaEntradaF").DataTable();
    swal.close();



}

