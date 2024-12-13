import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.login.$post({ json });
      if (!res.ok) {
        throw new Error("Failed to log in");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to log in");
    },
  });
  return mutation;
};
