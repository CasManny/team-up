import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import WorkspaceIdSettingsClient from "./client";

interface WorkspaceIdSettingsProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettings = async ({ params }: WorkspaceIdSettingsProps) => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <WorkspaceIdSettingsClient />
  );
};

export default WorkspaceIdSettings;
