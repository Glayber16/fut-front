'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar'
import { StatsData } from '@/types/graficos'

export default function GraficosPage() {
  const [stats, setStats] = useState<StatsData | null>(null)

  const getDdadosEstatistica = async () => {
    try {
      const response = await fetch(
        'http://localhost:3333/partidas/estatisticas',
      )
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    }
  }
  useEffect(() => {
    getDdadosEstatistica()
  }, [])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-white">
      <Sidebar />

      <main className="h-full flex-1 overflow-y-auto p-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Estatísticas</h1>

        {stats && (
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
              <h2 className="mb-2 text-lg text-slate-400">Total de Jogos</h2>
              <p className="text-4xl font-bold text-emerald-400">
                {stats.totalJogos}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
              <h2 className="mb-4 text-lg text-slate-400">Resultados</h2>
              <ul className="space-y-2">
                {stats.resultados.map((resultado, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-slate-800/50 px-4 py-2"
                  >
                    <span className="font-medium">{resultado.tipo}</span>
                    <span className="font-bold text-violet-400">
                      {resultado.quantidade}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
              <h2 className="mb-4 text-lg text-slate-400">
                Companhia mais presente
              </h2>
              <ul className="space-y-2">
                {stats.topColegas.map((statsData, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-slate-800/50 px-4 py-2"
                  >
                    <span className="font-medium">{statsData.nome}</span>
                    <span className="font-bold text-emerald-400">
                      {statsData.jogos}
                    </span>
                  </li>
                ))}
                {stats.jogosSozinho > 0 && (
                  <li className="flex items-center justify-between rounded-lg bg-slate-800/50 px-4 py-2">
                    <span className="font-medium">Assisti sozinho</span>
                    <span className="font-bold text-emerald-400">
                      {stats.jogosSozinho}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
              <h2 className="mb-4 text-lg text-slate-400">
                Resultados por Companhia
              </h2>
              <ul className="space-y-2">
                {stats.topColegas.map((statsData, index) => (
                  <li
                    key={index}
                    className="rounded-lg bg-slate-800/50 px-4 py-2"
                  >
                    <h3 className="mb-1 font-medium">{statsData.nome}</h3>
                    <div className="flex justify-between text-sm">
                      <span>
                        Vitórias:{' '}
                        <span className="font-bold text-emerald-400">
                          {statsData.vitorias}
                        </span>
                      </span>
                      <span>
                        Derrotas:{' '}
                        <span className="font-bold text-rose-400">
                          {statsData.derrotas}
                        </span>
                      </span>
                      <span>
                        Empates:{' '}
                        <span className="font-bold text-violet-400">
                          {statsData.empates}
                        </span>
                      </span>
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
