import { useCallback, useEffect, useState } from "react";
import { Task, TaskStatus } from "../types";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import KanbanColumnHeader from "./kanban-column-header";
import KanbanCard from "./kanban-card";

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

type TasksState = {
  [key in TaskStatus]: Task[];
};

interface DataKanbanProps {
  data: Task[];
  onChange: (
    tasks: { $id: string; status: TaskStatus; position: number }[]
  ) => void;
}

export const DataKanban = ({ data, onChange }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };
    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort((a, b) => a.positon - b.positon);
    });

    return initialTasks;
  });

  useEffect(() => {
    const newTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };
    data.forEach((task) => {
      newTasks[task.status].push(task);
    });

    Object.keys(newTasks).forEach((status) => {
      newTasks[status as TaskStatus].sort((a, b) => a.positon - b.positon);
    });

    setTasks(newTasks)
  }, [data]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const { source, destination } = result;
      const sourceStatus = source.droppableId as TaskStatus;
      const destStatus = destination.droppableId as TaskStatus;
      let updatesPayload: {
        $id: string;
        status: TaskStatus;
        position: number;
      }[] = [];
      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        // safely remove the task from the source column
        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);
        // if there's no moved task shouldn't happen, but just in case return state
        if (!movedTask) {
          console.log("No task found at the source index");
          return prevTasks;
        }

        // create a new task object with potentially update status
        const updatedMovedTask =
          sourceStatus !== destStatus
            ? { ...movedTask, status: destStatus }
            : movedTask;
        // update the source column
        newTasks[sourceStatus] = sourceColumn;
        // add the task to th destination columns
        const destColumn = [...newTasks[destStatus]];

        destColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destStatus] = destColumn;
        // prepare minimal update payloads
        updatesPayload = [];
        updatesPayload.push({
          $id: updatedMovedTask.$id,
          status: destStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000),
        });

        // update position for affected tasks in the destination

        newTasks[destStatus].forEach((task, index) => {
          if (task && task.$id !== updatedMovedTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.positon !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                status: destStatus,
                position: newPosition,
              });
            }
          }
        });

        // if the task has been moved between column, update the positions in th source columns
        if (sourceStatus !== destStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min((index + 1) * 1000, 1_000_000);
              if (task.positon !== newPosition) {
                updatesPayload.push({
                  $id: task.$id,
                  status: sourceStatus,
                  position: newPosition,
                });
              }
            }
          });
        }

        return newTasks;
      });
      onChange(updatesPayload);
    },
    [onChange]
  );
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
              key={board}
            >
              <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
              />
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    className="min-h-[200px] py-1.5"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks[board].map((task, index) => (
                      <Draggable
                        index={index}
                        key={task.$id}
                        draggableId={task.$id}
                      >
                        {(provided) => (
                          <div
                            className=""
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
