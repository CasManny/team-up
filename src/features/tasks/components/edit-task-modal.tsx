"use client";
import { ResposiveModal } from "@/components/responsive-modal";
import { useEditTaskModal } from "@/hooks/use-edit-task-modal";
import EditTaskFormWrapper from "./edit-task-form-wrapper";

const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();
  return (
    <ResposiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper onCancel={close} id={taskId} />}
    </ResposiveModal>
  );
};

export default EditTaskModal;
