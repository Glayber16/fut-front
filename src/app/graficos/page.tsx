"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar' 
import {StatsData} from '@/types/graficos'



export default function GraficosPage() {
  const [stats, setStats] = useState<StatsData | null>(null);

  const getDdadosEstatistica = async () => {
    try {
      const response = await fetch('http://localhost:3333/partidas/estatisticas');
      const data = await response.json();
      setStats(data);
    }
    catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  }
useEffect(() => {
    getDdadosEstatistica();
  }, []);
 
  return (
    <div className="flex h-screen w-full bg-slate-950 text-white overflow-hidden">
      <Sidebar />
      <main className='flex-1 h-full overflow-y-auto justify-center flex p-8'>
        <h1 className='text-3xl font-bold '>Graficos</h1>
      </main>
       
    </div>
  )
}