(function () {
    const output = document.getElementById("output");
    const form = document.getElementById("command-form");
    const input = document.getElementById("cmd-input");
    const skipBtn = document.getElementById("skip-boot");
    const suggestBar = document.getElementById("suggest-bar");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let history = [];
    let historyIndex = 0;
    let bootCancelled = false;
    let ready = false;

    const BOOT_STEPS = [
        { text: "initializing kernel", ok: true, delay: 90 },
        { text: "loading portfolio modules", ok: true, delay: 70 },
        { text: "initializing user profile", ok: true, delay: 80 },
        { text: "establishing secure connection", ok: true, delay: 110 },
        { text: "mounting /home/anas", ok: true, delay: 70 },
        { blank: true, delay: 40 },
        { banner: true, delay: 20 }
    ];

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function scrollToEnd() {
        output.scrollTop = output.scrollHeight;
    }

    function appendHTML(html, className) {
        const wrap = document.createElement("div");
        wrap.className = className || "cmd-output";
        wrap.innerHTML = html;
        output.appendChild(wrap);
        scrollToEnd();
        return wrap;
    }

    async function typeText(el, text, speed) {
        if (reducedMotion || bootCancelled) {
            el.textContent = text;
            return;
        }
        for (const ch of text) {
            if (bootCancelled) {
                el.textContent = text;
                return;
            }
            el.textContent += ch;
            scrollToEnd();
            await sleep(speed);
        }
    }

    function closestMatch(value) {
        const q = value.toLowerCase();
        if (!q) return [];
        const starts = COMMAND_LIST.filter((cmd) => cmd.startsWith(q));
        const includes = COMMAND_LIST.filter((cmd) => !cmd.startsWith(q) && cmd.includes(q));
        return [...starts, ...includes];
    }

    function resolveCommand(raw) {
        const command = raw.trim().toLowerCase();
        if (COMMAND_ALIASES[command]) return COMMAND_ALIASES[command];
        return command;
    }

    function updateSuggestions() {
        if (!ready) {
            suggestBar.hidden = true;
            return;
        }
        const matches = closestMatch(input.value.trim());
        if (!input.value.trim() || matches.length === 0) {
            suggestBar.hidden = true;
            suggestBar.innerHTML = "";
            return;
        }
        suggestBar.hidden = false;
        suggestBar.innerHTML = matches
            .map((cmd) => `<button type="button" class="suggest-chip" data-cmd="${cmd}">${cmd}</button>`)
            .join("");
    }

    function escapeHTML(text) {
        return text
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");
    }

    function renderCommandLine(command) {
        appendHTML(
            `<div class="cmd-input-line">${CommandEngine.promptHTML()} <span class="cmd-text">${escapeHTML(command)}</span></div>`,
            "cmd-block"
        );
    }

    function run(raw, { echo = true } = {}) {
        const trimmed = raw.trim();
        if (!trimmed) return;

        const command = resolveCommand(trimmed);

        if (echo) {
            history.push(trimmed);
            historyIndex = history.length;
            renderCommandLine(trimmed);
        }

        if (command === "clear") {
            output.innerHTML = "";
            appendHTML(CommandEngine.welcome(), "welcome-block");
            input.value = "";
            updateSuggestions();
            input.focus();
            return;
        }

        if (command === "github") {
            appendHTML(`<span class="muted">opening GitHub...</span>`);
            window.open(PORTFOLIO.github, "_blank", "noopener,noreferrer");
            input.value = "";
            updateSuggestions();
            return;
        }

        if (command === "linkedin") {
            appendHTML(`<span class="muted">opening LinkedIn...</span>`);
            window.open(PORTFOLIO.linkedin, "_blank", "noopener,noreferrer");
            input.value = "";
            updateSuggestions();
            return;
        }

        if (command === "sudo" || trimmed.toLowerCase().startsWith("sudo ")) {
            appendHTML(CommandEngine.sudo());
            input.value = "";
            updateSuggestions();
            scrollToEnd();
            return;
        }

        const handlers = {
            help: () => CommandEngine.help(),
            whoami: () => CommandEngine.whoami(),
            about: () => CommandEngine.about(),
            skills: () => CommandEngine.skills(),
            projects: () => CommandEngine.projects(),
            certifications: () => CommandEngine.certifications(),
            education: () => CommandEngine.education(),
            contact: () => CommandEngine.contact(),
            date: () => CommandEngine.date(),
            neofetch: () => CommandEngine.neofetch(),
            history: () => CommandEngine.history(history)
        };

        if (handlers[command]) {
            appendHTML(handlers[command]());
        } else {
            appendHTML(CommandEngine.unknown(escapeHTML(command), closestMatch(command)[0]));
        }

        input.value = "";
        updateSuggestions();
        scrollToEnd();
        input.focus();
    }

    function finishBoot() {
        if (ready) return;
        ready = true;
        output.innerHTML = "";
        appendHTML(CommandEngine.welcome(), "welcome-block");
        skipBtn.hidden = true;
        input.focus();
    }

    async function boot() {
        output.innerHTML = "";
        if (reducedMotion) {
            finishBoot();
            return;
        }

        for (const step of BOOT_STEPS) {
            if (bootCancelled || ready) return;
            if (step.blank) {
                output.appendChild(document.createElement("br"));
                await sleep(step.delay);
                continue;
            }
            if (step.banner) {
                const line = document.createElement("div");
                line.className = "boot-banner muted";
                output.appendChild(line);
                await typeText(line, "// INITIALIZING ANAS.SYS v2.0 ...", 18);
                if (bootCancelled || ready) return;
                const readyLine = document.createElement("div");
                readyLine.className = "ok";
                output.appendChild(readyLine);
                await typeText(readyLine, "system ready.", 22);
                await sleep(220);
                continue;
            }

            const row = document.createElement("div");
            row.className = "boot-line muted";
            const label = document.createElement("span");
            row.appendChild(label);
            output.appendChild(row);
            await typeText(label, `${step.text}... `, 16);
            if (bootCancelled || ready) return;
            const status = document.createElement("span");
            status.className = "ok";
            status.textContent = "ok";
            row.appendChild(status);
            scrollToEnd();
            await sleep(step.delay);
        }

        if (!bootCancelled) await sleep(160);
        if (!ready) finishBoot();
    }

    function applyTheme(theme) {
        document.body.dataset.theme = theme;
        localStorage.setItem("anas-theme", theme);
        document.querySelectorAll(".theme-btn").forEach((btn) => {
            btn.classList.toggle("is-active", btn.dataset.theme === theme);
        });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!ready) {
            bootCancelled = true;
            finishBoot();
            return;
        }
        run(input.value);
    });

    input.addEventListener("keydown", (event) => {
        if (!ready && (event.key === "Enter" || event.key === "Escape")) {
            bootCancelled = true;
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (!history.length) return;
            historyIndex = Math.max(0, historyIndex - 1);
            input.value = history[historyIndex] || "";
            updateSuggestions();
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (historyIndex < history.length - 1) {
                historyIndex += 1;
                input.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                input.value = "";
            }
            updateSuggestions();
        }

        if (event.key === "Tab") {
            const matches = closestMatch(input.value.trim());
            if (matches.length) {
                event.preventDefault();
                input.value = matches[0];
                updateSuggestions();
            }
        }

        if (event.key === "l" && event.ctrlKey) {
            event.preventDefault();
            if (ready) run("clear", { echo: false });
        }
    });

    input.addEventListener("input", updateSuggestions);

    skipBtn.addEventListener("click", () => {
        bootCancelled = true;
        finishBoot();
    });

    output.addEventListener("click", (event) => {
        const cmdBtn = event.target.closest("[data-cmd]");
        if (cmdBtn && ready) {
            run(cmdBtn.dataset.cmd);
            return;
        }

        const expand = event.target.closest("[data-expand]");
        if (expand) {
            const card = expand.closest(".project-card");
            const open = card.classList.toggle("is-open");
            expand.textContent = open ? "collapse details" : "expand details";
            expand.setAttribute("aria-expanded", String(open));
            return;
        }

        const copy = event.target.closest("[data-copy]");
        if (copy) {
            navigator.clipboard.writeText(copy.dataset.copy).then(() => {
                const original = copy.textContent;
                copy.textContent = "copied";
                setTimeout(() => {
                    copy.textContent = original;
                }, 1200);
            }).catch(() => {
                copy.textContent = "failed";
            });
        }
    });

    suggestBar.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-cmd]");
        if (!chip) return;
        input.value = chip.dataset.cmd;
        input.focus();
        run(chip.dataset.cmd);
    });

    document.querySelector(".theme-switcher").addEventListener("click", (event) => {
        const btn = event.target.closest("[data-theme]");
        if (!btn) return;
        applyTheme(btn.dataset.theme);
    });

    document.querySelector(".terminal").addEventListener("click", (event) => {
        if (event.target.closest("a, button, input")) return;
        input.focus();
    });

    const savedTheme = localStorage.getItem("anas-theme");
    if (savedTheme) applyTheme(savedTheme);

    boot();
})();
