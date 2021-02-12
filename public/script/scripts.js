/*!
    * Start Bootstrap - SB Admin v6.0.2 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
(function($) {
    "use strict";

    // Add active state to sidbar nav links
    const path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        if(this.href === path)
            $(this).addClass("active");
    });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", e=>{
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

document.addEventListener("DOMContentLoaded", function() {
    //Navbar sinistra
    $.get("/leftnavbar/", function(data) {
        $("#layoutSidenav_nav").html(data);
    });
    //Navbar sopra
    $.get("/navbarsopra/",function(data) {
       $("body").html(data+$("body").html());
    });
    //Login as
    $.get("/loginAs/", function(data) {
        const user = data;
        if(user) {
            //Logged in
            {
                const div = $("<div></div>").addClass("sb-sidenav-footer");
                const loggedIn = $("<div></div>").addClass("small").text(`Sei loggato come ${user}`);
                div.append(loggedIn);
                $("#sidenavAccordion").append(div);
            }
            //Logout
            {
                const li = $("<li></li>");
                li.addClass("nav-item");
                const link = `<li class="nav-item"><a href="/logout" class="nav-link">Logout</a></li>`;
                $("#navLogout").append(link);
            }
        } else {
            //Logged in
            {
                console.log("dentro");
                const div = $("<div></div>");
                div.addClass("sb-sidenav-footer");
                const link = $("<a></a>");
                link.attr("href", "/login");
                link.text("Login");
                div.append(link);
                $("#sidenavAccordion").append(div);
            }

            {
                const niente = 10;
            }
        }
    });
});