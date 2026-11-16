
const CommandEngine = {
    promptHTML() {
        return `<span class="prompt-user">root</span><span class="prompt-at">@</span><span class="prompt-host">anas</span><span class="prompt-path">:~</span><span class="prompt-sym">$</span>`;
    },

    helpButtons(commands = COMMAND_LIST) {
        return commands
            .map((cmd) => `<button type="button" class="cmd-btn" data-cmd="${cmd}">${cmd}</button>`)
            .join("");
    },

    welcome() {
        return `
            <div class="ascii-art">${ASCII_BANNER}</div>
            <div class="welcome-name">${PORTFOLIO.name}</div>
            <div class="welcome-sub">${PORTFOLIO.role} · ${PORTFOLIO.username}</div>
            <hr class="divider">
            <p class="muted">Type a command or click one below. Try <span class="accent-inline">help</span> to start.</p>
            <div class="cmd-block">
                <div class="section-label">available commands</div>
                <div class="help-grid">${this.helpButtons()}</div>
            </div>
        `;
    },

    help() {
        const info = {
            help: "list available commands",
            whoami: "identity and profile",
            about: "introduction",
            skills: "technical skill map",
            projects: "project showcase",
            certifications: "certs and learning",
            education: "education and training",
            contact: "socials and email",
            clear: "clear the terminal",
            neofetch: "system summary",
            history: "show command history"
        };

        const rows = COMMAND_LIST.map((cmd) =>
            `<div class="whoami-row"><span class="whoami-key">${cmd}</span><span class="whoami-val">${info[cmd] || ""}</span></div>`
        ).join("");

        return `
            <div class="section-label">help</div>
            ${rows}
            <br>
            <div class="help-grid">${this.helpButtons()}</div>
            <p class="muted">Tab completes commands. Arrow keys cycle history. Ctrl+L clears the screen.</p>
        `;
    },

    avatar() {
        return `
            <div class="avatar-ring">
                <img src="assets/profile.png" alt="Anas Khamkar profile mark" width="118" height="118">
            </div>
        `;
    },

    whoami() {
        return `
            <div class="whoami-layout reveal">
                ${this.avatar()}
                <div class="whoami-block">
                    <div class="whoami-row"><span class="whoami-key">user</span><span class="whoami-val">${PORTFOLIO.name}</span></div>
                    <div class="whoami-row"><span class="whoami-key">role</span><span class="whoami-val">${PORTFOLIO.role}</span></div>
                    <div class="whoami-row"><span class="whoami-key">host</span><span class="whoami-val">${PORTFOLIO.username}</span></div>
                    <div class="whoami-row"><span class="whoami-key">field</span><span class="whoami-val">Cybersecurity · VAPT · Network Security</span></div>
                    <div class="whoami-row"><span class="whoami-key">status</span><span class="whoami-val">${PORTFOLIO.status}</span></div>
                </div>
            </div>
        `;
    },

    about() {
        return `
            <div class="whoami-layout reveal">
                ${this.avatar()}
                <div>
                    <div class="section-label">about</div>
                    <p>${PORTFOLIO.about}</p>
                </div>
            </div>
        `;
    },

    skills() {
        const groups = Object.entries(PORTFOLIO.skills)
            .map(([group, items]) => `
                <div class="skill-group reveal">
                    <h3>${group}</h3>
                    <ul class="skill-list">
                        ${items.map((item) => `
                            <li>
                                <span class="skill-mark" aria-hidden="true">[+]</span>
                                <span>${item}</span>
                                <span class="skill-bar" aria-hidden="true"><span></span></span>
                            </li>
                        `).join("")}
                    </ul>
                </div>
            `)
            .join("");

        return `
            <div class="section-label">skills</div>
            ${groups}
            <p class="muted">Loaded modules only — no invented proficiency scores.</p>
        `;
    },

    projects() {
        const cards = PORTFOLIO.projects.map((project) => {
            const github = project.github
                ? `<a class="project-link" href="${project.github}" target="_blank" rel="noopener noreferrer">→ view on github</a>`
                : `<span class="muted">GitHub: not published yet</span>`;

            return `
                <article class="project-card reveal" data-project="${project.id}">
                    <div class="project-num">PROJECT ${project.number}</div>
                    <div class="project-title">${project.title}</div>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                    </div>
                    <div class="project-actions">
                        ${github}
                        <button type="button" class="expand-btn" data-expand="${project.id}" aria-expanded="false">expand details</button>
                    </div>
                    <div class="project-extra">${project.extra}</div>
                </article>
            `;
        }).join("");

        return `
            <div class="section-label">${PORTFOLIO.projects.length} projects found</div>
            ${cards}
        `;
    },

    certifications() {
        const items = PORTFOLIO.certifications.map((cert) => `
            <div class="whoami-block reveal" style="margin-bottom:10px">
                <div class="whoami-row"><span class="whoami-key">name</span><span class="whoami-val">${cert.name}</span></div>
                <div class="whoami-row"><span class="whoami-key">issuer</span><span class="whoami-val placeholder">${cert.issuer}</span></div>
                <div class="whoami-row"><span class="whoami-key">date</span><span class="whoami-val placeholder">${cert.date}</span></div>
                <p class="muted">${cert.status}</p>
            </div>
        `).join("");

        return `
            <div class="section-label">certifications</div>
            <p>Cybersecurity learning background with CEH-related knowledge, labs, and practical security study.</p>
            <br>
            ${items}
        `;
    },

    // UPDATED EDUCATION METHOD
    education() {
        const qualifications = PORTFOLIO.education?.qualification || [];

        if (!qualifications.length) {
            return `
                <div class="section-label">education</div>
                <p class="muted">No education records available.</p>
            `;
        }

        const items = qualifications.map((edu, index) => {
            const coursework = edu.coursework?.length
                ? `
                    <div class="whoami-row">
                        <span class="whoami-key">coursework</span>
                        <span class="whoami-val">${edu.coursework.join(" · ")}</span>
                    </div>
                `
                : "";

            const areas = edu.areas?.length
                ? `
                    <div class="whoami-row">
                        <span class="whoami-key">training</span>
                        <span class="whoami-val">${edu.areas.join(" · ")}</span>
                    </div>
                `
                : "";

            const cgpa = edu.cgpa
                ? `
                    <div class="whoami-row">
                        <span class="whoami-key">cgpa</span>
                        <span class="whoami-val">${edu.cgpa}</span>
                    </div>
                `
                : "";

            const specialization = edu.specialization
                ? `
                    <div class="whoami-row">
                        <span class="whoami-key">specialization</span>
                        <span class="whoami-val">${edu.specialization}</span>
                    </div>
                `
                : "";

            return `
                <div class="whoami-block reveal" style="margin-bottom:14px">
                    <div class="section-label">
                        qualification ${String(index + 1).padStart(2, "0")}
                    </div>

                    <div class="whoami-row">
                        <span class="whoami-key">degree</span>
                        <span class="whoami-val">${edu.degree || "N/A"}</span>
                    </div>

                    <div class="whoami-row">
                        <span class="whoami-key">institution</span>
                        <span class="whoami-val">${edu.institution || "N/A"}</span>
                    </div>

                    <div class="whoami-row">
                        <span class="whoami-key">dates</span>
                        <span class="whoami-val">${edu.dates || "N/A"}</span>
                    </div>

                    ${cgpa}
                    ${specialization}
                    ${coursework}
                    ${areas}
                </div>
            `;
        }).join("");

        return `
            <div class="section-label">education & training</div>
            ${items}
            <p class="muted">${PORTFOLIO.education.notes || ""}</p>
        `;
    },

    experience() {
        return `
            <div class="section-label">experience</div>
            <div class="whoami-block reveal">
                <p>Hands-on practice through security labs, networking fundamentals, and personal projects in scanning, web security, and application defense.</p>
                <br>
                <p class="placeholder">[Role / organization / dates — add verified experience here]</p>
            </div>
        `;
    },

    contact() {
        const emailValue = PORTFOLIO.email
            ? `<a href="mailto:${PORTFOLIO.email}">${PORTFOLIO.email}</a>`
            : `<span class="placeholder">[email — add when ready]</span>`;

        const emailCopy = PORTFOLIO.email
            ? `<button type="button" class="copy-btn" data-copy="${PORTFOLIO.email}">copy</button>`
            : "";

        return `
            <div class="section-label">contact</div>
            <p class="muted">secure channel ready · drop a message through any link below</p>

            <div class="contact-row">
                <span class="contact-label">github</span>
                <span class="contact-val">
                    <a href="${PORTFOLIO.github}" target="_blank" rel="noopener noreferrer">${PORTFOLIO.github}</a>
                </span>
                <button type="button" class="copy-btn" data-copy="${PORTFOLIO.github}">copy</button>
            </div>

            <div class="contact-row">
                <span class="contact-label">linkedin</span>
                <span class="contact-val">
                    <a href="${PORTFOLIO.linkedin}" target="_blank" rel="noopener noreferrer">${PORTFOLIO.linkedin}</a>
                </span>
                <button type="button" class="copy-btn" data-copy="${PORTFOLIO.linkedin}">copy</button>
            </div>

            <div class="contact-row">
                <span class="contact-label">email</span>
                <span class="contact-val">${emailValue}</span>
                ${emailCopy}
            </div>
        `;
    },

    resume() {
        return `
            <div class="section-label">resume</div>
            <p>Resume file is not uploaded yet.</p>
            <p class="placeholder">[Place resume.pdf in /assets and this command will link it.]</p>
        `;
    },

    date() {
        return `<span class="ok">${new Date().toString()}</span>`;
    },

    history(entries) {
        if (!entries.length) {
            return `<span class="muted">no commands in history yet</span>`;
        }

        const rows = entries.map((cmd, index) =>
            `<div class="history-item">
                <span class="history-num">${String(index + 1).padStart(3, " ")}</span>
                <button type="button" class="expand-btn" data-cmd="${cmd}">${cmd}</button>
            </div>`
        ).join("");

        return `<div class="section-label">history</div>${rows}`;
    },

    neofetch() {
        return `
            <div class="neofetch reveal">
                <pre class="neofetch-art">${ASCII_BANNER}</pre>
                <div>
                    <div class="whoami-row"><span class="whoami-key">os</span><span class="whoami-val">ANAS.SYS x86_64</span></div>
                    <div class="whoami-row"><span class="whoami-key">host</span><span class="whoami-val">root@anas</span></div>
                    <div class="whoami-row"><span class="whoami-key">kernel</span><span class="whoami-val">portfolio 2.0</span></div>
                    <div class="whoami-row"><span class="whoami-key">shell</span><span class="whoami-val">zsh-inspired web terminal</span></div>
                    <div class="whoami-row"><span class="whoami-key">wm</span><span class="whoami-val">browser</span></div>
                    <div class="whoami-row"><span class="whoami-key">theme</span><span class="whoami-val">matrix green / deep black</span></div>
                    <div class="whoami-row"><span class="whoami-key">user</span><span class="whoami-val">${PORTFOLIO.name}</span></div>
                    <div class="whoami-row"><span class="whoami-key">role</span><span class="whoami-val">${PORTFOLIO.role}</span></div>
                    <div class="whoami-row"><span class="whoami-key">stack</span><span class="whoami-val">Python · Networking · Security labs</span></div>
                </div>
            </div>
        `;
    },

    sudo() {
        return `<span class="err">root@anas: permission denied. stay ethical.</span>`;
    },

    unknown(command, suggestion) {
        const hint = suggestion
            ? `<br>Did you mean <button type="button" class="cmd-btn" data-cmd="${suggestion}">${suggestion}</button>?`
            : `<br>Type <button type="button" class="cmd-btn" data-cmd="help">help</button> to list commands.`;

        return `<span class="err">command not found: ${command}</span>${hint}`;
    }
};
