import { TaskStatus } from "@/features/tasks/types"
import { parseAsString, parseAsStringEnum, parseAsStringLiteral, useQueryStates } from "nuqs"

export const useTaskFilters = () => {
    return useQueryStates({
        projectId: parseAsString,
        status: parseAsStringEnum(Object.values(TaskStatus)),
        assigneedId: parseAsString,
        search: parseAsString,
        dueDate: parseAsString,
    })
}