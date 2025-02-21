import { createSessionClient } from "@/lib/appwrite";
import { getMember } from "../members/utils";
import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { Project } from "./types";

interface GetProjectIdProps {
  projectId: string;
}

export const getProject = async ({ projectId }: GetProjectIdProps) => {
  try {
    const { databases, account } = await createSessionClient();
    const user = await account.get();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    const member = await getMember({
      databases,
      workspaceId: project.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return null;
    }

    return project;
  } catch (error) {
    console.log(error);
  }
};
