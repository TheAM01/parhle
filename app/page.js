"use client";


import { useEffect, useRef } from "react"
import {LinkButton} from "@/components/ui/Buttons";
import {motion, useScroll, useTransform} from "framer-motion"
import * as data from "@/public/data";
import {Check} from "lucide-react";


export default function Home() {

    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll()

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);


    useEffect(() => {
        const smoothScroll = (e) => {
            e.preventDefault()
            const href = e.currentTarget.getAttribute("href");
            if (href) {
                document.querySelector(href)?.scrollIntoView({
                    behavior: "smooth",
                })
            }
        }

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", smoothScroll)
        })

        return () => {
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.removeEventListener("click", smoothScroll)
            })
        }
    }, [])
    
    return (
        <div className={"w-full bg-black flex-col"}>

            <div className="bg-black flex-col items-center justify-center text-white h-screen sm:h-screen">
                <Hero targetRef={targetRef} opacity={opacity} scale={scale}/>
            </div>

            <div className="min-h-screen h-full flex-col">

                <div className="bg-white flex-col items-center text-black flex-1 p-2 sm:p-5 lg:p-10 texture-light-grid" id={"features"}>
                    <div className="font-semibold text-black text-2xl sm:text-3xl m-4">
                        Why <span className={"font-logo mx-2 text-gray-medium font-light"}>Parhle</span> Stands Out
                    </div>
                    <div className="m-2 sm:m-5 flex-wrap w-full lg:w-4/5 justify-center items-center">
                        {
                            data.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center text-center lg:w-2/10 w-max lg:mx-10 mb-10 lg:mb-0"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="m-4 bg-black text-white p-2 rounded-full items-center justify-center leading-none">{feature.icon}</div>
                                    <div className="font-semibold text-black text-xl">{feature.title}</div>
                                    <div className="text-gray-dark text-lg">{feature.description}</div>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
                <div className="bg-gray-light flex-col items-center text-black flex-1 p-2 sm:p-5 lg:p-10 texture-light-grid" id={"features"}>
                    <div className="font-semibold text-black text-2xl sm:text-3xl m-4">
                        What Our Users Say
                    </div>
                    <div className="m-5 w-4/5 grid! grid-cols-1 md:grid-cols-2 gap-8">
                        {data.quotes.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 shadow-lg flex-col"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-gray-dark mb-4">"{testimonial.quote}"</div>
                                <div className="font-semibold">- {testimonial.author}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="bg-black  flex-col items-center p-2 sm:p-5 lg:p-10">
                <div className="font-semibold text-white text-2xl sm:text-3xl m-4 h-min">
                    <span className={"font-logo mx-2 text-gray-medium font-light"}>Parhle</span> - by the Numbers
                </div>
                <div className="justify-evenly w-full sm:w-4/5 sm:m-5 m-2 mb-4">
                    {[
                        { number: "100+", label: "Active Users" },
                        { number: "500+", label: "Study Materials" },
                        { number: "3+", label: "Universities" },
                        {number: "30+", label: "Subjects"}
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center flex-col items-center"
                            initial={{ opacity: 0, y: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-white text-2xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                            <div className="text-gray-400 text-xs sm:text-base">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-light h-min flex-col items-center p-2 sm:p-5 lg:p-10 texture-axiom">
                <div className="font-semibold text-black text-2xl sm:text-3xl m-4">
                    Frequently Asked Questions
                </div>
                <div className="flex-col items-center">
                    {
                        data.faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 shadow-sm flex-col lg:w-2/5 md:m-5 m-2 w-full"
                            >
                                <h3 className="text-xl font-semibold mb-2 ">{faq.question}</h3>
                                <p className="text-gray-dark text-lg ">{faq.answer}</p>
                            </motion.div>
                        ))
                    }
                </div>
            </div>

            <div className="bg-black text-white h-min flex-col items-center p-2 sm:p-5 lg:p-10 texture-hero">

                <motion.div
                    className="font-semibold text-white text-2xl sm:text-3xl m-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Join Our Knowledge Ecosystem
                </motion.div>

                <div className="gap-6">
                    <div className="flex-col justify-center">
                        <motion.div
                            className="p-6 bg-gray-800 border border-gray-700 flex-col gap-4 w-120"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-white text-2xl font-semibold">
                                Why Contribute?
                            </div>
                            <div className="flex-col gap-4">
                                {[
                                    "Help others while reinforcing your own understanding",
                                    "Build your academic reputation and portfolio",
                                    "Connect with like-minded students and educators",
                                    "Earn recognition and rewards for quality contributions",
                                    "Access premium resources by becoming an active contributor",
                                ].map((reason, i) => (
                                    <div className="gap-2 items-center" key={i+"lkhg"}>
                                        <div className=" text-black bg-white p-1 flex-shrink-0 w-6 h-6 justify-center leading-none rounded-full items-center">
                                            <Check/>
                                        </div>
                                        <div className="text-gray-medium">{reason}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex-col gap-6  w-120">
                        <motion.div
                            className="flex-col p-6 bg-white gap-4"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-black text-2xl font-semibold">
                                How Parhle Works
                            </div>
                            <div className="text-gray-600 mb-2">Our platform is powered by students like you. Every note, book, and resource shared strengthens our collective knowledge base.</div>
                            <div className="flex-col gap-4">
                                {[
                                    "Sign up and create your academic profile",
                                    "Upload your notes, books, or study materials",
                                    "Connect with peers from your university",
                                    "Access resources shared by others",
                                    "Collaborate and improve together",
                                ].map((working, i) => (
                                    <div className={"gap-2 items-center"} key={i+"wokr"}>
                                        <div className=" text-white bg-black p-1 flex-shrink-0 w-6 h-6 justify-center leading-none font-bold items-center">
                                            {i+1}
                                        </div>
                                        <div className="text-black">{working}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="p-6 bg-gray-800 border border-gray-700 gap-4 flex-col text-white "
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="font-bold text-lg">
                                Community Testimonial
                            </div>
                            <div className="text-gray-dark italic">
                                "I started by uploading my SRE notes, and within a week I had access to quality materials for all my courses. The exchange of knowledge has transformed my academic performance."
                            </div>
                            <div className="w-full">— Ahmed H., UBIT </div>
                        </motion.div>

                    </div>
                </div>
            </div>

            <div className="bg-white h-min flex-col items-center p-2 sm:p-5 lg:p-10">
                <motion.div
                    className="font-semibold text-black text-2xl sm:text-3xl m-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Ready to Revolutionize Your Study Experience?
                </motion.div>
                <motion.div
                    className="text-gray-600 mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    Join thousands of students who are already sharing knowledge and excelling in their studies with
                    Parhle.
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={"mb-4 border-2 border-black"}
                >
                    <LinkButton href={"/user/signup"}>
                        Get Started
                    </LinkButton>
                </motion.div>

            </div>

        </div>
    )
}


function Hero({targetRef, opacity, scale}) {
    return (
        <motion.div
            ref={targetRef}
            style={{ opacity, scale }}
            className="flex-col w-screen p-5 md:p-0 md:w-min"
        >

            <div className="text-4xl lg:text-8xl">Knowledge Shared is</div>
            <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl inline-block whitespace-nowrap bg-white text-black font-medium  lg:text-8xl"
            >
                Power Multiplied
            </motion.div>
            <div className="mt-4">

                <input type="text" name="search" id="search"
                       className="mr-4 p-2.5 whitespace-nowrap border-2 border-white w-[35ch]"
                       placeholder={"Search for notes, books & resources..."}/>
                <LinkButton href={"#features"}>Explore</LinkButton>

            </div>
            <div className="mt-4 text-gray-medium">
                Connect with peers, access curated study materials & resources
                and elevate your academic journey. Parhle -
                Where knowledge knows no boundaries.
            </div>
        </motion.div>
    )
}
