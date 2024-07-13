'use client'

import { CheckSquare, NotepadText, Square } from "lucide-react";

import { Montserrat,  Patrick_Hand} from "next/font/google";
import { FormEvent, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({subsets: ['latin']});
const patrick = Patrick_Hand({ weight: "400",subsets: ['latin']})

interface Tarefa {
	id: number,
	content: string,
	completed: boolean,
}

enum TarefaFilter {
	Todas,
	Ativas,
	Completas
}

export default function Home() {
	const [tarefas, setTarefas] = useState<Tarefa[]>([]);
	const [filter, setFilter] = useState<TarefaFilter>(TarefaFilter.Todas);
	const [counter, setCounter] = useState(0);

	function addNewTarefa(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const novaTarefa = data.get('tarefa')?.toString();

		if (!novaTarefa) {
			return;
		}

		setTarefas(
			[
				{
					id: counter,
					content: novaTarefa,
					completed: false
				},
				...tarefas,
			]
		)

		setCounter(counter + 1);

		toast.info("Nova tarefa cadastrada!", {
			position: "top-center",
			closeOnClick: true,
			theme: "light"
		});

		event.currentTarget.reset();
	}

	function completeTask(taskId: number) {
		setTarefas([...tarefas.map((tarefa) => {
			if(tarefa.id === taskId) {
				tarefa.completed = true;
			}
			return tarefa;
		})])
	}	

	function uncompleteTask(taskId: number) {
		setTarefas([...tarefas.map((tarefa) => {
			if(tarefa.id === taskId) {
				tarefa.completed = false;
			}
			return tarefa;
		})])
	}

	function limpaCompletas() {
		setTarefas([
			...tarefas.filter(tarefa => !tarefa.completed)
		]);
	}

	function filterTodas() {
		setFilter(TarefaFilter.Todas);
	}

	function filterAtivas() {
		setFilter(TarefaFilter.Ativas);
	}

	function filterCompletas() {
		setFilter(TarefaFilter.Completas);
	}

  	return (
     	<div className="h-screen w-screen outline-1 outline-black flex flex-col items-center justify-center">
			<ToastContainer 
				position="top-center"
				closeOnClick
				pauseOnHover={false}
				theme="colored"
				toastClassName={() => "flex items-center bg-primary text-black"}
				autoClose={3000}
			/>
			<main className="flex flex-col space-y-2 max-w-1/4 justify-center">
				<div className="flex items-center gap-2 sm: lg:text-5xl ">
					PraFazê!
					<NotepadText className="size-12"/>
				</div>
				<div className="outline outline-1 outline-black h-5/6 rounded-xl flex flex-col">
					<div className="p-3 space-y-3 h-[60dvh]">
						<form onSubmit={addNewTarefa} className="flex items-center justify-between gap-6 h-12">
							<div className="outline outline-2 rounded-lg px-2.5 h-full flex items-center flex-1 justify-between">
								<input 
									type="text" 
									name="tarefa"
									placeholder="Nova tarefa"
									className="outline-none"
								/>
								<span className="outline outline-1 outline-enter p-1 rounded-md shadow-enter size-8 text-zinc-400 text-xs flex items-baseline justify-center">
									Enter
								</span>
							</div>
							<button type="submit" className="bg-black text-white rounded-lg py-3 px-4">
								Button
							</button>
						</form>
				
						<div className="outline outline-1 outline-black"/>

						<div className="py-3 flex flex-col space-y-3">
							{tarefas.filter(tarefa => {
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
							}).map(tarefa => {
								return (
									tarefa.completed ? (
										<div key={tarefa.id} className="flex items-center gap-2">
											<button onClick={() => uncompleteTask(tarefa.id)}>
												<CheckSquare className="size-6"/>
											</button>
											<span className="text-lg line-through text-zinc-400">{tarefa.content}</span>
										</div>
									) : (
										<div key={tarefa.id} className="flex items-center gap-2">
											<button onClick={() => completeTask(tarefa.id)}>
												<Square className="size-6"/>
											</button>
											<span className="text-lg">{tarefa.content}</span>
										</div>
									)
								)
							})}
						</div>

					</div>
					<div className="shadow-footer flex items-center justify-between p-4">
						<span className="text-zinc-500 text-xs">{tarefas.filter(tarefa => !tarefa.completed).length} items remaining</span>
						<form className="flex items-center justify-center gap-1">
							{filter === TarefaFilter.Todas ? (<button disabled={true} className="text-zinc-900 text-sm">Tudo</button>):(<button onClick={filterTodas} className="text-zinc-500 text-xs">Tudo</button>)}
							{filter === TarefaFilter.Ativas ? (<button disabled={true} className="text-zinc-900 text-sm">Ativas</button>):(<button onClick={filterAtivas} className="text-zinc-500 text-xs">Ativas</button>)}
							{filter === TarefaFilter.Completas ? (<button disabled={true} className="text-zinc-900 text-sm">Completas</button>):(<button onClick={filterCompletas} className="text-zinc-500 text-xs">Completas</button>)}
						</form>
						<button disabled={tarefas.filter(tarefa => tarefa.completed).length === 0} onClick={limpaCompletas} className="text-zinc-500 text-xs hover:text-zinc-900">Limpar completas</button>
					</div>
				</div>
			</main>
     	</div>
  	)
}
