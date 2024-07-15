import { TarefaFilter } from "./page"
import { Tarefa } from "./task"

interface FooterProps {
    filter: TarefaFilter,
    tarefas:  Tarefa[],
    filterTodas: () => void,
    filterAtivas: () => void,
    filterCompletas: () => void,
    limpaCompletas: () => void
}


export function Footer({
    filter, 
    tarefas, 
    filterAtivas,
    filterCompletas,
    filterTodas,
    limpaCompletas 
}: FooterProps) {
    return (
        <div className="shadow-footer flex items-center justify-between p-4 shrink-0 mt-auto ">
            <span className="text-zinc-500 text-sm">{tarefas.filter(tarefa => !tarefa.completed).length} items remaining</span>
            <form className="flex items-center justify-center gap-4 text-sm">
                {filter === TarefaFilter.Todas ? (<button disabled={true} className="text-black text-sm">Tudo</button>):(<button onClick={filterTodas} className="text-zinc-500 text-sm">Tudo</button>)}
                {filter === TarefaFilter.Ativas ? (<button disabled={true} className="text-black text-sm">Ativas</button>):(<button onClick={filterAtivas} className="text-zinc-500 text-sm">Ativas</button>)}
                {filter === TarefaFilter.Completas ? (<button disabled={true} className="text-black text-sm">Completas</button>):(<button onClick={filterCompletas} className="text-zinc-500 text-sm">Completas</button>)}
            </form>
            <button disabled={tarefas.filter(tarefa => tarefa.completed).length === 0} onClick={limpaCompletas} className="text-zinc-500 text-sm enabled:hover:text-zinc-900 enabled:cursor-pointer">Limpar completas</button>
        </div>
    )
}