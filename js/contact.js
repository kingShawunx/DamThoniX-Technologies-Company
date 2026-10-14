/* =========================================================
   DAMTHONIX TECHNOLOGIES
   CONTACT PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {

        const setMenu = (open) => {
            mobileMenu.classList.toggle("show", open);
            menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
            menuToggle.setAttribute(
                "aria-label",
                open ? "Close navigation menu" : "Open navigation menu"
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

        document.addEventListener("click", event => {
            if (!mobileMenu.classList.contains("show")) return;
            if (mobileMenu.contains(event.target)) return;
            if (menuToggle.contains(event.target)) return;
            setMenu(false);
        });

    }


    /* =========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".quick-card, " +
        ".panel, " +
        ".info-block, " +
        ".social-card, " +
        ".social-link, " +
        ".contact-cta"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal-item");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach((entry, index) => {

                    if (!entry.isIntersecting) return;

                    const delay = Math.min(index, 5) * 70;

                    window.setTimeout(() => {
                        entry.target.classList.add("revealed");
                    }, delay);

                    revealObserver.unobserve(entry.target);

                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        /* no observer support: never leave content hidden */
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    /* =========================================
       FORM VALIDATION
    ========================================== */

    const form = document.getElementById("contactForm");

    if (!form) return;

    const statusBox = document.getElementById("formStatus");
    const statusText = document.getElementById("formStatusText");
    const submitButton = document.getElementById("submitButton");

    const CONTACT_EMAIL = "animashawunridwan3@gmail.com";
    const WHATSAPP = "2349162892139";

    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

    const RULES = {
        "cf-name": value => value.trim().length >= 2,
        "cf-email": value => EMAIL_PATTERN.test(value.trim()),
        "cf-phone": value => value.trim() === "" || PHONE_PATTERN.test(value.trim()),
        "cf-message": value => value.trim().length >= 10
    };

    const fieldOf = input => input.closest(".field");

    /* scrollIntoView is missing in some embedded/older engines and would
       throw, which would abort the rest of the submit handler and leave
       the submit button stuck in its disabled state. */
    const scrollTo = element => {
        if (element && typeof element.scrollIntoView === "function") {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    };

    const setError = (input, hasError) => {
        const field = fieldOf(input);
        if (field) field.classList.toggle("has-error", hasError);
        input.setAttribute("aria-invalid", hasError ? "true" : "false");
    };

    const validateField = input => {
        const rule = RULES[input.id];
        if (!rule) return true;

        const ok = rule(input.value);
        setError(input, !ok);
        return ok;
    };

    /* validate on blur, then live-correct once a field is already flagged */
    Object.keys(RULES).forEach(id => {

        const input = document.getElementById(id);
        if (!input) return;

        input.addEventListener("blur", () => validateField(input));

        input.addEventListener("input", () => {
            const field = fieldOf(input);
            if (field && field.classList.contains("has-error")) {
                validateField(input);
            }
        });

    });

    form.addEventListener("submit", event => {

        event.preventDefault();

        let firstInvalid = null;

        Object.keys(RULES).forEach(id => {

            const input = document.getElementById(id);
            if (!input) return;

            const ok = validateField(input);
            if (!ok && !firstInvalid) firstInvalid = input;

        });

        if (firstInvalid) {
            firstInvalid.focus();
            scrollTo(firstInvalid);
            return;
        }

        const getValue = id => {
            const el = document.getElementById(id);
            return el ? el.value.trim() : "";
        };

        const name = getValue("cf-name");
        const email = getValue("cf-email");
        const phone = getValue("cf-phone");
        const service = document.getElementById("cf-service").value;
        const message = getValue("cf-message");

        const lines = [
            `Name: ${name}`,
            `Email: ${email}`,
            phone ? `Phone: ${phone}` : null,
            service ? `Service: ${service}` : null,
            "",
            message
        ].filter(line => line !== null);

        const body = lines.join("\n");
        const mailto =
            `mailto:${CONTACT_EMAIL}` +
            `?subject=${encodeURIComponent(`New project enquiry — ${name}`)}` +
            `&body=${encodeURIComponent(body)}`;

        const whatsappText = encodeURIComponent(
            `Hello DamThoniX Technologies, I'm ${name}.\n\n` +
            (service ? `I'm interested in: ${service}\n\n` : "") +
            `${message}`
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Preparing your message…";
        }

        /* There is no backend on a static site, so we hand the composed
           message to the visitor's mail client and offer WhatsApp as a
           direct alternative. Replace this block with a fetch() to your
           own endpoint or a form service when you have one. */
        window.setTimeout(() => {

            if (statusText) {
                statusText.innerHTML =
                    `Your email app should have opened with the message ready to send. ` +
                    `If it didn't, ` +
                    `<a href="${mailto}">click here</a> or ` +
                    `<a href="https://wa.me/${WHATSAPP}?text=${whatsappText}" ` +
                    `target="_blank" rel="noopener noreferrer">send it on WhatsApp</a>.`;
            }

            if (statusBox) {
                statusBox.classList.add("show");
                scrollTo(statusBox);
            }

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML =
                    'Send Message' +
                    '<svg class="button-icon" aria-hidden="true">' +
                    '<use href="#i-send"></use></svg>';
            }

            window.location.href = mailto;

        }, 400);

    });

});
