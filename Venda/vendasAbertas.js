function getListaVendasAbertas() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/venda/listar/abertas",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        success: function (data) {
            if (data.retorno) {
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

function montaTabelaVendasAbertas(dados) {
    var tabela = '';
    tabela += '<table class="table table-hover table-striped table-bordered table-white">';
    tabela += '<thead>';
    tabela += '    <tr align="center">';
    tabela += '        <th> Veículo </th>'
    tabela += '        <th> Placa </th>'
    tabela += '        <th> Quilometro Rodado </th>'
    tabela += '        <th> Imposto do Produto </th>'
    tabela += '        <th> Impossto do Serviço </th>'
    tabela += '        <th> Vendedor </th>'
    tabela += '        <th> Cliente </th>'
    tabela += '        <th> Observação </th>'
    tabela += '        <th><br/></th>'
    tabela += "        </tr>";
    tabela += "    </thead>";
    tabela += "    <tbody>";
    for (var i in dados) {
        tabela += "<tr class='preenche' id='" + i + "'>";
        tabela += "     <td>" + dados[i].dscVeiculo + "</td>";
        tabela += "     <td>" + dados[i].nroPlaca + "</td>";
        tabela += "     <td>" + dados[i].vlrKmRodado + "</td>";
        tabela += "     <td>" + dados[i].vlrImpostoProduto + "</td>";
        tabela += "     <td>" + dados[i].vlrImpostoServico + "</td>";
        tabela += "     <td>" + dados[i].codVendedor + "</td>";
        tabela += "     <td>" + dados[i].codCliente + "</td>";
        tabela += "     <td>" + dados[i].txtObservacao + "</td>";
        tabela += "     <td width='10%'  style='text-align:center;'>";
        tabela += "         <a href='javascript:recuperaDados(" + dados[i].codVenda + ")'>";
        tabela += "             <i class='fas  fa-file'></i>";
        tabela += "    </a>";
        tabela += "</td>";
        tabela += "</tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#tabelaVendasAbertas").html(tabela);
    $("#vendasAbertasModal").modal("show");

    swal.close();
}