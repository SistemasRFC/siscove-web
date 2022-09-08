$(document).ready(function () {
    $("#modalCadastroProdutos").load("cadCadastroProdutos.html")
    $("#btnNovo").click(function () {
        limparCampos();
        $("#usuarioModal").modal("show");
    })
});