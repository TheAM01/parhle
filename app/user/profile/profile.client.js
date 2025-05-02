// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Spinner from "@/components/ui/spinner.js"
// import { SignOutButton } from "@/components/ui/button";
//
// export default function Profile() {
//     const router = useRouter();
//
//     const status = "unauthenticated";
//
//     useEffect(() => {
//         if (status === "unauthenticated") {
//             router.replace("/user/signin?login-first=true&redirect-to=%2Fuser%2Fprofile");
//         }
//     }, [status, router]);
//
//     if (status === "loading" || status === "unauthenticated") {
//         return (
//             <div className="text-white h-screen items-center justify-center w-full">
//                 <Spinner/>
//             </div>
//         )
//     }
//
//     return (
//         <div className="text-white h-screen items-center justify-center w-full flex-col">
//             Signed in as a nigga<br/>
//             <SignOutButton/>
//         </div>
//     );
//
// }
