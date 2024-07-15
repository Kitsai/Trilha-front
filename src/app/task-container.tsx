import { TarefaFilter } from "./page";
import { Tarefa, Task } from "./task";


interface TaskContainerProps {
    tarefas: Tarefa[],
    filter: TarefaFilter,
    uncompleteTask: (taskId: number) => void,
    completeTask: (taskId: number) => void
}

export function TaskContainer(
    {
        tarefas,
        filter,
        uncompleteTask,
        completeTask
    }:TaskContainerProps
) {

    const tarefasFiltradas = tarefas.filter(tarefa => {
        switch (filter) {
            case TarefaFilter.Todas: {
                return true;
            }
            case TarefaFilter.Ativas: {
                return !tarefa.completed;
            }
            case TarefaFilter.Completas: {
                return tarefa.completed;
            }
            default: {
                return false;
            }
        }
    });

    return (
        <section className={`flex flex-col space-y-3 max-h-[50dvh] h-[50dvh] p-3 ${tarefasFiltradas.length > 9 && "overflow-y-scroll"} `}>
            {tarefasFiltradas.map(tarefa => {
                return (
                    <Task 
                        tarefa={tarefa}
                        completeTask={completeTask}
                        uncompleteTask={uncompleteTask}
                    />
                )
            })}
        </section>
    )
}