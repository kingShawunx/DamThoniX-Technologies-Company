/* =========================================================
   DAMTHONIX TECHNOLOGIES
   ABOUT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (menuToggle && mobileMenu) {

        const setMenu = isOpen => {
            mobileMenu.classList.toggle("show", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        };

        menuToggle.addEventListener("click", () => {
            setMenu(!mobileMenu.classList.contains("show"));
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => setMenu(false));
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && mobileMenu.classList.contains("show")) {
                setMenu(false);
                menuToggle.focus();
            }
        });

        document.addEventListener("pointerdown", event => {
            if (
                mobileMenu.classList.contains("show") &&
                !mobileMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                setMenu(false);
            }
        });

    }


    /* =========================================
       HERO ORBIT PARALLAX
    ========================================== */

    const orbit =
        document.querySelector(".about-orbit");


    if (orbit) {

        document.addEventListener("mousemove", event => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 12;


            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 12;


            orbit.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }


    /* =========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".stat-card, " +
            ".mission-card, " +
            ".value-card, " +
            ".capability-item, " +
            ".about-cta"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal-item");

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* =========================================
       CAPABILITY HOVER EFFECT
    ========================================== */

    const capabilityItems =
        document.querySelectorAll(
            ".capability-item"
        );


    capabilityItems.forEach(item => {

        item.addEventListener(
            "mouseenter",
            () => {

                item.style.setProperty(
                    "--hover-x",
                    "10px"
                );

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                item.style.setProperty(
                    "--hover-x",
                    "0px"
                );

            }
        );

    });

});
