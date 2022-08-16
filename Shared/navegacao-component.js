class NavBar extends HTMLElement {  
    connectedCallback() { 
        this.innerHTML = `
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="../../..<?=ALIAS;?>View/MenuPrincipal/MenuPrincipal.html">
                <div class="sidebar-brand-icon">
                    <i class="fas fa-wrench"></i>
                </div>
                <div class="sidebar-brand-text mx-3">SISCOVE</div>
            </a>

            <hr class="sidebar-divider my-0">
    
            <div id="MontarMenu"></div>
    
        </ul>`;
    }
}

customElements.define('navegacao-component', NavBar);

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

$(document).ready(function(){
    // ExecutaDispatch('MenuPrincipal', 'VerificaSessao', 'verificaPermissao;N|', VerificaSessao);
});
