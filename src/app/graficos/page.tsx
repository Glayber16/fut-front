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

    <main className="flex-1 h-full overflow-y-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Estatísticas
      </h1>

      {stats && (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2  gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg text-slate-400 mb-2">Total de Jogos</h2>
            <p className="text-4xl font-bold text-emerald-400">
              {stats.totalJogos}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg text-slate-400 mb-4">Resultados</h2>
            <ul className="space-y-2">
              {stats.resultados.map((resultado, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-slate-800/50 rounded-lg px-4 py-2"
                >
                  <span className="font-medium">{resultado.tipo}</span>
                  <span className="font-bold text-violet-400">
                    {resultado.quantidade}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg text-slate-400 mb-4">Companhia mais presente</h2>
            <ul className="space-y-2">
              {stats.topColegas.map((statsData, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-slate-800/50 rounded-lg px-4 py-2"
                >
                  <span className="font-medium">{statsData.nome}</span>
                  <span className="font-bold text-emerald-400">
                    {statsData.jogos}
                  </span>
                </li>
              ))}
              {stats.jogosSozinho > 0 && (
                <li className="flex justify-between items-center bg-slate-800/50 rounded-lg px-4 py-2" >
                  <span className="font-medium">Assisti sozinho</span>
                  <span className="font-bold text-emerald-400">
                    {stats.jogosSozinho}
                  </span>
                </li>
              )
                  }
            </ul>
          </div>

          <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg'>
              <h2 className='text-lg text-slate-400 mb-4'>Resultados por Companhia</h2>
              <ul className='space-y-2'>
                {stats.topColegas.map((statsData, index) => (
                  <li
                    key={index}
                    className='bg-slate-800/50 rounded-lg px-4 py-2'
                  >
                    <h3 className='font-medium mb-1'>{statsData.nome}</h3>
                    <div className='flex justify-between text-sm'>
                      <span>Vitórias: <span className='font-bold text-emerald-400'>{statsData.vitorias}</span></span>
                      <span>Derrotas: <span className='font-bold text-rose-400'>{statsData.derrotas}</span></span>
                      <span>Empates: <span className='font-bold text-violet-400'>{statsData.empates}</span></span>
                    </div>
                  </li>
                ))}
              </ul>
          </div>

        </div>
      )}
    </main>
  </div>
)
}