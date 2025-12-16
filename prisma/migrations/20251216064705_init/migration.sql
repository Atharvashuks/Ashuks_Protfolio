-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "aboutme" TEXT,
    "letsConnect" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TabData" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "legacyId" TEXT,
    "aboutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TabData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TabContent" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "tabDataId" TEXT NOT NULL,

    CONSTRAINT "TabContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroSection" (
    "id" TEXT NOT NULL,
    "logo" TEXT,
    "summary" TEXT,
    "header" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementDetails" (
    "id" TEXT NOT NULL,
    "legacyId" INTEGER,
    "prefix" TEXT,
    "metrix" TEXT,
    "value" TEXT,
    "postfix" TEXT,
    "heroId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AchievementDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsData" (
    "id" TEXT NOT NULL,
    "legacyId" INTEGER,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "gitUrl" TEXT,
    "previewUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectsData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTag" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSection" (
    "id" TEXT NOT NULL,
    "legacyId" INTEGER,
    "name" TEXT,
    "tag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TabData" ADD CONSTRAINT "TabData_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TabContent" ADD CONSTRAINT "TabContent_tabDataId_fkey" FOREIGN KEY ("tabDataId") REFERENCES "TabData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementDetails" ADD CONSTRAINT "AchievementDetails_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "HeroSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTag" ADD CONSTRAINT "ProjectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectsData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
