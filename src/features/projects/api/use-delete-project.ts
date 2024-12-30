import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>;

export const useDeleteProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.projects[":projectId"]["$delete"]({ param });
      if (!res.ok) {
        throw new Error("Failed to delete project");
      }
      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("project deleted");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  return mutation;
};
