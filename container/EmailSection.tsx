"use client";
import React, { useContext, useState } from "react";
import GithubIcon from "../public/github-icon.svg";
import LinkedinIcon from "../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { DataContext } from "../context/Provider";
import { Loader } from "../components";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { aboutSectionData } = useContext(DataContext);

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      setIsLoading(false);
      console.log("Message sent.");
      setEmailSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 p-2 relative dark:bg-[#121212] bg-[#000042] lg:rounded-lg"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#000042] dark:from-sky-500 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          {" "}
          {aboutSectionData?.letsConnect ||
            "I&apos;m currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!"}
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/Atharvashuks" target="_blank">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/atharva-a-shukla-0718b920b/"
            target="_blank"
          >
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="content-center flex min-h-screen dark:bg-[#121212] bg-[#fff]">
          <Loader />
        </div>
      ) : (
        <div>
          {emailSubmitted ? (
            <p className="text-green-500 text-sm mt-2">
              Email sent successfully!
            </p>
          ) : (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="text-white block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  placeholder="hello@gmail.com"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="text-white block text-sm mb-2 font-medium"
                >
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Just saying hi"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="text-white block text-sm mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Let's talk about..."
                />
              </div>
              <button
                type="submit"
                className="bg-sky-400 hover:bg-sky-900 text-white border-white font-medium py-2.5 px-5 rounded-lg w-full"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
};

export default EmailSection;
