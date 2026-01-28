import React from 'react'
import { Match } from '@/types/match'
import { Users } from 'lucide-react'
import { Button } from './ui/button'

interface MatchCardProps {
    match: Match;
    onDelete: (id: string) => void;
}

export default function MatchCard({ match, onDelete }: MatchCardProps) {
    const getStatusColor = (status: string) => {
    switch(status) {
        case "VITORIA": return "bg-brand-500/10 text-emerald-400 border-emerald-500/20"
        case "DERROTA": return "bg-rose-500/10 text-rose-400 border-rose-500/20"
        case "EMPATE": return "bg-violet-500/50 text-slate-400 border-violet-500/20"
    }
  }

  
  return (
    <div className='flex flex-col items-center gap-4 bg-slate-900 rounded-xl border border-slate-800 p-6  w-full max-w-full sm:max-w-md
 text-white'>
        <h1 className='text-xl font-bold'>{match.campeonato}</h1>
        <h2 className='text-sm'>{match.date}</h2>
        <div className='flex justify-between gap-2 sm:gap-4 w-full items-center text-center'>
            
            <div className='flex flex-col items-center gap-2 w-20 sm:w-24'>
                <img src={match.timeCasa.logo} alt={`Escudo do ${match.timeCasa.name}`} className='h-12 w-12 sm:h-16 sm:w-16 rounded-lg object-contain'/>
                <span className='text-center text-base font-medium leading-tight truncate w-full'>{match.timeCasa.name}</span> 
            </div>
            <p className='text-xl sm:text-2xl font-bold whitespace-nowrap'>{match.placarCasa} x {match.placarRival}</p>
            <div className='flex flex-col items-center gap-2 w-20 sm:w-24'>
                <img src={match.rival.logo}  alt={`Escudo do ${match.rival.name}`} className=' h-12 w-12 sm:h-16 sm:w-16 rounded-lg object-contain'/>
                <span className='text-center text-base font-medium leading-tight truncate w-full'>{match.rival.name}</span>                
            </div>
        
        </div>
        <div className='flex flex-col border-b-2 border-slate-400 w-full items-center mt-4 pb-4'>
            <h2 className='text-lg font-medium'>{match.estadio}</h2>
            <h2 className={`mt-2 text-sm font-bold px-2.5 py-0.5 rounded-full border tracking-wider ${getStatusColor(match.status)}`}>{match.status}</h2>
        </div>
        <div className='flex items-center gap-2 mt-2 pt-1 text-sm sm:text-base text-slate-300'>
            <Users className='w-5 h-5 sm:w-6 sm:h-6 text-violet-500' />
            {match.colegas.length > 0 ? ( <span className='truncate max-w-[150px] sm:max-w-[200px]'>{match.colegas.map(c => c.nome).join(' / ')}</span>
        ) : <span>Fui sozinho</span>
        } 
        </div>
        <Button  onClick={() => onDelete(match.id)} className='bg-red-600'>Excluir Partida</Button>
        
       
    </div>
  )
}   
