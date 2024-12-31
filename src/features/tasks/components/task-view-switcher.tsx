"use client";
import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateTaskModal } from "@/hooks/use-create-task-modal";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useQueryState } from "nuqs";
import DataFilters from "@/components/data-filters";
import { useTaskFilters } from "@/hooks/use-task-filters";

const TaskViewSwitcher = () => {
  const workspaceId = useWorkspaceId();
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });
  const [{ status, assigneedId, projectId, dueDate }, setFilters] =
    useTaskFilters();
  const { open } = useCreateTaskModal();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    assigneedId,
    status,
    dueDate,
  });
  return (
    <Tabs
      className="flex-1 w-full border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calender">
              Calenger
            </TabsTrigger>
          </TabsList>
          <Button size={"sm"} className="w-full lg:w-auto" onClick={open}>
            <Plus className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex-col items-center justify-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              data table
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              data kanban
            </TabsContent>
            <TabsContent value="calender" className="mt-0">
              data calender
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
