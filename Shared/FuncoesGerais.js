function CarregaMenu() {
    ExecutaDispatch('MenuPrincipal', 'CarregaMenuNew', '', MontaMenu);
}

function MontaMenu(menu) {
    $("#usuSessao").html(menu[1][0].NME_USUARIO_COMPLETO);
    var DadosMenu = '';
    if (menu[0]) {
        DadosMenu = menu[1];
        var html = "";
        for (var i in DadosMenu) {
            if (DadosMenu[i].COD_MENU_PAI_W == 0) {
                html += "<li class='nav-item'>"
                html += "    <a href='' class='nav-link collapsed' id='menu'" + DadosMenu[i].COD_MENU_W + "' data-toggle='collapse' data-target='#collapse" + DadosMenu[i].COD_MENU_W + "' aria-expanded='true' aria-controls='collapse" + DadosMenu[i].COD_MENU_W + "'>";
                html += "        <i class='far fa-circle'></i>";
                html += "        <span><b>" + DadosMenu[i].DSC_MENU_W + "</b></span>";
                html += "    </a>";
                html += "    <div id='collapse" + DadosMenu[i].COD_MENU_W + "' class='collapse' aria-labelledby='heading" + DadosMenu[i].COD_MENU_W + "' data-parent='#accordionSidebar'>";
                html += "        <div class='bg-white py-2 collapse-inner rounded'>";
                for (var j in DadosMenu) {
                    if (DadosMenu[j].COD_MENU_PAI_W == DadosMenu[i].COD_MENU_W) {
                        html += "   <a class='collapse-item pl-1 pr-1' href='" + PATH_RAIZ + "Dispatch.php?controller=" + DadosMenu[j].NME_CONTROLLER + "&method=" + DadosMenu[j].NME_METHOD + "' style='white-space: pre-wrap;'>" + DadosMenu[j].DSC_MENU_W + "</a>";
                    }
                }
                html += "        </div>";
                html += "    </div>";
                html += "</li>";
            }
        }

        $('#CriaNovoMenu').html(html);
    }
}

