import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { perplexityService } from "../services/perplexity/perplexityService";
import { Project } from "../types";

const prisma = new PrismaClient();

interface TechStack {
  name: string;
}

interface Feature {
  name: string;
}

interface ProjectType {
  name: string;
}

interface PrismaProject {
  id: string;
  title: string;
  description: string;
  techStack: TechStack[];
  features: Feature[];
  projectType: ProjectType[];
  theme: string;
  difficulty: string;
}

export const getProjectResources = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        techStack: true,
        features: true,
        projectType: true,
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const formattedProject: Project = {
      id: project.id,
      title: project.title,
      description: {
        summary: project.description,
        keyPoints: [],
      },
      techStack: project.techStack.map((tech: TechStack) => tech.name),
      features: project.features.map((feature: Feature) => feature.name),
      theme: project.theme,
      difficulty: project.difficulty,
      projectType: project.projectType.map((type: ProjectType) => type.name),
      learningOutcomes: [],
      resources: [],
      prerequisites: [],
      challenges: [],
      tips: [],
    };

    const resources = await perplexityService.searchProjectResources(
      formattedProject,
      {
        difficulty: formattedProject.difficulty,
        preferredTech: formattedProject.techStack,
        theme: formattedProject.theme,
      }
    );
    res.json(resources);
  } catch (error) {
    console.error("Error in getProjectResources:", error);
    res.status(500).json({ error: "Failed to get project resources" });
  }
};
