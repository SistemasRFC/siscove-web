// $(document).ready(function () {
//     getListarEntradaAbertas();

// })

function getListarEntradaAbertas() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/entrada/listar/abertas",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            dadosRetorno = data.objeto;
            montaTabelaEntrada(data.objeto);
        },
        error: (err) => {
            swal("", " não confirmado!!!", "error");
        }
    });
}

function montaTabelaEntrada() {
    var dados = dadosRetorno;
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaEntrada">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <th>Codigo </th>'
    tabela += '        <th>Data </th>'
    tabela += '        <th>Fornecedor </th>'
    tabela += '        <th>Valor Total </th>'
    tabela += "        </tr>";
    tabela += "    </thead>";
    tabela += "    <tbody>";

    for (var i in dados) {
        tabela += "<tr>";
        tabela += "     <td>" + dados[i].nroSequencial + "</td>";
        tabela += "     <td>" + dados[i].dtaEntrada + "</td>";
        if (dados[i].fornecedorDto == null) {
            tabela += "     <td></td>";
        } else {
            tabela += "     <td>" + dados[i].fornecedorDto.dscFornecedor + "</td>";
        }
        tabela += "     <td>" + dados[i].vlrTotal + "</td>";
        tabela += "    </a>";

        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#tabelaEntradaAberta").html(tabela);
    $("#tabelaEntrada").DataTable();
    swal.close();
    $("#entradaModal").modal("show");
}

