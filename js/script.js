/* =========================================
   HERO SCENE SLIDER
   GLOBAL -> BUILD -> GROW -> (loop)
   Single controller — no duplicate/conflicting logic.
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero");
    if (!hero) return;

    const scenes = Array.from(hero.querySelectorAll(".hero-scene"));
    const dots = Array.from(hero.querySelectorAll(".scene-dot"));
    const announcer = document.getElementById("heroSceneAnnouncer");
    const particleHost = document.getElementById("buildParticles");

    if (!scenes.length) return;

    const SCENE_NAMES = ["Global", "Build", "Grow"];
    const DURATION = 7000;
    /* matchMedia is absent in some embedded/older engines; treat that as
       "no preference" rather than letting the whole slider fail to start */
    const mq = query =>
        typeof window.matchMedia === "function"
            ? window.matchMedia(query)
            : { matches: false };

    const prefersReducedMotion = mq(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let current = 0;
    let timer = null;
    let paused = false;

    /* ---- build background particles once (CSS-driven, no rAF loop) ---- */
    function seedParticles() {
        if (!particleHost || prefersReducedMotion) return;
        const count = 14;
        for (let i = 0; i < count; i++) {
            const p = document.createElement("span");
            const size = (Math.random() * 3 + 2).toFixed(1);
            const left = (Math.random() * 100).toFixed(1);
            const dur = (Math.random() * 6 + 7).toFixed(1);
            const delay = (Math.random() * 9).toFixed(1);
            p.style.setProperty("--size", `${size}px`);
            p.style.left = `${left}%`;
            p.style.setProperty("--dur", `${dur}s`);
            p.style.setProperty("--delay", `${delay}s`);
            particleHost.appendChild(p);
        }
    }

    /* ---- go to a given scene index ---- */
    function goTo(index) {
        current = ((index % scenes.length) + scenes.length) % scenes.length;

        hero.setAttribute("data-scene", String(current));

        scenes.forEach((scene, i) => {
            scene.setAttribute("aria-hidden", i === current ? "false" : "true");
        });

        dots.forEach((dot, i) => {
            const active = i === current;
            dot.classList.toggle("is-active", active);
            dot.setAttribute("aria-selected", active ? "true" : "false");

            if (active) {
                // restart the progress-fill animation
                dot.classList.remove("is-active");
                // eslint-disable-next-line no-unused-expressions
                dot.offsetWidth; // force reflow
                dot.classList.add("is-active");
            }
        });

        if (announcer) {
            announcer.textContent = `Showing ${SCENE_NAMES[current]} scene`;
        }
    }

    function next() {
        goTo(current + 1);
    }

    function start() {
        stop();
        if (prefersReducedMotion) return; // manual navigation only
        timer = window.setInterval(next, DURATION);
    }

    function stop() {
        if (timer) {
            window.clearInterval(timer);
            timer = null;
        }
    }

    /* ---- dot navigation ---- */
    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const target = parseInt(dot.getAttribute("data-goto"), 10);
            if (Number.isNaN(target)) return;
            goTo(target);
            if (!paused) start();
        });
    });

    /* ---- pause on hover / keyboard focus (accessibility) ---- */
    hero.addEventListener("mouseenter", () => { paused = true; stop(); });
    hero.addEventListener("mouseleave", () => { paused = false; start(); });
    hero.addEventListener("focusin", () => { paused = true; stop(); });
    hero.addEventListener("focusout", () => { paused = false; start(); });

    /* ---- lightweight parallax on pointer move (rAF-throttled) ---- */
    if (!prefersReducedMotion && mq("(hover: hover)").matches) {
        let ticking = false;
        let mx = 0, my = 0;

        hero.addEventListener("mousemove", (e) => {
            const rect = hero.getBoundingClientRect();
            mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    hero.style.setProperty("--mx", mx.toFixed(3));
                    hero.style.setProperty("--my", my.toFixed(3));
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /* ---- init ---- */
    seedParticles();
    goTo(0);
    start();

});

/* =========================================================
   YOUR EXISTING DAMTHONIX HERO / SLIDER JAVASCRIPT
========================================================= */

// ...your current code here...


// =========================================================
// SERVICES SECTION JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const serviceCards = document.querySelectorAll(".service-card");

    if (!serviceCards.length) {
        return;
    }

    const serviceObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const card = entry.target;
                const index = Array.from(serviceCards).indexOf(card);

                setTimeout(() => {
                    card.classList.add("service-visible");
                }, index * 100);

                observer.unobserve(card);
            });

        },
        {
            threshold: 0.15
        }
    );

    serviceCards.forEach((card) => {
        serviceObserver.observe(card);
    });


    serviceCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) * 2;

            card.style.transform =
                `translateY(-7px) perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0) perspective(800px) rotateX(0deg) rotateY(0deg)";
        });

    });


    const orb = document.querySelector(".services-orb");

    if (orb) {

        document.addEventListener("mousemove", (event) => {

            const x = (event.clientX / window.innerWidth - 0.5);
            const y = (event.clientY / window.innerHeight - 0.5);

            orb.style.transform =
                `translate(${x * 10}px, ${y * 10}px)`;
        });

    }

});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (!menuToggle || !mainNav) return;

    const setNavigationOpen = isOpen => {
        mainNav.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        if (!isOpen) {
            mainNav.querySelectorAll(".nav-dropdown").forEach(dropdown => {
                dropdown.classList.remove("open");
                dropdown.querySelector(".dropdown-btn")?.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        }
    };

    menuToggle.addEventListener("click", () => {
        setNavigationOpen(!mainNav.classList.contains("open"));
    });

    mainNav.querySelectorAll(".nav-dropdown").forEach(dropdown => {
        const dropdownButton = dropdown.querySelector(".dropdown-btn");
        if (!dropdownButton) return;

        dropdownButton.setAttribute("aria-expanded", "false");
        dropdownButton.addEventListener("click", () => {
            const isOpen = !dropdown.classList.contains("open");
            dropdown.classList.toggle("open", isOpen);
            dropdownButton.setAttribute("aria-expanded", String(isOpen));
        });
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setNavigationOpen(false));
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && mainNav.classList.contains("open")) {
            setNavigationOpen(false);
            menuToggle.focus();
        }
    });

    document.addEventListener("pointerdown", event => {
        if (
            mainNav.classList.contains("open") &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            setNavigationOpen(false);
        }
    });
});