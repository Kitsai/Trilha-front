import { Moon, NotepadText, Sun } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({subsets: ['latin']});

interface TitleProps {
    darkMode: boolean,
    toggleDarkMode: () => void
}

export function Title({darkMode, toggleDarkMode}:TitleProps) {
    return (
        <div className="flex items-center justify-between">
            <div className={`${montserrat.className} flex items-center gap-2 text-5xl dark:text-secondary`}>
                PraFazê!
                <NotepadText className="size-12 dark:text-secondary"/>
            </div> 
            <button onClick={toggleDarkMode}>
                {darkMode ? (<Sun className="dark:text-secondary"/>):(<Moon/>)}
            </button>
        </div>
    )
}