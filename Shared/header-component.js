class Header extends HTMLElement {  
    connectedCallback() { 
        this.innerHTML = `
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    
            <h4 class="color-primary-dark">Sistema de Controle de Vendas</h4>

            <ul class="navbar-nav ml-auto">
                <div class="topbar-divider d-none d-sm-block"></div>
    
                <li class="pt-2">
                    <span class="mr-2 d-none d-lg-inline text-gray-700" id="usuSessao"></span>
                    <a href="../index.php" title="Sair">
                        <i class="icon fas fa-sign-out-alt text-gray-500"></i>
                    </a>
                </li>
            </ul>
        </nav>`;
    }
}

customElements.define('header-component', Header);
