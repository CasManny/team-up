import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.tasks)[":taskId"]["$delete"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":taskId"]["$delete"],
  200
>;

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.tasks[":taskId"]["$delete"]({ param });
      if (!res.ok) {
        throw new Error("Failed to delete task");
      }
      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("task deleted");
      queryClient.invalidateQueries({ queryKey: ["tasks", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  return mutation;
};
