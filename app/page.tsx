import {
  Navbar,
  HeroSection,
  AboutSection,
  AchievementsSection,
  ProjectsSection,
  EmailSection,
  Footer,
} from "../container";

export default function Home() {
  return (
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
  );
}
