import { CheckSquare, Square } from "lucide-react";
import { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants"

export interface Tarefa {
	id: number,
	content: string,
	completed: boolean,
}

interface TaskProps {
    tarefa: Tarefa,
    completeTask: (taskId: number) => void,
    uncompleteTask: (taskId: number) => void
}

export function Task(
    {
        tarefa,
        completeTask,
        uncompleteTask
    }: TaskProps
) {
    return (
        <div key={tarefa.id} className="flex items-center gap-2 h-fit">
            <button onClick={() => tarefa.completed ? uncompleteTask(tarefa.id) : completeTask(tarefa.id)}>
                {tarefa.completed ? (<CheckSquare className="size-6"/>) : (<Square className="size-6"/>)}
            </button>
            <span className={`text-lg ${tarefa.completed && "line-through text-zinc-400"}`}>{tarefa.content}</span>
        </div>
    )
}