function CriarDivAutoComplete(nmeInput, url, method, dataFields, displayMember, valueMember, callback, width) {
    if ($("#divAutoComplete").length) {
        $("#divAutoComplete").jqxWindow("destroy");
    }
    $("#teste").html("");
    $("#teste").html('<div id="divAutoComplete"><div id="windowHeader" style="display: none;"></div><div style="overflow: hidden;" id="windowContent"><div id="listaPesquisa"></div></div> ');
    var largura = $("#" + nmeInput).width();
    if (width != undefined) {
        largura = width;
    }
    $("#divAutoComplete").jqxWindow({
        height: 250,
        width: largura,
        showCloseButton: false,
        maxWidth: 1200,
        position: { x: $("#" + nmeInput).offset().left, y: $("#" + nmeInput).offset().top + 25 },
        animationType: 'fade',
        showAnimationDuration: 500,
        closeAnimationDuration: 500,
        theme: 'darkcyan',
        isModal: false,
        autoOpen: false
    });
    $("#divAutoComplete").jqxWindow("open");
    var dados = dataFields.split('|');
    var lista = new Array();
    for (i = 0; i < dados.length; i++) {
        var data = new Object();
        var campos = dados[i].split(';');
        data.name = campos[1];
        lista.push(data);
    }
    var url = url;
    var source =
    {
        datatype: "json",
        datafields: lista,
        type: "POST",
        id: valueMember,
        url: url,
        data:
        {
            method: method,
            term: $("#" + nmeInput).val()
        }

    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    // Create a jqxListBox
    $("#listaPesquisa").jqxListBox({
        source: dataAdapter,
        displayMember: displayMember,
        valueMember: valueMember,
        width: largura - 5,
        height: 240
    });
    $("#listaPesquisa").on('keyup', function (event) {
        if (event.keyCode == 13) {
            SelecionaItem($("#listaPesquisa").jqxListBox('getSelectedItem'), dataAdapter, dataFields, callback);
        }
    });
    $("#listaPesquisa").on('select', function (event) {

        if (event.args.type == 'mouse') {
            SelecionaItem(event.args.item, dataAdapter, dataFields, callback);
        }
    });
}

function SelecionaItem(event, dataAdapter, dataFields, callback) {
    var item = event;
    if (item) {
        var x = []
        $.each(dataAdapter.records, function (i, n) {
            x.push(n);
        });
        for (j = 0; j < x.length; j++) {
            var dados = dataFields.split('|');
            for (i = 0; i < dados.length; i++) {
                if (item.originalItem.id == x[j]['id']) {

                    var campos = dados[i].split(';');
                    if (campos[0] != '') {
                        $("#" + campos[0]).val(x[j][campos[1]]);
                        if ($("#divAutoComplete").length) {
                            $("#divAutoComplete").jqxWindow("destroy");
                        }
                    }
                }
            }
        }
        if (callback != null) {
            eval(callback);
        }
    }
}

function CriarSelectPuro(nmeCombo, arrDados, valor, disabled) {
    if (disabled == undefined) {
        disabled = false;
    }
    $("#td" + nmeCombo).html('');
    if (disabled == true) {
        var select = '<select id="' + nmeCombo + '" disabled class="persist form-control">';
    } else {
        var select = '<select id="' + nmeCombo + '" class="persist form-control">';
    }
    for (i = 0; i < arrDados[1].length; i++) {
        if (arrDados[1][i]['ID'] == valor) {
            select += '<option value="' + arrDados[1][i]['ID'] + '" selected>' + arrDados[1][i]['DSC'] + '</option>';
        } else {
            select += '<option value="' + arrDados[1][i]['ID'] + '">' + arrDados[1][i]['DSC'] + '</option>';
        }
    }
    select += '</select>';
    $("#td" + nmeCombo).html(select);
}

function CriarComboDispatch(nmeCombo, arrDados, valor) {
    $("#td" + nmeCombo).html('');
    var select = '<select id="' + nmeCombo + '" class="persist input" style="background-color: white;">';
    for (i = 0; i < arrDados[1].length; i++) {
        if (arrDados[1][i]['ID'] == valor) {
            select += '<option value="' + arrDados[1][i]['ID'] + '" selected>' + arrDados[1][i]['DSC'] + '</option>';
        } else {
            select += '<option value="' + arrDados[1][i]['ID'] + '">' + arrDados[1][i]['DSC'] + '</option>';
        }
    }
    select += '</select>';
    $("#td" + nmeCombo).html(select);
    $("#" + nmeCombo).jqxDropDownList({ dropDownHeight: '150px' });
}

function CriarComboDispatchComTamanho(nmeCombo, arrDados, valor, tamanho, disabled) {
    if (disabled == undefined) {
        disabled = false;
    }
    $("#td" + nmeCombo).html('');
    var select = '<select id="' + nmeCombo + '" class="persist input" style="background-color: white;">';
    for (i = 0; i < arrDados[1].length; i++) {
        if (arrDados[1][i]['ID'] == valor) {
            select += '<option value="' + arrDados[1][i]['ID'] + '" selected>' + arrDados[1][i]['DSC'] + '</option>';
        } else {
            select += '<option value="' + arrDados[1][i]['ID'] + '">' + arrDados[1][i]['DSC'] + '</option>';
        }
    }
    select += '</select>';
    $("#td" + nmeCombo).html(select);
    $("#" + nmeCombo).jqxDropDownList({ dropDownHeight: tamanho + 'px', width: tamanho + 'px', disabled: disabled });
}

function ExecutaDispatch(Controller, Method, Parametros, Callback, MensagemAguarde, MensagemRetorno) {
    if (MensagemAguarde != undefined) {
        swal({
            title: MensagemAguarde,
            imageUrl: PATH_RAIZ + "Resources/images/preload.gif",
            showConfirmButton: false
        });
    }
    var obj = new Object();
    Object.defineProperty(obj, 'method', {
        __proto__: null,
        enumerable: true,
        configurable: true,
        value: Method
    });
    Object.defineProperty(obj, 'controller', {
        __proto__: null,
        enumerable: true,
        configurable: true,
        value: Controller
    });
    if (Parametros != undefined) {
        var dados = Parametros.split('|');
        for (i = 0; i < dados.length; i++) {
            var campos = dados[i].split(';');
            Object.defineProperty(obj, campos[0], {
                __proto__: null,
                enumerable: true,
                configurable: true,
                value: campos[1]
            });
        }
    }
    $.post(PATH_RAIZ + "Dispatch.php",
        obj,
        function (retorno) {
            retorno = eval('(' + retorno + ')');
            if (retorno[0] == true) {
                if (MensagemRetorno != undefined) {
                    $(".jquery-waiting-base-container").fadeOut({ modo: "fast" });
                    swal({
                        title: "Sucesso!",
                        text: MensagemRetorno,
                        showConfirmButton: false,
                        type: "success"
                    });
                    setTimeout(function () {
                        swal.close();
                    }, 2000);
                }
                if (Callback != undefined) {
                    Callback(retorno);
                }
            } else {
                $(".jquery-waiting-base-container").fadeOut({ modo: "fast" });
                swal({
                    title: "Erro ao executar!",
                    text: "Erro: " + retorno[1],
                    type: "error",
                    confirmButtonText: "Fechar"
                });
            }
        }
    );
}

function ExecutaDispatchUpload(Controller, Method, Parametros, Callback, MensagemAguarde, MensagemRetorno) {
    if (MensagemAguarde != undefined) {
        swal({
            title: MensagemAguarde,
            imageUrl: PATH_RAIZ + "Resources/images/preload.gif",
            showConfirmButton: false
        });
    }
    $.ajax({
        url: PATH_RAIZ + 'Dispatch.php?controller=' + Controller + '&method=' + Method,
        type: 'POST',
        // Form data
        data: Parametros,
        //Options to tell JQuery not to process data or worry about content-type
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            data = eval('(' + data + ')');
            if (data[0] == true) {
                if (MensagemRetorno != undefined) {
                    $(".jquery-waiting-base-container").fadeOut({ modo: "fast" });
                    swal({
                        title: "Sucesso!",
                        text: MensagemRetorno,
                        showConfirmButton: false,
                        type: "success"
                    });
                    setTimeout(function () {
                        swal.close();
                    }, 2000);
                }
                if (Callback != undefined) {
                    Callback(data);
                }
            } else {
                $(".jquery-waiting-base-container").fadeOut({ modo: "fast" });
                swal({
                    title: "Erro!",
                    text: "Erro ao fazer upload do arquivo!",
                    type: "error",
                    confirmButtonText: "Fechar"
                });
            }
        }
    });
}



