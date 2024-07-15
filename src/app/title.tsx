import { NotepadText } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({subsets: ['latin']});

export function Title() {
    return (
        <div className={`${montserrat.className} flex items-center gap-2 text-5xl `}>
            PraFazê!
            <NotepadText className="size-12"/>
        </div> 
    )
}