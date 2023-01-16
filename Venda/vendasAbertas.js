var dadosRetorno;
function getListaVendasAbertas() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/venda/listar/abertas",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            if (data.retorno) {
                dadosRetorno = data.objeto;
                montaTabelaVendasAbertas(data.objeto);
            } else {
                swal("", data.mensagem, "error");
            }
        },
        error: (err) => {
            swal("", " não confirmado!", "error");
        }
    });
}

function montaTabelaVendasAbertas() {
    var dados = dadosRetorno;
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white" id="tabelaVendasAbertas">';
    tabela += "    id='tabelaVenda'>";
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <th> Codigo </th>'
    tabela += '        <th> Cliente </th>'
    tabela += '        <th> Valor </th>'
    tabela += '        <th><br/></th>'
    tabela += "        </tr>";
    tabela += "    </thead>";
    tabela += "    <tbody>";
    for (var i in dados) {
        tabela += "<tr class='preenche' id='" + i + "'>";
        tabela += "     <td>" + dados[i].produto.codProduto + "</td>";
        tabela += "     <td>" + dados[i].produto.dscProduto + "</td>";
        tabela += "     <td>" + dados[i].dscVeiculo + "</td>";
        tabela += "     <td>" + dados[i].nroPlaca + "</td>";
        tabela += "     <td>" + dados[i].vlrKmRodado + "</td>";
        tabela += "     <td>" + dados[i].txtObservacao + "</td>";
        tabela += "     <td>" + dados[i].vlrImpostoProduto + "</td>";
        tabela += "     <td>" + dados[i].vlrImpostoServico + "</td>";
        tabela += "     <td>" + dados[i].codUsuario + "</td>";
        tabela += "     <td>" + dados[i].codCliente + "</td>";
        tabela += "     <td>" + dados[i].vlrVenda + "</td>";
        tabela += "     <td width='10%'  style='text-align:center;'>";
        tabela += "         <a href='javascript:recuperaDados(" + dados[i].produto.codProduto + ")'>";
        tabela += "             <i class='fas  fa-file'></i>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#tabelaVendasAbertas").html(tabela);
    $("#tabelaVenda").DataTable();
    swal.close();
    $("#modalVendasAbertas").modal("show");
}