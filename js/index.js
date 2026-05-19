document.addEventListener("DOMContentLoaded", function() {

    /* =========================
       MENU MOBILE
       ========================= */
    var menuButton = document.querySelector(".site-header__menu-button");
    var navigation = document.querySelector("#site-navigation");
    var navigationLinks = document.querySelectorAll(".site-navigation__link");

    if (menuButton && navigation) {
        function closeMenu() {
            menuButton.setAttribute("aria-expanded", "false");
            navigation.classList.remove("is-open");
        }

        function toggleMenu() {
            var isExpanded = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!isExpanded));
            navigation.classList.toggle("is-open", !isExpanded);
            if (!isExpanded && navigationLinks.length > 0) {
                navigationLinks[0].focus();
            }
        }

        menuButton.addEventListener("click", toggleMenu);
        navigationLinks.forEach(function(link) {
            link.addEventListener("click", closeMenu);
        });
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") {
                closeMenu();
                menuButton.focus();
            }
        });
    }


    /* =========================
       DARK MODE
       ========================= */
    var themeButton = document.querySelector(".site-header__theme-button");
    var root = document.documentElement;

    if (themeButton) {
        function applyTheme(theme) {
            root.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
            themeButton.setAttribute("aria-label", theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
        }
        applyTheme(localStorage.getItem("theme") || "light");
        themeButton.addEventListener("click", function() {
            applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
        });
    }


    /* =========================
       HEADER SCROLL
       ========================= */
    var header = document.querySelector(".site-header");
    if (header) {
        function updateHeader() {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        }
        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }


    /* =========================
       STICKY CTA MOBILE
       ========================= */
    var stickyCta = document.getElementById("sticky-cta");
    var heroSection = document.getElementById("hero");
    var contactSection = document.getElementById("contacto");

    if (stickyCta && heroSection && contactSection) {
        stickyCta.removeAttribute("aria-hidden");

        function updateStickyCta() {
            var heroBottom = heroSection.getBoundingClientRect().bottom;
            var contactTop = contactSection.getBoundingClientRect().top;
            stickyCta.classList.toggle("is-visible", heroBottom < 0 && contactTop > window.innerHeight);
        }
        updateStickyCta();
        window.addEventListener("scroll", updateStickyCta, { passive: true });
    }


    /* =========================
       LOGO FALLBACK
       ========================= */
    document.querySelectorAll(".sobre-mi__logo-img").forEach(function(img) {
        img.addEventListener("error", function() {
            img.setAttribute("data-error", "true");
        });
    });


    /* =========================
       CAROUSEL CON NAVEGACIÓN POR TECLADO
       ========================= */
    var carousel = document.getElementById("resultados-carousel");
    var prevBtn = document.getElementById("carousel-prev");
    var nextBtn = document.getElementById("carousel-next");

    if (carousel && prevBtn && nextBtn) {
        var cards = carousel.querySelectorAll(".resultado-card");
        var cardWidth = 0;

        function getCardWidth() {
            if (cards.length > 0) {
                var rect = cards[0].getBoundingClientRect();
                var style = window.getComputedStyle(carousel);
                var gap = parseFloat(style.gap) || 24;
                return rect.width + gap;
            }
            return 360;
        }

        function updateNavButtons() {
            var scrollLeft = carousel.scrollLeft;
            var maxScroll = carousel.scrollWidth - carousel.clientWidth;
            prevBtn.disabled = scrollLeft <= 2;
            nextBtn.disabled = scrollLeft >= maxScroll - 2;
        }

        function scrollTo(direction) {
            cardWidth = getCardWidth();
            carousel.scrollBy({
                left: direction === "next" ? cardWidth : -cardWidth,
                behavior: "smooth"
            });
        }

        prevBtn.addEventListener("click", function() { scrollTo("prev"); });
        nextBtn.addEventListener("click", function() { scrollTo("next"); });

        /* Navegación por teclado: flechas izquierda/derecha cuando el carousel tiene foco */
        carousel.addEventListener("keydown", function(e) {
            if (e.key === "ArrowRight") {
                e.preventDefault();
                scrollTo("next");
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                scrollTo("prev");
            }
        });

        carousel.addEventListener("scroll", updateNavButtons, { passive: true });

        /* Estado inicial de botones */
        updateNavButtons();

        /* Recalcular tras resize */
        window.addEventListener("resize", function() {
            cardWidth = getCardWidth();
            updateNavButtons();
        }, { passive: true });
    }


    /* =========================
       SERVICE SWITCH
       ========================= */
    var serviceContent = {
        audit: {
            label: "Auditoría",
            hero: {
                title: "Tu sitio podría estar perdiendo clientes",
                description: "Detecto fricción, errores y oportunidades invisibles que afectan conversión, confianza y resultados.",
                primaryCta: "Solicitar diagnóstico →"
            },
            problem: {
                title: "Problemas frecuentes que frenan resultados",
                description: "Estas señales suelen generar dudas, fricción o abandono antes del contacto.",
                note: "Detectarlo a tiempo cambia decisiones, inversión y resultados.",
                cards: [
                    { title: "Tu propuesta no se entiende rápido", description: "Si la claridad falla en segundos, aumentan las dudas y baja la intención de contacto." },
                    { title: "Tu sitio genera dudas", description: "Cuando falta confianza visual o contenido claro, la persona compara y se va." },
                    { title: "Inviertes, pero no conviertes", description: "Puedes estar atrayendo visitas, pero perdiendo oportunidades por fricción invisible." },
                    { title: "Tu competencia parece más confiable", description: "Una mejor estructura, evidencia y jerarquía puede cambiar la percepción de valor." }
                ]
            },
            offer: {
                title: "Diagnóstico de tu sitio web",
                description: "Recibes una revisión clara, priorizada y explicada para saber qué corregir primero.",
                badge: "Auditoría",
                contextTitle: "Diagnóstico claro y accionable",
                contextDesc: "Ideal para negocios que necesitan entender qué está frenando resultados antes de invertir más.",
                delivery: "1 a 3 días hábiles",
                price: "$99.000",
                cta: "Solicitar diagnóstico →",
                cards: [
                    { title: "Revisión estructural", description: "Analizo contenido, jerarquía y recorrido para entender si la página guía bien la decisión." },
                    { title: "Detección de fricción", description: "Identifico puntos que generan dudas, abandono o pérdida de confianza antes del contacto." },
                    { title: "Oportunidades concretas", description: "Te muestro mejoras específicas para claridad, interacción y conversión con ejemplos reales." },
                    { title: "Plan priorizado", description: "Ordeno los hallazgos según impacto para que sepas exactamente qué corregir primero." }
                ],
                features: [
                    "Revisión estructural y de flujo de navegación completo.",
                    "Detección de puntos críticos de fricción y abandono.",
                    "Informe técnico con oportunidades de conversión.",
                    "Plan de acción priorizado según el impacto en el negocio."
                ]
            },
            results: {
                title: "Casos reales de mejora detectada",
                description: "Ejemplos de fricciones reales y mejoras posibles para aumentar claridad, confianza y contacto.",
                cta: "Solicitar revisión →",
                cards: null
            },
            contact: {
                title: "Hablemos de tu página",
                description: "Déjame el enlace de tu sitio y te digo si hay señales que estén afectando claridad, confianza o contacto.",
                cta: "Enviar solicitud →",
                blockLabel: "Primera revisión",
                blockText: "El primer contacto es para entender tu negocio y tu sitio. Tú decides si avanzamos."
            }
        },
        design: {
            label: "Diseño",
            hero: {
                title: "Diseño sitios web claros, modernos y confiables",
                description: "Construyo sitios web y productos digitales (apps/dashboards) con estructura y contenido orientado a comunicar mejor y facilitar el contacto.",
                primaryCta: "Solicitar diseño web →"
            },
            problem: {
                title: "Por qué tu sitio no representa tu negocio",
                description: "Un sitio mal estructurado afecta confianza, claridad y percepción de valor antes del primer contacto.",
                note: "Un sitio bien diseñado trabaja por ti las 24 horas.",
                cards: [
                    { title: "Tu sitio no representa el valor que entregas", description: "La imagen digital queda por debajo de lo que realmente ofreces." },
                    { title: "La información está desordenada", description: "Las personas no entienden qué haces, para quién trabajas o cómo contactarte." },
                    { title: "El diseño no guía la acción", description: "El sitio informa, pero no conduce hacia una decisión clara." },
                    { title: "La experiencia mobile no funciona bien", description: "Gran parte de la confianza se pierde cuando navegar desde celular es incómodo." }
                ],
            },
            offer: {
                title: "Diseño para sitios web",
                description: "Diseño una experiencia digital clara, responsive y alineada a tus objetivos (aplica a sitios corporativos, plataformas y webapps).",
                badge: "Diseño",
                contextTitle: "Tu sitio, listo para publicar",
                contextDesc: "Para negocios que necesitan un sitio que comunique bien, funcione rápido y esté operativo desde el primer día.",
                delivery: "Según alcance del proyecto — lo definimos antes de empezar.",
                price: "$399.000",
                cta: "Solicitar diseño web →",
                cards: [
                    { title: "Estructura estratégica", description: "Ordeno secciones, jerarquía y recorrido para que el sitio comunique con claridad." },
                    { title: "Diseño visual responsive", description: "Creo una interfaz moderna, coherente y adaptable a mobile, tablet y desktop." },
                    { title: "Contenido orientado a decisión", description: "Ajusto textos, llamados a la acción y mensajes clave para guiar al usuario." },
                    { title: "Entrega lista para desarrollo", description: "Preparo una propuesta clara para avanzar a implementación sin ambigüedad." }
                ],
                features: [
                    "Estrategia de contenido y estructura de navegación clara.",
                    "Interfaz visual (UI) moderna, atractiva y alineada a tu marca.",
                    "Optimización y adaptación responsive perfecta para celulares.",
                    "Desarrollo completo, publicación en hosting y sitio 100% funcional."
                ]
            },
            results: {
                title: "Proyectos de diseño aplicado",
                description: "Sitios y experiencias diseñadas para comunicar mejor, ordenar contenido y facilitar contacto.",
                cta: "Solicitar diseño web →",
                cards: [{
                        image: "/assets/design-koyam.webp",
                        alt: "Grupo Koyam sitio web",
                        eyebrow: "Cliente",
                        title: "Grupo Koyam",
                        rows: [
                            { label: "Trabajo", text: "Diseño web responsive para comunicar servicios y generar confianza comercial." },
                            { label: "Foco", text: "Ordenar propuesta, mejorar jerarquía y facilitar contacto desde mobile." }
                        ]
                    },
                    {
                        image: "/assets/design-rafcon.webp",
                        alt: "Rafcon sitio web",
                        eyebrow: "Cliente",
                        title: "Rafcon",
                        rows: [
                            { label: "Trabajo", text: "Arquitectura y diseño de experiencia para servicios industriales." },
                            { label: "Foco", text: "Comunicar solvencia técnica, evidencia y capacidad operativa." }
                        ]
                    },
                    {
                        image: "/assets/design-concept-fintech.webp",
                        alt: "Concepto de Landing Page de Alta Conversión para Fintech",
                        eyebrow: "Concepto",
                        title: "Landing Page: Fintech / SaaS",
                        rows: [
                            { label: "Trabajo", text: "Propuesta conceptual estructurada para explicar servicios complejos en una sola página." },
                            { label: "Foco", text: "Optimizar la claridad de la propuesta de valor y estructurar llamados a la acción estratégicos." }
                        ]
                    },
                    {
                        image: "/assets/design-concept-responsive.webp",
                        alt: "Estructura de interfaz web optimizada para dispositivos móviles",
                        eyebrow: "Habilidad",
                        title: "Arquitectura Web Responsive",
                        rows: [
                            { label: "Trabajo", text: "Adaptación estratégica de layouts y componentes desde escritorio a pantallas móviles." },
                            { label: "Foco", text: "Garantizar legibilidad, adaptar zonas de interacción táctil y eliminar la fricción en celulares." }
                        ]
                    }
                ]
            },
            contact: {
                title: "Hablemos de tu nuevo sitio",
                description: "Cuéntame qué necesitas construir o mejorar y revisamos el mejor enfoque para diseñarlo con claridad.",
                cta: "Enviar solicitud →",
                blockLabel: "Alineación estratégica",
                blockText: "Definimos objetivos comerciales, requerimientos y alcance técnico clave antes de proponer una estructura visual.",
                timeText: "En menos de 12 horas hábiles te respondo para evaluar los requerimientos de tu proyecto."

            }
        }
    };

    function setText(selector, text) {
        var el = document.querySelector(selector);
        if (el && text !== undefined) el.textContent = text;
    }

    function updateOfertaCards(cards) {
        if (!cards) return;
        var items = document.querySelectorAll("[data-oferta-cards] .oferta__item");
        items.forEach(function(item, i) {
            var card = cards[i];
            if (!card) return;
            var titleEl = item.querySelector("[data-card-title]");
            var descEl = item.querySelector("[data-card-desc]");
            if (titleEl) titleEl.textContent = card.title;
            if (descEl) descEl.textContent = card.description;
        });
    }

    function updateProblemaCards(cards) {
        if (!cards) return;
        var items = document.querySelectorAll("[data-problema-cards] .problema__item");
        items.forEach(function(item, i) {
            var card = cards[i];
            if (!card) return;
            var titleEl = item.querySelector("[data-card-title]");
            var descEl = item.querySelector("[data-card-desc]");
            if (titleEl) titleEl.textContent = card.title;
            if (descEl) descEl.textContent = card.description;
        });
    }

    function updateResultCards(cards) {
        if (!cards) return;
        var cardEls = document.querySelectorAll("[data-resultados-cards] .resultado-card");
        cardEls.forEach(function(cardEl, i) {
            var card = cards[i];
            if (!card) return;
            var img = cardEl.querySelector(".resultado-card__image img");
            if (img) {
                img.src = card.image;
                img.alt = card.alt;
            }
            var eyebrow = cardEl.querySelector(".resultado-card__eyebrow");
            if (eyebrow && card.eyebrow) eyebrow.textContent = card.eyebrow;
            var titleEl = cardEl.querySelector(".resultado-card__title");
            if (titleEl) titleEl.textContent = card.title;
            var rowLabels = cardEl.querySelectorAll(".resultado-card__row-label");
            var rowTexts = cardEl.querySelectorAll(".resultado-card__row .resultado-card__text");
            if (card.rows) {
                card.rows.forEach(function(row, j) {
                    if (rowLabels[j]) rowLabels[j].textContent = row.label;
                    if (rowTexts[j]) rowTexts[j].textContent = row.text;
                });
            }
        });
    }

    function updateOfertaFeatures(features) {
        if (!features) return;
        // Buscamos solo los spans de texto que creamos en el HTML
        var elements = document.querySelectorAll(".oferta__feature-text");
        elements.forEach(function(el, i) {
            if (features[i] && el) {
                el.textContent = features[i]; // Cambia el texto de forma segura
            }
        });
    }

    function applyService(service) {
        var content = serviceContent[service];
        if (!content) return;

        setText("[data-service-label]", content.label);

        document.querySelectorAll(".service-switch__button").forEach(function(btn) {
            var isActive = btn.dataset.service === service;
            btn.classList.toggle("is-active", isActive);
            btn.setAttribute("aria-selected", String(isActive));
        });

        var titleEl = document.querySelector("[data-hero-title]");
        if (titleEl) titleEl.textContent = content.hero.title;
        setText("[data-hero-description]", content.hero.description);
        setText("[data-hero-primary-cta]", content.hero.primaryCta);

        setText("[data-problema-title]", content.problem.title);
        setText("#problema .section__description", content.problem.description);
        setText("[data-problema-note]", content.problem.note);
        updateProblemaCards(content.problem.cards);

        setText("[data-oferta-title]", content.offer.title);
        setText("#oferta-principal .section__description", content.offer.description);
        setText("[data-oferta-badge]", content.offer.badge);
        setText("[data-oferta-context-title]", content.offer.contextTitle);
        setText("[data-oferta-context-desc]", content.offer.contextDesc);
        setText("[data-oferta-delivery]", content.offer.delivery);
        setText("[data-oferta-price]", content.offer.price);
        setText("[data-oferta-cta]", content.offer.cta);
        setText("[data-oferta-features", content.offer.features[0]);
        setText("[data-oferta-features1", content.offer.features[1]);
        setText("[data-oferta-features2", content.offer.features[2]);
        setText("[data-oferta-features3", content.offer.features[3]);
        updateOfertaCards(content.offer.cards);

        setText("[data-resultados-title]", content.results.title);
        setText("#resultados .section__description", content.results.description);
        setText("[data-resultados-cta]", content.results.cta);
        updateResultCards(content.results.cards);

        setText("[data-contacto-title]", content.contact.title);
        setText("#contacto .section__description", content.contact.description);
        setText("[data-contacto-cta]", content.contact.cta);
        // Contacto
        setText("[data-contacto-title]", content.contact.title);
        setText("#contacto .section__description", content.contact.description);
        setText("[data-contacto-cta]", content.contact.cta);
        setText("[data-contacto-block-label]", content.contact.blockLabel);
        setText("[data-contacto-block-text]", content.contact.blockText);


        setText("[data-contacto-time-text]", content.contact.timeText);

        // Control del campo URL (Ocultar/Mostrar de forma segura)... el resto sigue intacto



        // Control del campo URL (Ocultar/Mostrar de forma segura)... el resto sigue exactamente igual

        var urlWrapper = document.getElementById("campo-url");
        var urlInput = document.getElementById("enlace");
        if (urlWrapper && urlInput) {
            if (service === "design") {
                urlWrapper.style.display = "none";
                urlInput.removeAttribute("required");
                urlInput.classList.remove("is-valid", "is-error");
            } else {
                urlWrapper.style.display = "";
                urlInput.setAttribute("required", "required");
            }
        }

        /* Resetear scroll del carousel al cambiar de servicio */
        if (carousel) {
            carousel.scrollLeft = 0;
            updateNavButtons && updateNavButtons();
        }

        localStorage.setItem("selectedService", service);
    }

    /* Exponer updateNavButtons al scope externo para que applyService pueda llamarla */
    var updateNavButtons = null;
    if (carousel && prevBtn && nextBtn) {
        updateNavButtons = function() {
            var scrollLeft = carousel.scrollLeft;
            var maxScroll = carousel.scrollWidth - carousel.clientWidth;
            prevBtn.disabled = scrollLeft <= 2;
            nextBtn.disabled = scrollLeft >= maxScroll - 2;
        };
    }

    var serviceButtons = document.querySelectorAll(".service-switch__button");
    if (serviceButtons.length > 0) {
        applyService(localStorage.getItem("selectedService") || "audit");
        serviceButtons.forEach(function(btn) {
            btn.addEventListener("click", function() { applyService(btn.dataset.service); });
        });
    }


    /* =========================
       FORM VALIDATION
       ========================= */
    var contactForm = document.querySelector("#contacto-form");
    var contactSuccess = document.querySelector("#contacto-success");

    if (contactForm) {
        var fields = {
            nombre: contactForm.querySelector("#nombre"),
            email: contactForm.querySelector("#email"),
            enlace: contactForm.querySelector("#enlace"),
            mensaje: contactForm.querySelector("#mensaje"),
            terminos: contactForm.querySelector('input[name="terminos"]')
        };

        var suspicious = [".ru", "casino", "xxx", "hack", "free-money", "malware", "phishing"];

        function setFieldState(field, isValid) {
            if (!field) return;
            field.classList.toggle("is-valid", isValid);
            field.classList.toggle("is-error", !isValid);
        }

        function clearFieldState(field) {
            if (!field) return;
            field.classList.remove("is-valid", "is-error");
        }

        function validateUrl(field) {
            if (!field) return false;
            try {
                var url = new URL(field.value.trim());
                var isSafe = !suspicious.some(function(p) { return field.value.toLowerCase().includes(p); });
                return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".") && isSafe;
            } catch (e) { return false; }
        }

        function validateField(field) {
            if (!field) return false;
            if (!field.hasAttribute("required") && field.value.trim() === "") {
                field.classList.remove("is-valid", "is-error");
                return true;
            }
            var isValid;
            if (field.id === "enlace") {
                isValid = validateUrl(field);
            } else if (field.id === "mensaje") {
                isValid = field.value.trim().length >= 10;
            } else {
                isValid = field.checkValidity();
            }
            setFieldState(field, isValid);
            return isValid;
        }

        Object.keys(fields).forEach(function(key) {
            var field = fields[key];
            if (!field || field.type === "checkbox") return;
            field.addEventListener("blur", function() { validateField(field); });
            field.addEventListener("input", function() { clearFieldState(field); });
        });

        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            var allValid = [
                validateField(fields.nombre),
                validateField(fields.email),
                validateField(fields.enlace),
                validateField(fields.mensaje)
            ].every(function(v) { return v; });

            if (!(fields.terminos && fields.terminos.checked)) {
                if (fields.terminos) fields.terminos.focus();
                return;
            }

            var turnstile = contactForm.querySelector('[name="cf-turnstile-response"]');
            if (!turnstile || !turnstile.value) {
                alert("Por favor verifica que eres humano.");
                return;
            }

            if (!allValid) {
                var firstError = contactForm.querySelector(".is-error");
                if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }

            var submitBtn = contactForm.querySelector('[data-contacto-cta]');
            var originalText = submitBtn ? submitBtn.textContent : "";

            if (submitBtn) {
                submitBtn.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span> Enviando...';
                submitBtn.classList.add("btn--loading");
                submitBtn.setAttribute("aria-disabled", "true");
            }

            var formData = new FormData(contactForm);
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            }).then(function() {
                if (submitBtn) {
                    submitBtn.innerHTML = "✓ Solicitud enviada";
                    submitBtn.classList.remove("btn--loading");
                    submitBtn.classList.add("btn--sent");
                }
                setTimeout(function() {
                    contactForm.hidden = true;
                    if (contactSuccess) {
                        contactSuccess.hidden = false;
                        contactSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                }, 1200);
            }).catch(function() {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove("btn--loading");
                    submitBtn.setAttribute("aria-disabled", "false");
                }
                contactForm.submit();
            });
        });
    }


    /* =========================
       MODAL LEGAL con trap de foco
       ========================= */
    var legalModal = document.getElementById("legal-modal");
    var modalTriggers = document.querySelectorAll(".js-modal-trigger");
    var modalCloseElements = document.querySelectorAll("[data-close-modal]");
    var previousFocusedElement;

    var FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

    if (legalModal && modalTriggers.length > 0) {
        function trapFocus(e) {
            var focusable = Array.from(legalModal.querySelectorAll(FOCUSABLE));
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (e.key !== "Tab") return;
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        function openLegalModal(e) {
            e.preventDefault();
            previousFocusedElement = document.activeElement;
            legalModal.removeAttribute("hidden");
            document.body.style.overflow = "hidden";
            var closeBtn = legalModal.querySelector(".modal__close");
            if (closeBtn) closeBtn.focus();
            legalModal.addEventListener("keydown", trapFocus);
        }

        function closeLegalModal() {
            legalModal.setAttribute("hidden", "true");
            document.body.style.overflow = "";
            legalModal.removeEventListener("keydown", trapFocus);
            if (previousFocusedElement) previousFocusedElement.focus();
        }

        modalTriggers.forEach(function(trigger) {
            trigger.addEventListener("click", openLegalModal);
        });

        modalCloseElements.forEach(function(element) {
            element.addEventListener("click", closeLegalModal);
        });

        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && !legalModal.hasAttribute("hidden")) {
                closeLegalModal();
            }
        });
    }

});