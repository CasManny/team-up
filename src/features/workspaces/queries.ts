import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { Workspace } from "./types";

export const getCurrentWorkspaces = async () => {
  try {
   const {account, databases} = await createSessionClient()
    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
      return { documents: [], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.contains("$id", workspaceIds), Query.orderDesc("$createdAt")]
    );

    return workspaces;
  } catch (error) {
    console.log(error)
    return { documents: [], total: 0 };
  }
};

export const getCurrentWorkspace = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {

    const {databases } = await createSessionClient()
   

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId
    );

    return workspace
  } catch {
    return null;
  }
};
