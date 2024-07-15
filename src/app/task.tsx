import { CheckSquare, Square, Trash } from "lucide-react";

export interface Tarefa {
	id: number,
	content: string,
	completed: boolean,
}

interface TaskProps {
    tarefa: Tarefa,
    completeTask: (taskId: number) => void,
    uncompleteTask: (taskId: number) => void,
    deleteTask: (taskId:number) => void
}

export function Task(
    {
        tarefa,
        completeTask,
        uncompleteTask,
        deleteTask
    }: TaskProps
) {
    return (
        <div className="flex items-center justify-between">
            <div key={tarefa.id} className="flex items-center gap-2 h-fit">
                <button onClick={() => tarefa.completed ? uncompleteTask(tarefa.id) : completeTask(tarefa.id)}>
                    {tarefa.completed ? (<CheckSquare className="size-6 dark:text-primary"/>) : (<Square className="size-6 dark:text-primary"/>)}
                </button>
                <span className={`text-lg dark:text-primary ${tarefa.completed && "line-through text-zinc-400"}`}>{tarefa.content}</span>
            </div>
            <button onClick={() => deleteTask(tarefa.id)}>
                <Trash className="text-secondary"/>
            </button>
        </div>
        
    )
}