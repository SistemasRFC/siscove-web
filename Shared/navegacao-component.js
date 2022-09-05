class NavBar extends HTMLElement {  
    connectedCallback() { 
        this.innerHTML = `
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="../MenuPrincipal/menuPrincipal.html">
                    <div class="sidebar-brand-icon">
                        <i class="fas fa-wrench"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3">SISCOVE</div>
                </a>

                <hr class="sidebar-divider my-0">
        
                <div id="menuNavegacao"></div>
        
            </ul>`;
    }
}

customElements.define('navegacao-component', NavBar);

function MontaMenu(menu) {
    // $("#usuSessao").html(menu[1][0].NME_USUARIO_COMPLETO);
    var DadosMenu = '';
    if (menu.length>0) {
        DadosMenu = menu;
        var html = "";
        for (var i in DadosMenu) {
            if (DadosMenu[i].codMenuPaiW == 0) {
                html += "<li class='nav-item'>"
                html += "    <a href='' class='nav-link collapsed' id='menu'" + DadosMenu[i].codMenuW + "' data-toggle='collapse' data-target='#collapse" + DadosMenu[i].codMenuW + "' aria-expanded='true' aria-controls='collapse" + DadosMenu[i].codMenuW + "'>";
                html += "        <i class='fa-solid fa-asterisk'></i>";
                html += "        <span><b>" + DadosMenu[i].dscMenuW + "</b></span>";
                html += "    </a>";
                html += "    <div id='collapse" + DadosMenu[i].codMenuW + "' class='collapse mx-1' aria-labelledby='heading" + DadosMenu[i].codMenuW + "' data-parent='#accordionSidebar'>";
                html += "        <div class='bg-white py-2 collapse-inner'>";
                for (var j in DadosMenu) {
                    if (DadosMenu[j].codMenuPaiW == DadosMenu[i].codMenuW) {
                        html += "   <a class='collapse-item px-1' href='/siscove" + DadosMenu[j].nmeController + "' style='white-space: pre-wrap;'><b>" + DadosMenu[j].dscMenuW + "</b></a>";
                    }
                }
                html += "        </div>";
                html += "    </div>";
                html += "</li>";
            }
        }

        $('#menuNavegacao').html(html);
    }
}

$(document).ready(function(){
    ExecutaAjax('GET', '/menu/listar/ativos', '', MontaMenu);
});
