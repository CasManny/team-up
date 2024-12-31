"use client";
import { ResposiveModal } from "@/components/responsive-modal";
import { useCreateTaskModal } from "@/hooks/use-create-task-modal";
import React from "react";
import CreateTaskFormWrapper from "./create-task-form-wrapper";

const CreateTaskModal = () => {
  const { isOpen, close, setIsOpen } = useCreateTaskModal();
  return (
    <ResposiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResposiveModal>
  );
};

export default CreateTaskModal;