function ExecutaDispatchValor(Controller, Method, Parametros, Callback, Valor, Disabled, MensagemAguarde, MensagemRetorno) {
    if (MensagemAguarde != undefined) {
        swal({
            title: MensagemAguarde,
            imageUrl: PATH_RAIZ + "Resources/images/preload.gif",
            showConfirmButton: false
        });
    }
    var obj = new Object();
    Object.defineProperty(obj, 'method', {
        __proto__: null,
        enumerable: true,
        configurable: true,
        value: Method
    });
    Object.defineProperty(obj, 'controller', {
        __proto__: null,
        enumerable: true,
        configurable: true,
        value: Controller
    });
    if (Parametros != undefined) {
        var dados = Parametros.split('|');
        for (i = 0; i < dados.length; i++) {
            var campos = dados[i].split(';');
            Object.defineProperty(obj, campos[0], {
                __proto__: null,
                enumerable: true,
                configurable: true,
                value: campos[1]
            });
        }
    }
    $.post(PATH_RAIZ + 'Dispatch.php',
        obj,
        function (retorno) {
            retorno = eval('(' + retorno + ')');
            if (retorno[0] == true) {
                if (MensagemRetorno != undefined) {
                    $(".jquery-waiting-base-container").fadeOut({ modo: "fast" });
                    swal({
                        title: "Sucesso!",
                        text: MensagemRetorno,
                        showConfirmButton: false,
                        type: "success"
                    });
                    setTimeout(function () {
                        swal.close();
                    }, 2000);
                }
                if (Callback != undefined) {
                    Callback(retorno, Valor, Disabled);
                }
            } else {
                $(".jquery-waiting-base-container").fadeOut({ modo: "fast" });
                swal({
                    title: "Erro ao executar!",
                    text: "Erro: " + retorno[1],
                    type: "error",
                    confirmButtonText: "Fechar"
                });
            }
        }
    );
}

function retornaParametros() {
    var name;
    var value;
    var retorno = '';
    $(".persist").each(function (index) {
        name = $(this).prop('id');
        switch ($(this).attr('type')) {
            case 'checkbox':
                if ($(this).is(":checked")) {
                    var value = 'S';
                } else {
                    var value = 'N';
                }
                break;

            default:
                value = $(this).val();
                break;
        }
        retorno += name + ';' + value + '|';
    });
    return retorno;
}

/**
 * 
 * @param {type} arrCampos
 * @param {type} valorPadrao (Passar o nome do campo concatenado com ';' e após o tipo do campo e depois '|' ex.:indAtivo;B|
 * @returns {undefined}
 */
