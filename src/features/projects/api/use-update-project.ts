import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type RequestType = InferRequestType<typeof client.api.projects[":projectId"]['$patch']>
type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]['$patch'], 200>

export const useUpdateProject = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({form, param}) => {
            const res = await client.api.projects[":projectId"]['$patch']({ form, param })
            if (!res.ok) {
                throw new Error("Failed to update project")
            }
            return await res.json()
        },
        onSuccess: ({data}) => {
            toast.success("project updated")
            router.refresh()
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['projects', data.$id]})
        },
        onError: () => {
            toast.error("Failed to update project")
        }
    })

    return mutation
}