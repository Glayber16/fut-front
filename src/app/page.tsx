'use client'
import Image from "next/image";
import Sidebar from "../components/sidebar";
import MatchCard from "@/components/matchCard";
import { Button } from "@/components/ui/button";
import { Match } from "@/types/match";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CreateMatchModal from "@/components/createMatchModal";
 const PARTIDAS_MOCK: Match[] = [
  {
    id: "1",
    date: "24/01/2026",
    estadio: "Castelão",
    status: "VITORIA",
    placarCasa: 3,
    placarRival: 1,
    timeCasa: { name: "Meu Time", logo: "https://upload.wikimedia.org/wikipedia/pt/f/fb/CaucaiaEC2019.png" }, 
    rival: { name: "Rivais FC", logo: "https://upload.wikimedia.org/wikipedia/pt/d/d6/Maracanã_Esporte_Clube.png" },
    colegas: [
        { id: "1", nome: "Guilherme" },
        { id: "2", nome: "Paulo" }
      ],
      campeonato: "Cearense 2026"
  },
  
]
export default function Home() {
const [matches, setMatches] = useState<Match[]>(PARTIDAS_MOCK);

 return (
    <div className="flex h-screen w-full bg-slate-950 text-white overflow-hidden">
      
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-8 scroll-smooth">
        
        <h1 className="text-2xl font-bold mb-6">Minhas Partidas</h1>
        
       
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {matches.map((partida) => (
              <MatchCard onDelete={() => console.log("deletado")} key={partida.id} match={partida} />             
            ))}
        </div>

      </main>
    </div>
  );
}
