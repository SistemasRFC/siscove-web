var PATH_RESOURCES = '';
var API = 'http://localhost:8080';
var PATH_RAIZ = 'http://localhost/siscove-web/';
//var PATH_RAIZ = 'http://104.131.106.165/sago/';
var ALIAS = 'siscove/';

function CriarSelect(nmeCombo, arrDados, valor, disabled) {
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

function ExecutaAjax(tipo, url, Parametros, Callback, MensagemAguarde, MensagemRetorno) {
    if (MensagemAguarde != undefined) {
        swal({
            title: MensagemAguarde,
            imageUrl: PATH_RAIZ + "Resources/images/preload.gif",
            showConfirmButton: false
        });
    }
    $.ajax({
        type: tipo,
        url: API + url,
        data: Parametros,
        beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            if (data.retorno){
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
                    Callback(data.objeto);
                }
            } else {
                swal("Aviso!", data.mensagem, "error"); 
            }
        },
        error: function(err) {
            console.log(err);
            swal("Erro!", "Não foi possível concluir a requisição", "error"); 
        }
    });
}

// function ExecutaDispatchUpload(Controller, Method, Parametros, Callback, MensagemAguarde, MensagemRetorno) {
//     if (MensagemAguarde != undefined) {
//         swal({
//             title: MensagemAguarde,
//             imageUrl: PATH_RAIZ + "Resources/images/preload.gif",
//             showConfirmButton: false
//         });
//     }
//     $.ajax({
//         url: PATH_RAIZ + 'Dispatch.php?controller=' + Controller + '&method=' + Method,
//         type: 'POST',
//         // Form data
//         data: Parametros,
//         //Options to tell JQuery not to process data or worry about content-type
//         cache: false,
//         contentType: false,
//         processData: false,
//         success: function (data) {
//             data = eval('(' + data + ')');
//             if (data[0] == true) {
//                 if (MensagemRetorno != undefined) {
//                     $(".jquery-waiting-base-container").fadeOut({ modo: "fast" });
//                     swal({
//                         title: "Sucesso!",
//                         text: MensagemRetorno,
//                         showConfirmButton: false,
//                         type: "success"
//                     });
//                     setTimeout(function () {
//                         swal.close();
//                     }, 2000);
//                 }
//                 if (Callback != undefined) {
//                     Callback(data);
//                 }
//             } else {
//                 $(".jquery-waiting-base-container").fadeOut({ modo: "fast" });
//                 swal({
//                     title: "Erro!",
//                     text: "Erro ao fazer upload do arquivo!",
//                     type: "error",
//                     confirmButtonText: "Fechar"
//                 });
//             }
//         }
//     });
// }

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
                            return number_format(value) + ' Pontos';
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
                        return datasetLabel + number_format(tooltipItem.yLabel, 1, ',', '.') + ' Pontos';
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
                return datasetLabel + number_format(tooltipItem.yLabel, 1, ',', '.') + ' Pontos';
              }
            }
          }
        }
      });      
}