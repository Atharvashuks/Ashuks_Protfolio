"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const arr = [
  "Atharva",
  2000,
  "Web Developer",
  1000,
  "Mobile Developer",
  1000,
  "UI/UX Designer",
  1000,
];

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-sky-400 dark:to-cyan-600 from-[#000053] to-[#0000dd]">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              className="text-[#000042] dark:text-white"
              sequence={arr}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="dark:text-[#ADB7BE] text-[#0044ff] text-base sm:text-lg mb-6 lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptuous.
          </p>
          <div>
            <Link
              href="/#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit  rounded-full mr-4 bg-gradient-to-br  dark:from-sky-200 dark:to-cyan-800 from-[rgb(0,0,83)] to-[#0000dd] dark:hover:bg-sky-900 text-white"
            >
              Hire Me
            </Link>

            <Link
              href="/"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br  dark:from-sky-200 dark:to-cyan-800 from-[rgb(0,0,83)] to-[#0000dd] hover:bg-white-200  hover:bg-slate-800 mt-3"
            >
              <span className="block dark:bg-[#121212] bg-[#0000aa] dark:hover:bg-sky-50 rounded-full px-5 py-2 text-white dark:hover:text-cyan-900">
                Download CV
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full dark:bg-[#181818] bg-[#000035] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/hero-image.png"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
