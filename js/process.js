/* =========================================================
   DAMTHONIX TECHNOLOGIES
   PROCESS PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mobileNavigation =
        document.getElementById("mobileNavigation");


    if (menuButton && mobileNavigation) {

        const setNavigationOpen = isOpen => {
            mobileNavigation.classList.toggle("show", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        };

        menuButton.addEventListener("click", () => {
            setNavigationOpen(!mobileNavigation.classList.contains("show"));
        });

        mobileNavigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => setNavigationOpen(false));
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && mobileNavigation.classList.contains("show")) {
                setNavigationOpen(false);
                menuButton.focus();
            }
        });

        document.addEventListener("pointerdown", event => {
            if (
                mobileNavigation.classList.contains("show") &&
                !mobileNavigation.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                setNavigationOpen(false);
            }
        });

    }


    /* =========================================
       SCROLL REVEAL
    ========================================== */

    const elements =
        document.querySelectorAll(
            ".process-step, " +
            ".workflow-card, " +
            ".showcase-image, " +
            ".process-cta"
        );


    elements.forEach(element => {

        element.classList.add("process-reveal");

    });


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "process-visible"
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


    elements.forEach(element => {

        observer.observe(element);

    });


    /* =========================================
       HERO PARALLAX
    ========================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (heroVisual) {

        document.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5) * 12;

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5) * 12;


                heroVisual.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }


    /* =========================================
       ACTIVE PROCESS STEP
    ========================================== */

    const processSteps =
        document.querySelectorAll(
            ".process-step"
        );


    const stepObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "step-active"
                        );

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    processSteps.forEach(step => {

        stepObserver.observe(step);

    });

});