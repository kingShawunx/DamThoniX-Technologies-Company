/* =========================================================
   DAMTHONIX TECHNOLOGIES
   PORTFOLIO PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* =========================================
       MOBILE MENU
    ========================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

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
       PORTFOLIO FILTER
    ========================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            /* Remove active state */
            filterButtons.forEach(btn => {
                const isActive = btn === button;
                btn.classList.toggle("active", isActive);
                btn.setAttribute("aria-pressed", String(isActive));
            });


            /* Filter projects */
            projectCards.forEach(card => {

                const category =
                    card.dataset.category;

                if (prefersReducedMotion) {
                    const isVisible = filter === "all" || category === filter;
                    card.style.display = isVisible ? "" : "none";
                    card.style.opacity = "";
                    card.style.transform = "";
                    return;
                }


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.style.display = "";

                    requestAnimationFrame(() => {
                        card.style.opacity = "1";
                        card.style.transform = "";
                    });

                } else {

                    card.style.opacity = "0";
                    card.style.transform = "scale(.96)";

                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);

                }

            });

        });

    });


    /* =========================================
       SCROLL REVEAL
    ========================================== */

    const revealItems =
        document.querySelectorAll(
            ".project-card, .section-heading, .pricing-card, .pricing-intro, .portfolio-cta"
        );


    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach(item => {
            item.classList.add("reveal-item", "revealed");
        });
    } else {
        const revealObserver =
            new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
            );


        revealItems.forEach(item => {

            item.classList.add("reveal-item");

            revealObserver.observe(item);

        });
    }


    /* =========================================
       MOUSE PARALLAX FOR HERO ORBIT
    ========================================== */

    const heroOrbit =
        document.querySelector(".hero-orbit");


    if (heroOrbit) {

        document.addEventListener("mousemove", event => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 10;

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 10;


            heroOrbit.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }

});