function preencheCamposForm(arrCampos, valorPadrao) {
    var entrou = false;
    for (var k in arrCampos) {
        if (typeof arrCampos[k] !== 'function') {
            var LK = k.toLowerCase();
            var ret = LK.split('_');
            var campo = '';
            for (var i = 0; i < ret.length; i++) {
                if (i > 0) {
                    campo += ret[i].substring(0, 1).toUpperCase() + ret[i].substring(1, ret[i].lenght);
                } else {
                    campo = ret[i];
                }
            }
            if (valorPadrao != undefined) {
                var valores = valorPadrao.split('|');
                for (i = 0; i < valores.length; i++) {
                    var tipo = valores[i].split(';');
                    var entrou = false;
                    if (tipo[0] == campo) {
                        switch (tipo[1]) {
                            case 'B':
                                if (arrCampos[k] == 'S') {
                                    $("#" + campo).prop('checked', true);
                                } else {
                                    $("#" + campo).prop('checked', false);
                                }
                                break;
                            default:
                                $("#" + campo).val(arrCampos[k]);
                                break;
                        }
                        entrou = true;
                    }
                }
            }
            if (!entrou) {
                $("#" + campo).val(arrCampos[k]);
            }
        }
    }
}

function LimparCampos() {
    $(".persist").each(function (index) {
        switch ($(this).attr('type')) {
            case 'radio':
            case 'checkbox':
                $(this).prop("checked", false);
                break;
            case 'file':
                $(this).replaceWith($(this).val('').clone(true));
                break;
            case 'text':
            case 'hidden':
                $(this).val('');
                break;
            default:
                $(this).val('0');
                break;
        }
    });
}


function RedirecionaController(Controller, Method) {
    $(location).attr('href', PATH_RAIZ + 'Dispatch.php?controller=' + Controller + '&method=' + Method);
}

function Download(Controller, Method, Parametros) {
    var obj = new Object();
    Object.defineProperty(obj, 'method', {
        __proto__: null,
        enumerable: true,
        configurable: true,
        value: Method
    });
    Object.defineProperty(obj, 'controller', {
        __proto__: null,
        enumerable: true,
        configurable: true,
        value: Controller
    });
    if (Parametros != undefined) {
        var dados = Parametros.split('|');
        for (i = 0; i < dados.length; i++) {
            var campos = dados[i].split(';');
            Object.defineProperty(obj, campos[0], {
                __proto__: null,
                enumerable: true,
                configurable: true,
                value: campos[1]
            });
        }
    }
    $.post(PATH_RAIZ + "Dispatch.php",
        obj,
        function (retorno) {
            retorno = eval('(' + retorno + ')');
            if (retorno[0] == true) {
                window.location.href = PATH_RAIZ + '/download.php?nomeArquivo=' + retorno[1]['nomeArquivo'] + '&pasta=' + retorno[1]['pasta'];
            } else {
                $(".jquery-waiting-base-container").fadeOut({ modo: "fast" });
                swal({
                    title: "Erro ao executar!",
                    text: "Erro: " + retorno[1],
                    type: "error",
                    confirmButtonText: "Fechar"
                });
            }
        }
    );
}

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function CriarGraficoBarras(nmeCampo, dados) {

    var campo = document.getElementById(""+nmeCampo+"");
    var valores = [];
    for (var i in dados) {
        valores.push(dados[i].QTD_TOTAL_PONTOS);
    }

    new Chart(campo, {
        type: 'bar',
        data: {
            labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            datasets: [{
                label: "Pontuação: ",
                backgroundColor: "#1cc88a",
                hoverBackgroundColor: "#17a673",
                borderColor: "#eaecf4",
                data: valores,
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'month'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 6
                    },
                    maxBarThickness: 25,
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 1000,
                        maxTicksLimit: 10,
                        padding: 5,
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return number_format(value) + ' USTIBB';
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
                callbacks: {
                    label: function (tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + number_format(tooltipItem.yLabel, 1, ',', '.') + ' USTIBB';
                    }
                }
            },
        }
    });
}

function CriarGraficoArea(nmeCampo, dados) {
    var campo = document.getElementById(""+nmeCampo+"");
    var valores = [];
    var labelMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    for (var i in labelMeses) {
        var ref = parseInt(i) + parseInt(1);
        var valMesAtual = dados.filter(elm => elm.NRO_MES_REFERENCIA == ref);
        if(valMesAtual.length > 0) {
            valores.push(valMesAtual[0].QTD_TOTAL_PONTOS);
        } else {
            valores.push(0);
        }
    }
    new Chart(campo, {
        type: 'line',
        data: {
          labels: labelMeses,
          datasets: [{
            label: "Pontuação: ",
            lineTension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: valores,
          }],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          scales: {
            xAxes: [{
              time: {
                unit: 'date'
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                maxTicksLimit: 5,
                padding: 10,
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                  return  number_format(value) + ' USTIBB';
                }
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },
          legend: {
            display: false
          },
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
              label: function(tooltipItem, chart) {
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + number_format(tooltipItem.yLabel, 1, ',', '.') + ' USTIBB';
              }
            }
          }
        }
      });      
}