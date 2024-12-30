import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/queries";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { getProject } from "@/features/projects/queries";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

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

  const initialValues = await getProject({ projectId: params.projectId });

  if (!initialValues) {
    throw new Error("Project not found");
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            className="size-8"
            name={initialValues.name}
            image={initialValues.imageUrl}
          />
          <p className="text-lg font-semibold">{initialValues.name}</p>
        </div>
        <Button variant={"secondary"} size={"sm"} asChild>
          <Link
            href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
          >
            <Pencil className="size-4 mr-2" />
            Edit project
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectIdpage;
