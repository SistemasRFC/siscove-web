class Header extends HTMLElement {  
    connectedCallback() { 
        this.innerHTML = `
        <meta charset="UTF-8" />
        <script src="./Resources/jquery/jquery-3.6.0.min.js"></script>
        <script src="./Resources/swal/sweetalert.min.js"></script>
        <script src="./Resources/bootstrap-admin/vendor/jquery/jquery.min.js"></script>
        <script src="./Resources/bootstrap-admin/vendor/jquery-easing/jquery.easing.min.js"></script>
        <!-- JS -->
        <script src="./Resources/bootstrap-admin/js/sb-admin-2.min.js"></script>
        <!-- CSS -->
        <link rel="stylesheet" href="./Resources/bootstrap-admin/css/sb-admin-2.min.css"></link>
        <!-- bootstrap -->
        <script src="./Resources/bootstrap-admin/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="./Resources/bootstrap-admin/vendor/bootstrap/js/bootstrap.min.js"></script>
        <!-- fontawesome-free -->
        <link href="./Resources/bootstrap-admin/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
        <!-- css -->
        <link href="./Resources/bootstrap-admin/css/style.css" rel="stylesheet" type="text/css">
        <script src="./Resources/swal/dist/sweetalert.min.js"></script>
        <link rel="stylesheet" type="text/css" href="./Resources/swal/dist/sweetalert.css">`;
    }
}

customElements.define('header-component', Header);
