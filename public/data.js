import {
    File,
    Book,
    Share2,
    Users,
    Zap,
    Globe,
    Shield,
    Award,
    Flame,
    Timer,
    CircleAlert,
    X,
    Check,
    Clock
} from "lucide-react"

export const quotes = [
    {
        quote:
            "Parhle has completely transformed my study habits. The collaborative feature and curated content have helped me excel in my courses.",
        author: "M. Razeen, UBIT",
    },
    {
        quote:
            "As a professor, I'm impressed by the quality of notes shared on this platform. It's a valuable resource for both students and educators.",
        author: "John Doe, UBIT",
    },
    {
        quote:
            "The book exchange feature saved me hundreds of dollars on textbooks. The Parhle website is a game-changer for budget-conscious students.",
        author: "Anonymous",
    },
    {
        quote:
            "I love how this site connects me with students from around the world. It's expanded my perspective and improved my learning experience.",
        author: "M. Abdullah, UBIT",
    },

];

export const features = [
    {
        icon: <File/>,
        title: "Curated Notes",
        description: "Access peer-reviewed and professor-approved study materials.",
    },
    {
        icon: <Book/>,
        title: "Book Exchange",
        description: "Find or share textbooks within your academic community.",
    },
    {
        icon: <Share2/>,
        title: "Seamless Sharing",
        description: "Contribute your insights and access a wealth of knowledge effortlessly.",
    },
    {
        icon: <Users/>,
        title: "Collaborative Learning",
        description: "Form study groups and engage in academic discussions.",
    },
    {
        icon: <Zap/>,
        title: "AI-Powered Insights",
        description: "Get personalized study recommendations and content summaries.",
    },
    {
        icon: <Globe/>,
        title: "Global Network",
        description: "Connect with students and educators from around the world.",
    },
    {
        icon: <Shield/>,
        title: "Verified Content",
        description: "Trust in our rigorous content verification process.",
    },
    {
        icon: <Award/>,
        title: "Gamified Learning",
        description: "Earn rewards and track your progress as you contribute and learn.",
    },
];

export const faqs = [
    {
        "question": "How does Parhle ensure the quality of shared materials?",
        "answer": "Parhle employs a rigorous verification process, including peer reviews and professor approvals, to maintain high-quality standards for all shared content."
    },
    {
        "question": "Is Parhle free to use?",
        "answer": "Parhle offers a free with access to most features. Premium supporters (donors) have access to additional benefits and advanced tools."
    },
    {
        "question": "Can I use Parhle if my university isn't listed?",
        "answer": "While we aim to partner with as many universities as possible, Parhle is open to all students. You can access and contribute to our global knowledge base regardless of affiliation. You're also encouraged to upload your university’s resources and build an unofficial presence by actively contributing."
    },
    {
        "question": "How can I contribute my own study materials?",
        "answer": "You can easily upload your notes, summaries, or other study materials through our user-friendly interface after registering an account. Once uploaded, your content goes through our verification process before being made available to the community."
    },
    {
        "question": "Are there any copyright concerns with shared materials?",
        "answer": "All materials go through a verification process. We strongly discourage uploading copyrighted content without permission. If flagged, such content may be removed immediately."
    }
];

export const rewards = {
    resource: 300,
    book: 200,
    channel: 100,
    request: {
        low: 100,
        medium: 200,
        high: 400,
    }
}

export const priorities = {
    low: {
        name: "Not Urgent",
        classes: "bg-green-200 text-green-800 border border-green-500",
        alt: "Low",
        icon: CircleAlert,
        reward: 100

    },
    medium: {
        name: "Somewhat Urgent",
        classes: "bg-yellow-200 text-yellow-800 border border-yellow-500",
        alt: "Medium",
        icon: Timer,
        reward: 200
    },
    high: {
        name: "Very Urgent",
        classes: "bg-red-200 text-red-800 border border-red-500",
        alt: "High",
        icon: Flame,
        reward: 400
    },
}

