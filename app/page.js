"use client";

import { useEffect, useRef } from "react"
import {LinkButton, Button} from "@/components/ui/button";
import Navigation from "@/components/ui/navigation";
import {motion, useScroll, useTransform} from "framer-motion"
import * as data from "@/public/data"
import Link from "next/link";
import Footer from "@/components/ui/footer";

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

            <div className="bg-black flex-col items-center justify-center text-white h-std">
                <Hero targetRef={targetRef} opacity={opacity} scale={scale}/>
            </div>

            <div className="h-std flex-col">

                <div className="bg-white flex-col items-center text-black flex-1 p-10 texture-light-grid" id={"features"}>
                    <div className="font-semibold text-black text-3xl m-5">
                        Why <span className={"font-logo mx-2 text-gray-medium font-light"}>Parhle</span> Stands Out
                    </div>
                    <div className="m-5 flex-wrap w-4/5 justify-center items-center">
                        {
                            data.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center text-center w-2/10 mx-10"
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
                <div className="bg-gray-light flex-col items-center text-black flex-1 p-10 texture-light-grid" id={"features"}>
                    <div className="font-semibold text-black text-3xl m-5">
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

            <div className="bg-black h-min flex-col items-center p-10">
                <div className="font-semibold text-white text-3xl m-5 ">
                    <span className={"font-logo mx-2 text-gray-medium font-light"}>Parhle</span> - by the Numbers
                </div>
                <div className="justify-evenly w-4/5 m-5">
                    {[
                        { number: "100+", label: "Active Users" },
                        { number: "500+", label: "Study Materials" },
                        { number: "3+", label: "Universities" },
                        {number: "30+", label: "Subjects"}
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-white text-4xl font-bold mb-2">{stat.number}</div>
                            <div className="text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-light h-min flex-col items-center p-10 texture-paper">
                <div className="font-semibold text-black text-3xl m-5">
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
                                className="bg-white p-6 shadow-sm flex-col w-2/5 m-5"
                            >
                                <h3 className="text-xl font-semibold mb-2 ">{faq.question}</h3>
                                <p className="text-gray-dark text-lg ">{faq.answer}</p>
                            </motion.div>
                        ))
                    }
                </div>
            </div>

            <div className="bg-black h-min flex-col items-center p-10">
                <motion.div
                    className="font-semibold text-white text-3xl m-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Ready to Revolutionize Your Study Experience?
                </motion.div>
                <motion.div
                    className="text-gray-400 mb-8"
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
                >
                    <LinkButton href={"/signup"}>
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
            className="flex-col w-min"
        >

            <div className="sm:text-red-500 text-8xl">Knowledge Shared is</div>
            <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-8xl inline-block whitespace-nowrap bg-white text-black font-medium"
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
                Connect with peers, access curated study materials,
                and elevate your academic journey. Parhle -
                Where knowledge knows no boundaries.
            </div>
        </motion.div>
    )
}