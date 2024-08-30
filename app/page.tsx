"use client";

import {
  Navbar,
  HeroSection,
  AboutSection,
  AchievementsSection,
  ProjectsSection,
  EmailSection,
  Footer,
} from "../container";

import Provider from "../context/Provider";

export default function Home() {
  return (
    <Provider>
      <main className="flex min-h-screen flex-col dark:bg-[#121212] bg-[#fff]">
        <Navbar />
        <div className="container mt-24 mx-auto px-12 py-4">
          <HeroSection />
          <AchievementsSection />
          <AboutSection />
          <ProjectsSection />
          <EmailSection />
        </div>
        <Footer />
      </main>
    </Provider>
  );
}
