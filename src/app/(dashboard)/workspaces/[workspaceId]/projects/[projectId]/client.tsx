"use client"
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import { useProjectId } from "@/hooks/use-project-id";
import { Pencil } from "lucide-react";
import Link from "next/link";

const ProjectIdClient = () => {
  const projectId = useProjectId();
  const { data: initialValues, isLoading } = useGetProject({ projectId });
  if (isLoading) {
    return <PageLoader />;
  }
    if (!initialValues) {
        return <PageError message="Project not found" />
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
      <TaskViewSwitcher />
    </div>
  );
};

export default ProjectIdClient;