export const requestStatuses = [
    {
        name: "Open",
        classes: "text-black bg-white border border-white",
        alt: "Pending",
        icon: Clock
    },
    {
        name: "Closed",
        classes: "text-white bg-gray-800 border border-gray-700",
        alt: "Fulfilled",
        icon: Check
    }
    ,
    {
        name: "Rejected",
        classes: "text-white bg-black border border-black",
        alt: "Rejected",
        icon: X
    }
]


export const links = [
    {
        name: "Project",
        items: [
            {
                name: "About",
                href: "/about"
            },
            {
                name: "Contribute",
                href: "/docs/guide"
            },
            {
                name: "Contact",
                href: "/docs/contact"
            }
        ]
    },
    {
        name: "Account",
        items: [
            {
                name: "Login",
                href: "/user/login"
            },
            {
                name: "Sign Up",
                href: "/user/signup"
            },
            {
                name: "Profile",
                href: "/dashboard/profile"
            }
        ]
    },
    {
        name: "Policies",
        items: [
            {
                name: "Cookies",
                href: "/docs/policies/cookies"
            },
            {
                name: "Content",
                href: "/docs/policies/content"
            },
            {
                name: "Copyright",
                href: "/docs/policies/copyright"
            }
        ]
    },
    {
        name: "Connect",
        items: [
            {
                name: "Instagram",
                href: "#"
            },
            {
                name: "LinkedIn",
                href: "#"
            },
            {
                name: "X",
                href: "#"
            }
        ]
    }
]

export const resources = [
    {
        id: 1,
        title: "Past Papers 1",
        subject: "All",
        author: "labrdbms*",
        university: "University of Karachi",
        likes: 0,
        href: "https://drive.google.com/drive/folders/13IK3-TWuogfsFF_NR5kwX4XypNzUzwb5?usp=sharing"
    }
]

export const notesData = [
    {
        id: 1,
        title: "Introduction to Psychology",
        subject: "Psychology",
        author: "Emily S.",
        university: "Stanford",
        likes: 245,
        href: "#"
    },
    {
        id: 2,
        title: "Organic Chemistry Fundamentals",
        subject: "Chemistry",
        author: "Alex K.",
        university: "MIT",
        likes: 189,
        href: "#"
    },
    {
        id: 3,
        title: "Linear Algebra and Its Applications",
        subject: "Mathematics",
        author: "Michael L.",
        university: "Harvard",
        likes: 302,
        href: "#"
    },
    {
        id: 4,
        title: "Principles of Microeconomics",
        subject: "Economics",
        author: "Sophia W.",
        university: "Yale",
        likes: 178,
        href: "#"
    },
    {
        id: 5,
        title: "Introduction to Artificial Intelligence",
        subject: "Computer Science",
        author: "Ryan T.",
        university: "Berkeley",
        likes: 421,
        href: "#"
    },
    {
        id: 6,
        title: "World History: Ancient Civilizations",
        subject: "History",
        author: "Olivia P.",
        university: "Oxford",
        likes: 156,
        href: "#"
    },
];


export const universityData = {
    "uok": {
        name: "University of Karachi",
        programs: [
            {id: "se", name: "Software Engineering"},
            {id: "cs", name: "Computer Science"},
        ]
    },
    "ned": {
        name: "NED University of Engineering & Technology",
        programs: [
            {id: "cise", name: "Computer & Information Systems Engineering"},
            {id: "se", name: "Software Engineering"},
            {id: "csit", name: "Computer Science & Information Technology"},
            {id: "ai", name: "Artificial Intelligence"},
            {id: "ds", name: "Data Sciences"},
            {id: "cs0", name: "Cyber Security"},
            {id: "ga", name: "Gaming & Animations"},
        ],
    }
}

export const degreeData = {
    "bs": "Bachelor of Science",
    "be": "Bachelor of Engineering",
    "other": "Other",
    "non-specific": "Non Specific"
}