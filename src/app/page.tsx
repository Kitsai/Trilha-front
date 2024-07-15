'use client'

import { CheckCircle2 } from "lucide-react";

import { FormEvent, useState } from "react";

import 'react-toastify/dist/ReactToastify.css';

import { Patrick_Hand} from "next/font/google";
import ProgressBar from "@ramonak/react-progress-bar";
import { toast, ToastContainer } from "react-toastify";
import { Title } from "./title";
import { CreateTaskField } from "./create-task-field";
import { Footer } from "./footer";
import { TaskContainer } from "./task-container";
import { Tarefa } from "./task";


const patrick = Patrick_Hand({ weight: "400",subsets: ['latin']})

export enum TarefaFilter {
	Todas,
	Ativas,
	Completas
}

export default function Home() {
	const [tarefas, setTarefas] = useState<Tarefa[]>([]);
	const [filter, setFilter] = useState<TarefaFilter>(TarefaFilter.Todas);
	const [counter, setCounter] = useState(0);
	const [darkMode, setDarkMode] = useState(false)

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

	function deleteTask(taskId: number) {
		setTarefas([
			...tarefas.filter(tarefa => tarefa.id !== taskId)
		])
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

	function toggleDarkMode() {
		setDarkMode(!darkMode);
	}

  	return (
     	<div className={`h-screen w-screen outline-1 outline-black flex flex-col items-center justify-center ${darkMode && "dark"} dark:bg-black`}>
			<ToastContainer 
				position="top-center"
				closeOnClick
				toastClassName={() => "flex items-center justify-center p-1 rounded-lg outline outline-2"}
				pauseOnHover={false}
				theme="colored"
				autoClose={3000}
			/>
			 
			<main className="flex flex-col w-[461px] justify-center dark:bg-black">
				
				<Title darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>

				<div className={`${patrick.className} outline outline-1 outline-black dark:outline-secondary h-5/6 rounded-lg flex flex-col justify-between `}>
					<div className="p-3 space-y-3 max-h-fit">
						<CreateTaskField addNewTarefa={addNewTarefa}/>

						<ProgressBar completed={tarefas.filter(tarefa => tarefa.completed).length/tarefas.length * 100} bgColor={darkMode ? "rgb(222, 108, 92)" : "black"} height="12px" className="h-1" isLabelVisible={false}/>
					</div>

					<TaskContainer 
						completeTask={completeTask}
						uncompleteTask={uncompleteTask}
						filter={filter}
						tarefas={tarefas}
						deleteTask={deleteTask}
					/>

					<Footer 
						filter={filter}
						filterAtivas={filterAtivas}
						filterCompletas={filterCompletas}
						filterTodas={filterTodas}
						tarefas={tarefas}
						limpaCompletas={limpaCompletas}
					/>
				</div>
			</main>
     	</div>
  	)
}
