'use client'
import Image from "next/image";
import Sidebar from "../components/sidebar";
import MatchCard from "@/components/matchCard";
import { Button } from "@/components/ui/button";
import { Match } from "@/types/match";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
 
export default function Home() {
const [matches, setMatches] = useState<Match[]>([]);
const fetchMatches = async () => {
  try{
     const response = await fetch('http://localhost:3333/partidas');
      const data = await response.json();
      const partidasFormatadas: Match[] = data.map((partida: any) => ({
          id: partida.id,
          date: new Date(partida.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
          estadio: partida.estadio,
          timeCasa: {
            name: partida.timeCasa,
            logo: partida.escudoTimeCasa || ''
          },
          rival: {
            name: partida.rival,
            logo: partida.escudoRival || ''
          },
          placarCasa: partida.placarCasa,
          placarRival: partida.placarFora,
          status: partida.resultado,
          colegas: partida.colegas.map((colega: any) => ({
            id: colega.id,
            nome: colega.nome
          })),

          campeonato: partida.campeonato
      }));
      setMatches(partidasFormatadas);
  }
  catch(error){
      console.error("Erro ao buscar partidas:", error);
  }  
}

useEffect(() => {
  fetchMatches();
}, []);


const handleDelete = async (id: string) => {
    if(!confirm("Apagar partida?")) return;

    try {
        await fetch(`http://localhost:3333/partidas/${id}`, {
            method: 'DELETE'
        });
        setMatches(matches.filter(m => m.id !== id));
    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao deletar partida.");
    }
  }

 return (
    <div className="flex h-screen w-full bg-slate-950 text-white overflow-hidden">
      
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-8 scroll-smooth">
        
        <h1 className="text-2xl font-bold mb-6">Minhas Partidas</h1>
        
       
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {matches.map((partida) => (
              <MatchCard onDelete={() => handleDelete(partida.id)} key={partida.id} match={partida} />             
            ))}
        </div>

      </main>
    </div>
  );
}
