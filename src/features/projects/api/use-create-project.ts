import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"

type RequestType = InferRequestType<typeof client.api.projects['$post']>
type ResponseType = InferResponseType<typeof client.api.projects['$post'], 200>

export const useCreateProject = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({form}) => {
            const res = await client.api.projects['$post']({ form })
            if (!res.ok) {
                throw new Error("Failed to create a project")
            }
            return await res.json()
        },
        onSuccess: () => {
            toast.success("project created")
            queryClient.invalidateQueries({queryKey: ['projects']})
        },
        onError: () => {
            toast.error("Failed to create project")
        }
    })

    return mutation
}