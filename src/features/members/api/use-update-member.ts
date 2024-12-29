import { client } from "@/lib/rpc"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"
type ResponseType = InferResponseType<typeof client.api.members[":memberId"]['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.members[":memberId"]['$patch']>

export const useUpdateMember = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({param, json}) => {
            const res = await client.api.members[":memberId"]['$patch']({param, json})
            if (!res.ok) {
                throw new Error("Failed to update member role")
            }
            return await res.json()
        },
        onSuccess: () => {
            toast.success("member updated")
            queryClient.invalidateQueries({ queryKey: ['members'] })
        },
        onError: () => {
            toast.error("Failed to update member")
        }
    })
    return mutation
}