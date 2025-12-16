import prisma from "@/config/db";

if (process.env.NODE_ENV === "production") {
  throw new Error("Refusing to run destructive seed in production.");
}


const heroData = [
  {
    Logo: "Ashuks",
    header: ["Atharva", 2000, "Web Developer", 1000, "App Developer", 1000, "Full Stack", 1000],
    summary:
      "Turning Coffee into Code: Crafting Full-Stack Magic from Front-End Fun to Back-End Brilliance!",
    achivementNumbers: [
      { prefix: "", metrix: "Projects", value: "15", postfix: "+" },
      { prefix: "", metrix: "Recommendations", value: "20", postfix: "+" },
      { prefix: "", metrix: "Years", value: "2" }
    ]
  }
];

const aboutData = {
  aboutme:
    "I’m a dynamic Full Stack Web Developer with a flair for crafting interactive and responsive web applications...",
  letsConnect:
    "I’m actively exploring new opportunities and my inbox is always open...",
  tabData: [
    {
      title: "Skills",
      legacyId: "skills",
      content: [
        "React JS", "Next JS", "Node.js", "Express",
        "MongoDB", "JavaScript", "Typescript", "Python",
        "Java", "GIT", "Azure", "Playwright", ".NET"
      ]
    },
    {
      title: "Education",
      legacyId: "education",
      content: ["Manav Rachna University(B.Tech CSE)", "AFGJI(High School)"]
    },
    {
      title: "Certifications",
      legacyId: "certifications",
      content: ["Python NPTEL", "Infosys Java developer", "Udemy Full Stack developer"]
    }
  ]
};

const projectSections = [
  { legacyId: 1, name: "All", tag: "all" },
  { legacyId: 2, name: "Web", tag: "web" },
  { legacyId: 3, name: "Mobile", tag: "mobile" }
];

const projects = [
  {
    legacyId: 1,
    title: "Portfolio Website",
    description: "My personal portfolio built with Next.js and PostgreSQL.",
    image: "/projects/portfolio.png",
    gitUrl: "https://github.com/yourname/portfolio",
    previewUrl: "https://your-portfolio.vercel.app",
    tags: ["web", "nextjs", "postgres"]
  },
  {
    legacyId: 2,
    title: "Task Tracker",
    description: "A simple task tracking app with auth and CRUD.",
    image: "/projects/tasks.png",
    gitUrl: "https://github.com/yourname/task-tracker",
    previewUrl: "https://task-tracker.vercel.app",
    tags: ["web", "react", "prisma"]
  },
  {
    legacyId: 3,
    title: "Fitness App",
    description: "Mobile-first fitness tracker concept with dashboard.",
    image: "/projects/fitness.png",
    gitUrl: "https://github.com/yourname/fitness-app",
    previewUrl: "https://fitness-app.vercel.app",
    tags: ["mobile", "uiux"]
  }
];

async function main() {
  console.log("🧹 Deleting existing data...");

  // Order matters due to FK constraints
  await prisma.projectTag.deleteMany();
  await prisma.projectsData.deleteMany();
  await prisma.projectSection.deleteMany();

  await prisma.achievementDetails.deleteMany();
  await prisma.heroSection.deleteMany();

  await prisma.tabContent.deleteMany();
  await prisma.tabData.deleteMany();
  await prisma.about.deleteMany();

  console.log("🌱 Seeding HeroSection...");

  for (const item of heroData) {
    await prisma.heroSection.create({
      data: {
        logo: item.Logo,
        summary: item.summary,
        header: item.header,
        achievementNumbers: {
          create: item.achivementNumbers.map(a => ({
            prefix: a.prefix,
            metrix: a.metrix,
            value: a.value,
            postfix: a.postfix ?? null
          }))
        }
      }
    });
  }

  console.log("🌱 Seeding About...");

  await prisma.about.create({
    data: {
      aboutme: aboutData.aboutme,
      letsConnect: aboutData.letsConnect,
      tabData: {
        create: aboutData.tabData.map(t => ({
          title: t.title,
          legacyId: t.legacyId,
          contents: {
            create: t.content.map(c => ({ value: c }))
          }
        }))
      }
    }
  });

  console.log("🌱 Seeding ProjectSection...");

  await prisma.projectSection.createMany({
    data: projectSections
  });

  console.log("🌱 Seeding ProjectsData + tags...");

  for (const p of projects) {
    await prisma.projectsData.create({
      data: {
        legacyId: p.legacyId,
        title: p.title,
        description: p.description,
        image: p.image,
        gitUrl: p.gitUrl,
        previewUrl: p.previewUrl,
        tags: {
          create: p.tags.map(t => ({ value: t }))
        }
      }
    });
  }

  console.log("✅ Database seeded successfully");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
// To run the seed script, use the command: npx prisma db seed