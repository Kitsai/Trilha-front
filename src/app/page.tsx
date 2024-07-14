'use client'

import { CheckCircle2, CheckSquare, NotepadText, Square } from "lucide-react";

import { FormEvent, useState } from "react";

import 'react-toastify/dist/ReactToastify.css';

import { Montserrat,  Patrick_Hand} from "next/font/google";
import ProgressBar from "@ramonak/react-progress-bar";
import { toast, ToastContainer } from "react-toastify";

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

		toast("Nova tarefa cadastrada!", {
			icon: () => <CheckCircle2 className="size-6 text-black"/>,
			className: "bg-primary flex items-center justify-center py-2.5 py-4 outline outline-black outline-2",
			bodyClassName: `${patrick.className} text-black text-base`,
			progressClassName: "bg-secondary"
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
				toastClassName={() => "flex items-center justify-center p-1 rounded-lg outline outline-2"}
				pauseOnHover={false}
				theme="colored"
				autoClose={3000}
			/>
			 
			<main className="flex flex-col w-[461px] justify-center">
				<div className={`${montserrat.className} flex items-center gap-2 text-5xl `}>
					PraFazê!
					<NotepadText className="size-12"/>
				</div>
				<div className={`${patrick.className} outline outline-1 outline-black h-5/6 rounded-lg flex flex-col justify-between `}>
					<div className="p-3 space-y-3 max-h-fit">
						<form onSubmit={addNewTarefa} className="flex items-center justify-between gap-6 h-12">
							<div className="outline outline-2 rounded-lg px-2.5 h-full flex items-center flex-1 justify-between">
								<input 
									type="text" 
									name="tarefa"
									placeholder="Nova tarefa"
									className="outline-none text-lg"
								/>
								<span className="outline outline-1 outline-enter p-1 rounded-md shadow-enter size-8 text-zinc-400 text-xs flex items-center justify-center">
									Enter
								</span>
							</div>
							<button type="submit" className="bg-black text-white text-xl rounded-lg py-3 px-4">
								Button
							</button>
						</form>

						<ProgressBar completed={tarefas.filter(tarefa => tarefa.completed).length/tarefas.length * 100} bgColor="black" height="12px" className="h-1" isLabelVisible={false}/>
					</div>

					<section className={`flex flex-col space-y-3 max-h-[50dvh] h-[50dvh] p-3 ${tarefas.length > 9 && "overflow-y-scroll"} `}>
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
									<div key={tarefa.id} className="flex items-center gap-2 h-fit">
										<button onClick={() => uncompleteTask(tarefa.id)}>
											<CheckSquare className="size-6"/>
										</button>
										<span className="text-lg line-through text-zinc-400">{tarefa.content}</span>
									</div>
								) : (
									<div key={tarefa.id} className="flex items-center gap-2 h-fit">
										<button onClick={() => completeTask(tarefa.id)}>
											<Square className="size-6"/>
										</button>
										<span className="text-lg">{tarefa.content}</span>
									</div>
								)
							)
						})}
					</section>
					<div className="shadow-footer flex items-center justify-between p-4 shrink-0 mt-auto ">
						<span className="text-zinc-500 text-sm">{tarefas.filter(tarefa => !tarefa.completed).length} items remaining</span>
						<form className="flex items-center justify-center gap-4 text-sm">
							{filter === TarefaFilter.Todas ? (<button disabled={true} className="text-black text-sm">Tudo</button>):(<button onClick={filterTodas} className="text-zinc-500 text-sm">Tudo</button>)}
							{filter === TarefaFilter.Ativas ? (<button disabled={true} className="text-black text-sm">Ativas</button>):(<button onClick={filterAtivas} className="text-zinc-500 text-sm">Ativas</button>)}
							{filter === TarefaFilter.Completas ? (<button disabled={true} className="text-black text-sm">Completas</button>):(<button onClick={filterCompletas} className="text-zinc-500 text-sm">Completas</button>)}
						</form>
						<button disabled={tarefas.filter(tarefa => tarefa.completed).length === 0} onClick={limpaCompletas} className="text-zinc-500 text-sm enabled:hover:text-zinc-900 enabled:cursor-pointer">Limpar completas</button>
					</div>
				</div>
			</main>
     	</div>
  	)
}
