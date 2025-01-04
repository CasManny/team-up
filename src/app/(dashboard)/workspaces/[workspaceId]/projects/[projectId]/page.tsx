import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import ProjectIdClient from "./client";

interface ProjectIdpageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdpage = async ({ params }: ProjectIdpageProps) => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <ProjectIdClient />
  );
};

export default ProjectIdpage;
