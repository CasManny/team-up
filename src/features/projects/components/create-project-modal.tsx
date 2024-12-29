"use client";
import { ResposiveModal } from "@/components/responsive-modal";
import { useCreateProjectModal } from "@/hooks/use-create-project-modal";
import { CreateProjectForm } from "./create-project-form";

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();
  return (
    <ResposiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResposiveModal>
  );
};
