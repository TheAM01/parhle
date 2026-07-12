import {degreeData, universityData} from "@/public/data";

export class User {
    constructor(fullName, username, email, password, university, semester, degree, course, role) {

        this.fullName = fullName.trim();
        this.username = username.trim();
        // this.avatarImg = `https://ui-avatars.com/api/?background=000&color=fff&name=${fullName.replaceAll(" ", "+")}`
        this.avatarImg = `https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${encodeURIComponent(username)}&eyebrowsColor=ffffff&eyesColor=ffffff&mouthColor=ffffff&noseColor=ffffff&glassesColor=ffffff&backgroundColor=1d1d1d&frecklesColor=ffffff`
        this.email = email;
        this.password = password;
        this.role = role;
        this.aura = 0;

        this.contributions = {
            resources: [],
            books: [],
            channels: [],
            requests: {
                created: [],
                solved: [],
            },
            count: 0,
        };

        const uni = universityData[university];
        const program = uni?.programs.find(c => c.id === course);
        this.academicDetails = {
            university: uni ? uni.name : "Other",
            semester: parseInt(semester),
            degree: degreeData[degree] ?? "Other",
            course: program ? program.name : "Other",
        };

        this.likedItems = {
            resources: [],
            books: [],
            channels: []
        };

        this.notifications = [];

        this.preferences = {
            notifications: {
                email: true,
                dashboard: true,
            },
            profile: {
                public: true
            }
        }

        this.createdAt = Date.now()
        this.isVerified = false;
        this.receivedLikes = 0;
    }
}