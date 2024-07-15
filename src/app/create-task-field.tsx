import { FormEvent } from "react"

interface CreateTaskFieldProps {
    addNewTarefa: (event: FormEvent<HTMLFormElement>) => void
}

export function CreateTaskField({addNewTarefa}: CreateTaskFieldProps) {
    return (
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
    )
}