import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { Pencil, XIcon } from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import { useState } from "react";
import { useUpdateTask } from "../api/use-update-task";
import { Textarea } from "@/components/ui/textarea";

interface TaskDescriptionProps {
  task: Task;
}
const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);
  const { mutate: updateTask, isPending } = useUpdateTask();

  const handleSave = () => {
    updateTask({
      json: { description: value },
      param: { taskId: task.$id },
    }, {
      onSuccess: () => {
        setIsEditing(false)
      }
    });
  };
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">OverView</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size={"sm"}
          variant={"secondary"}
        >
          {isEditing ? (
            <XIcon className="size-4" />
          ) : (
            <Pencil className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-4">
          <Textarea
            placeholder="Add a description"
            value={value}
            rows={4}
            disabled={isPending}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button disabled={isPending} onClick={handleSave} size={'sm'} className="w-fit ml-auto">
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      ) : (
        <div className="">
          {task.description || (
            <span className="text-muted-foreground">No description set</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
