"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInviteCode } from "@/hooks/use-invite-code";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJoinWorkspace } from "../api/use-join-workspace";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}
export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const { mutate, isPending } = useJoinWorkspace();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex items-center gap-2 flex-col lg:flex-row justify-between">
          <Button
            size={"lg"}
            className="w-full lg:w-fit"
            variant={"secondary"}
            type="button"
            asChild
            disabled={isPending}
          >
            <Link href={"/"}>cancel</Link>
          </Button>
          <Button onClick={onSubmit} className="w-full lg:w-fit" size={"lg"} disabled={isPending}>
            Join workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
