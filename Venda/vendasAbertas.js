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

function montarComboMes(obj) {
    var html = "<select id='comboMes' class='form-control dropdown-toggle'>";
    html += "<option value='0'>Selecione</option>"
    if (obj.length > 0) {
        for (var i in obj) {
            html += "<option value=" + 01, 02; 03; 04; 05; 06; 07; 08; 09; 10; 11; 12; + ">" + obj[i].Janeiro; Fevereiro; Março; Abril; Maio; Junho; Julho; Agosto; Setembro; Outubro; Novembro; Dezembro + "</option>"
        }
    }
    html += "</select>";
    $("#comboMes").html(html);
}

function montarComboAno(obj) {
    var html = "<select id='comboAno' class='form-control dropdown-toggle'>";
    html += "<option value='0'>Selecione</option>"
    if (obj.length > 0) {
        for (var i in obj) {
            html += "<option value=" + 2023 + ">" + 2022; 2021; 2020 + "</option>"
        }
    }
    html += "</select>";
    $("#comboAno").html(html);
}


function montaTabelaVendasAbertas(dados) {
    var tabela = '';
    tabela += '<table id="tabelaAbertas" class="table table-hover table-striped table-bordered table-white">';
    tabela += '  <thead>';
    tabela += '    <tr align="center">';
    tabela += '      <th>Venda</th>'
    tabela += '      <th>Cliente</th>'
    tabela += '      <th>Vendedor</th>'
    tabela += '      <th>Data</th>'
    tabela += '      <th>Valor</th>'
    tabela += '      <th>Veículo</th>'
    tabela += "    </tr>";
    tabela += "  </thead>";
    tabela += "  <tbody>";
    for (var i in dados) {
        tabela += "<tr class='preenche' id='" + i + "' onClick='javascript:recuperaDados(" + dados[i].codVenda + ")'>";
        tabela += "     <td>" + dados[i].codVenda + "</td>";
        tabela += "     <td>(" + dados[i].nroDocumentoCliente + ") " + dados[i].nmeCliente + "</td>";
        tabela += "     <td>" + dados[i].nmeVendedor + "</td>";
        tabela += "     <td>" + dados[i].dtaVenda + "</td>";
        tabela += "     <td>" + dados[i].vlrVenda + "</td>";
        tabela += "     <td>" + dados[i].dscVeiculo + "</td>";
        tabela += "</tr>";
    }
    tabela += "</tbody>";
    tabela += "</table>";
    $("#tabelaVendasAbertas").html(tabela);
    $("#tabelaAbertas").DataTable();
    $("#vendasAbertasModal").modal("show");

    swal.close();
}