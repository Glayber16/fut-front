'use client'
import React from 'react'
import { Match } from '@/types/match'
import CreateMatchModal from '@/components/createMatchModal'
import Sidebar from '@/components/sidebar'
import { useEffect, useState } from 'react'

export default function CriarPartidasPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const fetchMatches = async () => {
    try {
      const response = await fetch('http://localhost:3333/partidas')
      const data = await response.json()
      const partidasFormatadas: Match[] = data.map((partida: any) => ({
        id: partida.id,
        estadio: partida.estadio,
        colegas: partida.colegas.map((colega: any) => ({
          id: colega.id,
          nome: colega.nome,
        })),
        campeonato: partida.campeonato,
      }))
      setMatches(partidasFormatadas)
    } catch (error) {
      console.error('Erro ao buscar partidas:', error)
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  const handleSaveMatch = async (newMatch: Match) => {
    try {
      const payload = {
        data: newMatch.date,
        estadio: newMatch.estadio,
        timeCasa: newMatch.timeCasa.name,
        rival: newMatch.rival.name,
        placarCasa: Number(newMatch.placarCasa),
        placarFora: Number(newMatch.placarRival),
        resultado: newMatch.status,
        colegasNome: newMatch.colegas.map((c) => c.nome),
        campeonato: newMatch.campeonato,
      }
      const response = await fetch('http://localhost:3333/partidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }
    } catch (error) {
      console.error('Erro ao formatar a data:', error)
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-white">
      <Sidebar />
      <main className="flex h-full flex-1 flex-col items-center justify-center p-4">
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold">Adicionar Novo Jogo</h1>
          <div className="flex justify-center">
            <CreateMatchModal
              onSave={handleSaveMatch}
              existingMatches={matches}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
