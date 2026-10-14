/* =========================================================
   DAMTHONIX TECHNOLOGIES
   SERVICES PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* =====================================================
       SERVICE CARD SCROLL ANIMATION
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");


    if (serviceCards.length > 0) {

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            serviceCards.forEach(function (card) {
                card.classList.add("visible");
            });
        } else {
            const serviceObserver =
                new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const card = entry.target;

                        const cardIndex =
                            Array.from(serviceCards)
                                .indexOf(card);


                        setTimeout(function () {

                            card.classList.add("visible");

                        }, cardIndex * 100);


                        observer.unobserve(card);

                    });

                },
                {
                    threshold: 0.15
                }
                );


            serviceCards.forEach(function (card) {

                serviceObserver.observe(card);

            });
        }

    }


    /* =====================================================
       SERVICE CARD 3D HOVER
    ===================================================== */

    if (!prefersReducedMotion && canHover) {
        serviceCards.forEach(function (card) {


        card.addEventListener(
            "pointermove",
            function (event) {

                if (window.innerWidth <= 700) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -2;


                const rotateY =
                    ((x - centerX) / centerX) * 2;


                card.style.transform =
                    `translateY(-8px)
                     perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "translateY(0) perspective(900px) rotateX(0deg) rotateY(0deg)";

            }
        );

        });
    }


    /* =====================================================
       HERO VISUAL PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".services-hero-visual");


    if (heroVisual && !prefersReducedMotion && canHover) {

        document.addEventListener(
            "pointermove",
            function (event) {

                if (window.innerWidth <= 700) {
                    return;
                }


                const mouseX =
                    (event.clientX /
                        window.innerWidth) - 0.5;


                const mouseY =
                    (event.clientY /
                        window.innerHeight) - 0.5;


                const moveX =
                    mouseX * 18;


                const moveY =
                    mouseY * 18;


                heroVisual.style.marginLeft =
                    `${moveX}px`;


                heroVisual.style.marginTop =
                    `${moveY}px`;

            }
        );

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuButton =
        document.getElementById(
            "mobileMenuButton"
        );


    const mobileNavigation =
        document.getElementById(
            "mobileNavigation"
        );


    if (menuButton && mobileNavigation) {

        const setNavigationOpen = function (isOpen) {
            mobileNavigation.classList.toggle("open", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        };

        menuButton.addEventListener(
            "click",
            function () {
                setNavigationOpen(
                    !mobileNavigation.classList.contains("open")
                );
            }
        );


        const mobileLinks =
            mobileNavigation.querySelectorAll("a");


        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {
                    setNavigationOpen(false);
                }
            );

        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && mobileNavigation.classList.contains("open")) {
                setNavigationOpen(false);
                menuButton.focus();
            }
        });

        document.addEventListener("pointerdown", function (event) {
            if (
                mobileNavigation.classList.contains("open") &&
                !mobileNavigation.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                setNavigationOpen(false);
            }
        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const serviceButtons =
        document.querySelectorAll(
            'a[href="#all-services"]'
        );


    serviceButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const target =
                    document.querySelector(
                        "#all-services"
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });


});
