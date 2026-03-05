export const portfolioData = {
    general: {
        siteName: "Swarnabha Halder | Developer Portfolio",
        logoText: "S.",
        firstName: "SWARNABHA",
        lastName: "HALDER",
        email: "swarnabha@swarnabha.tech",
        phone: "+1 (555) 012-3456",
        socials: [
            { name: "Twitter", url: "#" },
            { name: "LinkedIn", url: "#" },
            { name: "Github", url: "#" },
        ]
    },
    hero: {
        // IMAGE USAGE INSTRUCTIONS: 
        // 1. For external images, use the full URL: "https://example.com/image.jpg"
        // 2. For local images, place them in the 'public' folder and use the relative path: "/my-image.png"
        portraitImage: "/Picsart_26-01-08_21-07-32-700 i.png",
        // portraitImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMxwsQ9MPy65dZYbl-f6rr1HteFdl1R7EaOv08NrRhEHm3edZ9gYcOoom5gGm7nb2zH__KLf91YHuIDxlho30obJ_nya7C-MLfM2bpmGCblVMaLuJiDElLf9BnVqkOmpIJRNIo1Y-B6kW_XNAoGDryhX9sHg0IipHP-S2mhNc0WSVR6w7aONPmqyFkmpsgMCZeyaQoR1ePBBPgu_F2a5-ZtJbpZHLk3JYSwSbe5SZmB_sgLDmH9b57RhwccMULxgNYwaWNPP7T9i4",
        titleLine1: "Crafting digital experiences with",
        titleLine2: "architectural precision.",
        subtitle: [
            { text: "Crafting ", highlight: true },
            { text: "digital experiences with architectural ", highlight: false },
            { text: "precision.", highlight: true }
        ],
        expertise: ["AI Engineering", "Motion Design", "Full Stack Dev", "3D Interactive"]
    },
    about: {
        stats: [
            { value: "6+", label: "Years Crafting", subLabel: "Production-grade experiences" },
            { value: "40+", label: "Projects Shipped", subLabel: "From seed to scale" },
            { value: "∞", label: "Curiosity", subLabel: "Every pixel intentional" }
        ],
        headlineBase1: "I bridge the gap between what's ",
        headlineEmphasis1: "technically possible",
        headlineBase2: " and what feels ",
        headlineEmphasis2: "inevitable.",
        paragraphs: [
            "I'm Swarnabha — a creative developer with a deep obsession for motion, material, and interface craft. I don't separate design from engineering. Every interaction I build has been stress-tested against real human behavior and visual intuition refined over years of obsessive iteration.",
            "My work spans fintech dashboards, generative AI tooling, spatial interfaces, and design systems built to scale across organizations. I speak fluent designer and fluent engineer — often in the same sentence."
        ],
        resumeLink: "#",
        // You can easily change your core expertise labels here
        coreExpertise: ["React / Next.js", "TypeScript", "GSAP / Motion", "Three.js", "Figma Systems", "Node.js", "AI Integration", "WebGL", "iOS / Swift", "Design Systems"]
    },
    work: [
        { title: 'Histopathology Registration', desc: 'Medical Image Alignment System', icon: 'biotech', gradient: 'from-indigo-50 to-purple-50', link: '/case-study/histopathology' },
        { title: 'Secure EVTX Log Platform', desc: 'Enterprise Log Analytics', icon: 'security', gradient: 'from-emerald-50 to-teal-50', link: '/case-study/evtx' },
        { title: 'Mars Weather Dashboard', desc: 'Planetary Data Visualization', icon: 'public', gradient: 'from-orange-50 to-amber-50', link: '/case-study/mars-weather' },
        { title: 'Rainfall Forecasting Model', desc: 'Deep Learning Weather Prediction', icon: 'query_stats', gradient: 'from-blue-50 to-sky-50', link: '/case-study/rainfall-ai' },
    ],

    research: [
        { title: 'Deformable Image Registration', desc: 'Hybrid B-Spline & Demons Methods', icon: 'science', gradient: 'from-slate-50 to-indigo-50', link: '/case-study/histopathology' },
        { title: 'Medical Image Reconstruction', desc: '3D Histopathology Modeling', icon: 'blur_on', gradient: 'from-rose-50 to-pink-50', link: '/case-study/histopathology' },
        { title: 'Secure Log Intelligence', desc: 'EVTX Parsing & Event Forensics', icon: 'dataset', gradient: 'from-emerald-50 to-cyan-50', link: '/case-study/evtx' },
        { title: 'AI Weather Forecasting', desc: 'FourCastNet Inspired Rainfall Models', icon: 'query_stats', gradient: 'from-violet-50 to-indigo-50', link: '/case-study/rainfall-ai' },
    ],

    caseStudies: {
        histopathology: {
            id: "histopathology",
            title: "Histopathology Image Registration",
            shortDescription: "Developing a hybrid deformable registration pipeline for aligning serial histopathology sections and reconstructing high-fidelity 3D tissue structures.",
            heroImage: "",
            role: ["Research Engineer", "Algorithm Developer"],
            timeline: ["Jan — Apr 2025", "Research Project"],
            client: "Academic Research",
            stack: "Python, SimpleITK, 3D Slicer",
            liveLink: "#",

            processCards: [
                { icon: "science", title: "The Challenge", text: "Serial histopathology sections often contain deformation, tissue loss, and staining inconsistencies. Accurate alignment requires deformable models capable of preserving anatomical fidelity across slices." },
                { icon: "code_blocks", title: "The Execution", text: "Designed a hybrid registration pipeline combining rigid alignment using Mattes Mutual Information, followed by B-Spline deformable registration and Fast Symmetric Forces Demons optimization for fine tissue alignment." },
                { icon: "trending_up", title: "The Outcome", text: "The system achieved highly accurate slice alignment enabling reliable 3D reconstruction of tissue structures. This significantly improved spatial continuity across serial histological images." }
            ],

            contentSection: {
                title: "Reconstructing Tissue Architecture",
                paragraphs: [
                    "Histopathological imaging provides microscopic insight into tissue morphology, but individual sections often suffer from distortions introduced during slicing and staining. This research focused on designing a <span class=\"font-semibold\" style=\"color: var(--text-primary)\">multi-stage deformable registration framework</span> capable of correcting these distortions.",
                    "By integrating statistical similarity metrics with deformable transformation models, the pipeline enables the reconstruction of coherent 3D tissue structures from fragmented 2D slices—opening possibilities for advanced pathological analysis and computational histology."
                ]
            },

            dashboardImage: "",
            mobileImage: "",
            mobileImageLabel: "",
            darkModeImage: "",
            darkModeImageLabel: "",

            quote: "\"Precise alignment of histological sections transforms fragmented microscopy data into meaningful 3D anatomical insight.\"",
            quoteAuthor: "Research Notes",

            nextProject: {
                title: "Secure EVTX Log Platform",
                link: "/case-study/evtx",
                image: ""
            }
        },

        evtx: {
            id: "evtx",
            title: "Secure EVTX Log Analytics Platform",
            shortDescription: "A secure enterprise platform for parsing and analyzing Windows EVTX logs with FastAPI, enabling scalable forensic analysis and event intelligence.",
            heroImage: "",
            role: ["Backend Engineer", "System Architect"],
            timeline: ["May — Jun 2025", "6 Weeks"],
            client: "Internal Security Tooling",
            stack: "FastAPI, SQLite, SQLAlchemy",
            liveLink: "#",

            processCards: [
                { icon: "security", title: "The Challenge", text: "EVTX logs contain critical system and print event data but extracting meaningful insights from large log datasets is computationally expensive and difficult to visualize." },
                { icon: "code_blocks", title: "The Execution", text: "Built a secure FastAPI service capable of parsing EVTX files, extracting metadata such as user activity and print logs, and storing structured records in SQLite using SQLAlchemy." },
                { icon: "trending_up", title: "The Outcome", text: "The system enables rapid log ingestion and visualization while maintaining secure authentication through JWT tokens and strict API validation layers." }
            ],

            contentSection: {
                title: "Security-First System Design",
                paragraphs: [
                    "The platform was engineered with a strong focus on <span class=\"font-semibold\" style=\"color: var(--text-primary)\">secure architecture and scalable data pipelines</span>. Authentication mechanisms were implemented using short-lived JWT tokens with refresh support.",
                    "The modular backend allows efficient processing of large EVTX files while exposing structured analytics endpoints for dashboards and reporting tools."
                ]
            },

            dashboardImage: "",
            mobileImage: "",
            mobileImageLabel: "",
            darkModeImage: "",
            darkModeImageLabel: "",

            quote: "\"Security analytics should transform raw logs into actionable insights without compromising performance.\"",
            quoteAuthor: "System Design Principle",

            nextProject: {
                title: "Mars Weather Dashboard",
                link: "/case-study/mars-weather",
                image: ""
            }
        },

        "mars-weather": {
            id: "mars-weather",
            title: "Mars Weather Analytics Dashboard",
            shortDescription: "An interactive planetary analytics platform visualizing Martian environmental data using modern web visualization techniques.",
            heroImage: "/214879101.png",
            role: ["Data Engineer", "Visualization Developer"],
            timeline: ["Jun 2025", "Project"],
            client: "Scientific Data Visualization",
            stack: "Python, NiceGUI, Plotly",
            liveLink: "#",

            processCards: [
                { icon: "public", title: "The Challenge", text: "Martian atmospheric datasets are complex and difficult to interpret through raw numerical tables." },
                { icon: "code_blocks", title: "The Execution", text: "Designed a modern interactive dashboard capable of ingesting CSV datasets and generating dynamic charts for pressure, temperature, and seasonal atmospheric patterns." },
                { icon: "trending_up", title: "The Outcome", text: "The dashboard enables intuitive exploration of planetary environmental trends and provides automated PDF reports for scientific documentation." }
            ],

            contentSection: {
                title: "Visualizing Planetary Environments",
                paragraphs: [
                    "Understanding extraterrestrial climate requires translating scientific datasets into intuitive visual narratives. The dashboard leverages <span class=\"font-semibold\" style=\"color: var(--text-primary)\">interactive visualization frameworks</span> to explore Martian atmospheric dynamics.",
                    "Through structured analytics and responsive visual components, researchers can quickly interpret seasonal variations and atmospheric behaviors on Mars."
                ]
            },

            dashboardImage: "",
            mobileImage: "",
            mobileImageLabel: "",
            darkModeImage: "",
            darkModeImageLabel: "",

            quote: "\"Data visualization transforms planetary datasets into accessible scientific insight.\"",
            quoteAuthor: "Data Visualization Philosophy",

            nextProject: {
                title: "Rainfall Forecasting AI",
                link: "/case-study/rainfall-ai",
                image: ""
            }
        },

        "rainfall-ai": {
            id: "rainfall-ai",
            title: "Rainfall Forecasting AI",
            shortDescription: "A deep learning model for accurate rainfall prediction.",
            heroImage: "",
            role: ["AI Engineer", "Data Scientist"],
            timeline: ["2025", "Research Phase"],
            client: "Independent Research",
            stack: "PyTorch, Python",
            liveLink: "#",

            processCards: [
                { icon: "cloud", title: "The Challenge", text: "Accurate rainfall prediction requires complex modeling of atmospheric dynamics." },
                { icon: "model_training", title: "The Execution", text: "Applied advanced architecture to build an AI model for weather prediction." },
                { icon: "verified", title: "The Outcome", text: "Improved forecast accuracy and processing time." }
            ],

            contentSection: {
                title: "Deep Learning for Meteorology",
                paragraphs: [
                    "Leveraging state-of-the-art transformer architectures to process vast meteorological datasets.",
                    "This approach significantly enhances the temporal and spatial resolution of our predictions."
                ]
            },

            quote: "\"AI-driven meteorology is the next frontier of precise weather forecasting.\"",
            quoteAuthor: "Research Log",

            nextProject: {
                title: "Histopathology Registration",
                link: "/case-study/histopathology",
                image: ""
            }
        }
    }
};
