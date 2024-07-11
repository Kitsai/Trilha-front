'use client'

import { CheckSquare, NotepadText, Square } from "lucide-react";

import { Montserrat,  Patrick_Hand} from "next/font/google";
import { FormEvent, useState } from "react";

const montserrat = Montserrat({subsets: ['latin']});
const patrick = Patrick_Hand({ weight: "400",subsets: ['latin']})

interface Tarefa {
	id: number,
	content: string,
	completed: boolean,
}

export default function Home() {
	const [tarefas, setTarefas] = useState<Tarefa[]>([]);

	function addNewTarefa(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const novaTarefa = data.get('tarefa')?.toString();

		if (!novaTarefa) {
			return;
		}

		setTarefas(
			[
				...tarefas,
				{
					id: tarefas.length + 1,
					content: novaTarefa,
					completed: false
				}
			]
		)

		event.currentTarget.reset();
	}

  	return (
     	<div className="h-screen w-screen outline-1 outline-black flex flex-col items-center justify-center">
			<main className="flex flex-col space-y-2 max-w-1/4 w-1/4 h-1/2">
				<div className="flex items-center gap-2 sm: lg:text-5xl ">
					PraFazê!
					<NotepadText className="size-12"/>
				</div>
				<div className="outline outline-1 outline-black h-auto rounded-xl flex flex-col">
					<div className="p-3 space-y-3 h-[40dvh]">
						<form onSubmit={addNewTarefa} className="flex items-center justify-between gap-6 h-12">
							<div className="outline outline-2 rounded-lg px-2.5 h-full flex items-center flex-1 justify-between">
								<input 
									type="text" 
									name="tarefa"
									placeholder="Nova tarefa"
									className="outline-none"
								/>
								<span className="outline outline-1 outline-enter p-1 rounded-md shadow-enter size-8 text-zinc-400 text-xs flex items-center justify-center">
									Enter
								</span>
							</div>
							<button type="submit" className="bg-black text-white rounded-lg py-3 px-4">
								Button
							</button>
						</form>
				
						<div className="outline outline-1 outline-black"/>

						<div className="py-3 flex flex-col space-y-3">
							{tarefas.map(tarefa => {
								return (
									<div key={tarefa.id} className="flex items-center gap-2">
										{tarefa.completed ? (<CheckSquare className="size-6"/>) : (<Square className="size-6"/>)}
										<span className="text-lg">{tarefa.content}</span>
									</div>
								)
							})}
						</div>

					</div>
					<div className="shadow-footer flex items-center justify-between p-4">
						<span className="text-zinc-500 text-xs">{tarefas.filter(tarefa => !tarefa.completed).length} items remaining</span>
						<div className="flex items-center justify-center gap-1">
							<span className="text-zinc-500 text-xs">Tudo</span>
							<span className="text-zinc-500 text-xs">Ativas</span>
							<span className="text-zinc-500 text-xs">Completas</span>
						</div>
						<span className="text-zinc-500 text-xs">Limpar completas</span>
					</div>
				</div>
			</main>
     	</div>
  	)
}
