import React from 'react'
import { Match } from '@/types/match'
import { Users } from 'lucide-react'
import { Button } from './ui/button'

interface MatchCardProps {
  match: Match
  onDelete: (id: string) => void
}

export default function MatchCard({ match, onDelete }: MatchCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VITORIA':
        return 'bg-brand-500/10 text-emerald-400 border-emerald-500/20'
      case 'DERROTA':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      case 'EMPATE':
        return 'bg-violet-500/50 text-slate-400 border-violet-500/20'
    }
  }

  return (
    <div className="flex w-full max-w-full flex-col items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6 text-white sm:max-w-md">
      <h1 className="text-xl font-bold">{match.campeonato}</h1>
      <h2 className="text-sm">{match.date}</h2>
      <div className="flex w-full items-center justify-between gap-2 text-center sm:gap-4">
        <div className="flex w-20 flex-col items-center gap-2 sm:w-24">
          <img
            src={match.timeCasa.logo}
            alt={`Escudo do ${match.timeCasa.name}`}
            className="h-12 w-12 rounded-lg object-contain sm:h-16 sm:w-16"
          />
          <span className="w-full truncate text-center text-base font-medium leading-tight">
            {match.timeCasa.name}
          </span>
        </div>
        <p className="whitespace-nowrap text-xl font-bold sm:text-2xl">
          {match.placarCasa} x {match.placarRival}
        </p>
        <div className="flex w-20 flex-col items-center gap-2 sm:w-24">
          <img
            src={match.rival.logo}
            alt={`Escudo do ${match.rival.name}`}
            className="h-12 w-12 rounded-lg object-contain sm:h-16 sm:w-16"
          />
          <span className="w-full truncate text-center text-base font-medium leading-tight">
            {match.rival.name}
          </span>
        </div>
      </div>
      <div className="mt-4 flex w-full flex-col items-center border-b-2 border-slate-400 pb-4">
        <h2 className="text-lg font-medium">{match.estadio}</h2>
        <h2
          className={`mt-2 rounded-full border px-2.5 py-0.5 text-sm font-bold tracking-wider ${getStatusColor(match.status)}`}
        >
          {match.status}
        </h2>
      </div>
      <div className="mt-2 flex items-center gap-2 pt-1 text-sm text-slate-300 sm:text-base">
        <Users className="h-5 w-5 text-violet-500 sm:h-6 sm:w-6" />
        {match.colegas.length > 0 ? (
          <span className="max-w-[150px] truncate sm:max-w-[200px]">
            {match.colegas.map((c) => c.nome).join(' / ')}
          </span>
        ) : (
          <span>Fui sozinho</span>
        )}
      </div>
      <Button onClick={() => onDelete(match.id)} className="bg-red-600">
        Excluir Partida
      </Button>
    </div>
  )
}
