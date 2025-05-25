import {universityData} from "@/public/data";

export function ScreenSizeGetter() {
    return (
        <div className="bg-white p-2 uppercase text-black font-bold duration-300 h-min">
            <div className="hidden! sm:hidden! md:hidden! lg:hidden! xl:hidden! 2xl:flex!">2xl (1344)</div>
            <div className="hidden! sm:hidden! md:hidden! lg:hidden! xl:flex! 2xl:hidden!">xl (1120)</div>
            <div className="hidden! sm:hidden! md:hidden! lg:flex! xl:hidden! 2xl:hidden!">lg (896)</div>
            <div className="hidden! sm:hidden! md:flex! lg:hidden! xl:hidden! 2xl:hidden!">md (672)</div>
            <div className="hidden! sm:flex! md:hidden! lg:hidden! xl:hidden! 2xl:hidden!">sm (560)</div>
            <div className="flex! sm:hidden! md:hidden! lg:hidden! xl:hidden! 2xl:hidden!">mo</div>
        </div>
    )
}

export class User {
    constructor(fullName, username, email, password, university, semester, degree, course, role) {

        this.fullName = fullName.trim();
        this.username = username.trim();
        this.avatarImg = `https://ui-avatars.com/api/?background=000&color=fff&name=${fullName.replaceAll(" ", "+")}`
        this.email = email;
        this.password = password;
        this.role = role;

        this.contributions = {
            resources: [],
            books: [],
            channels: [],
            requests: [],
            count: 0,
        };
        this.academicDetails = {
            university: (universityData[university] ? universityData[university].name : "Other"),
            semester: parseInt(semester),
            degree: {"bs": "Bachelor of Science", "be": "Bachelor of Engineering"}[degree],
            course: (universityData[university] ? universityData[university].programs.find(c => c.id === course).name : "Other"),
        }
        this.likedItems = {
            resources: [],
            books: [],
            channels: []
        }
        this.createdAt = Date.now()
        this.isVerified = false;
        this.receivedLikes = 0;
    }
}