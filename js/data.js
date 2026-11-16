
const PORTFOLIO = {
    name: "Anas Khamkar",
    username: "root@anas",
    role: "Cybersecurity Enthusiast",
    status: "Learning, building labs, and practicing defensive skills",

    github: "https://github.com/Anas1505",
    linkedin: "https://www.linkedin.com/in/anas-khamkar-28a319305/",
    email: null,

    about: "I am a cybersecurity enthusiast interested in vulnerability assessment, penetration testing, network security and ethical hacking. I enjoy exploring security concepts, working with practical labs and building projects that strengthen my technical skills.",

    education: {
        qualification: [
            {
                degree: "Bachelor of Science in Information Technology",
                institution: "AIKTC",
                dates: "2023 – 2026",
                cgpa: "9.2",
                coursework: [
                    "Computer Networks",
                    "Database Management",
                    "Python Programming",
                    "Web Development",
                    "Information Security"
                ]
            },
            {
                degree: "Cybersecurity Training",
                institution: "Professional Training",
                dates: "Ongoing",
                specialization: "Cybersecurity & Ethical Hacking",
                areas: [
                    "Vulnerability Assessment & Penetration Testing",
                    "CEH Concepts",
                    "Network Security",
                    "Web Application Security",
                    "Linux",
                    "Active Directory"
                ]
            }
        ],
        notes: "Continuous cybersecurity learning through practical labs, hands-on projects, and security research."
    },

    certifications: [
        {
            name: "Certified Ethical Hacker (CEH) — learning / knowledge track",
            issuer: "[Add verified issuing body]",
            date: "[Add verified date]",
            status: "CEH-related knowledge and coursework."
        }
    ],

    skills: {
        NETWORKING: [
            "TCP/IP",
            "DNS",
            "DHCP",
            "CCNA Fundamentals",
            "Network Security"
        ],

        CYBERSECURITY: [
            "Vulnerability Assessment",
            "Penetration Testing",
            "Web Application Security",
            "Mobile Application Security",
            "Active Directory Fundamentals",
            "OWASP"
        ],

        TOOLS: [
            "Nmap",
            "Wireshark",
            "Burp Suite",
            "Metasploit",
            "Kali Linux"
        ],

        PROGRAMMING: [
            "Python",
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ]
    },

    projects: [
        {
            id: "p01",
            number: "01",
            title: "Network Vulnerability Scanner",
            description: "A Python-based tool that scans local network hosts for open ports, identifies exposed services and documents findings with suggested remediation.",
            extra: "Built to practice host discovery, service identification, and structured reporting. Findings are documented with suggested remediation rather than automated exploitation.",
            tags: ["Python", "Networking", "Nmap concepts"],
            github: "https://github.com/Anas1505/network-vulnerability-scanner"
        },

        {
            id: "p02",
            number: "02",
            title: "CyberShield — Cybersecurity Attack & Defense Lab",
            description: "A Flask-based cybersecurity lab featuring authentication, role-based access control, audit logging and security-focused application features.",
            extra: "Designed as a practical environment for exploring secure application patterns, authentication flows, role-based access control and audit trails.",
            tags: ["Python", "Flask", "SQLite", "HTML", "CSS"],
            github: null
        },

        {
            id: "p03",
            number: "03",
            title: "Mobile Banking Application",
            description: "A mobile banking application with account management, authentication, transaction PIN verification, transaction history and notifications.",
            extra: "Public repository currently covers the Flask and MongoDB backend used by the Flutter client.",
            tags: ["Flutter", "Python", "Flask", "MongoDB"],
            github: "https://github.com/Anas1505/bharat-bank-backend"
        },

        {
            id: "p04",
            number: "04",
            title: "Budget Tracker",
            description: "A web application for tracking account balances and expenses.",
            extra: "A fourth-semester web project for viewing account balances and expense records.",
            tags: ["Python", "HTML", "CSS", "JavaScript"],
            github: "https://github.com/Anas1505/CGproject"
        },

        {
            id: "p05",
            number: "05",
            title: "Gesture Controlled Presentation",
            description: "A Python-based gesture-controlled presentation system that uses computer vision and hand tracking to control presentation slides hands-free.",
            extra: "Developed as an academic project to demonstrate computer vision and hand gesture recognition for an interactive, touch-free presentation system.",
            tags: ["Python", "OpenCV", "Computer Vision"],
            github: "https://github.com/Anas1505/Gesture-Controlled-Presentation"
        }
    ]
};

const COMMAND_LIST = [
    "help",
    "whoami",
    "about",
    "skills",
    "projects",
    "certifications",
    "education",
    "contact",
    "clear",
    "neofetch",
    "history"
];

const COMMAND_ALIASES = {
    ls: "help",
    "?": "help",
    man: "help",
    info: "about",
    me: "whoami",
    social: "contact",
    mail: "contact",
    certs: "certifications",
    cert: "certifications",
    edu: "education",
    proj: "projects"
};

const ASCII_BANNER = String.raw`
 █████╗ ███╗   ██╗ █████╗ ███████╗
██╔══██╗████╗  ██║██╔══██╗██╔════╝
███████║██╔██╗ ██║███████║███████╗
██╔══██║██║╚██╗██║██╔══██║╚════██║
██║  ██║██║ ╚████║██║  ██║███████║
╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
`;
