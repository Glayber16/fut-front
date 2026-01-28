"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { PlusCircle, MapPin, UserPlus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Match, Colega } from '@/types/match'
function getEstadios(matches: Match[]) {
  return Array.from(new Set(matches.map(m => m.estadio)))
}
function getColegas(matches: Match[]) {
  return Array.from(new Set(matches.flatMap(m => m.colegas.map(c => c.nome))))
}
function getCampeonatos(matches: Match[]) {
  return Array.from(new Set(matches.map(m => m.campeonato)))
}
interface CreateMatchDialogProps {
    onSave: (match: Match) => void
    existingMatches: Match[]
}
export default function CreateMatchModal({ onSave, existingMatches }: CreateMatchDialogProps) {
    const [open, setOpen] = React.useState(false)
    const [rival, setRival] = useState("")
    const [estadio, setEstadio] = useState("")
    const [data, setData] = useState("")
    const [placarCasa, setPlacarCasa] = useState("0")
    const [placarRival, setPlacarRival] = useState("0")
    const [atualColega, setAtualColega] = useState("")
    const [campeonato, setCampeonato] = useState("")
    const [escolhaColegas, setEscolhaColegas] = useState<Colega[]>([])
    const [mostrarEstadios, setMostrarEstadios] = useState(false)
    const [mostrarColegas, setMostrarColegas] = useState(false)
    const [mostrarCampeonato, setMostrarCampeonato] = useState(false)

    const estadios = getEstadios(existingMatches)
    const amigos = getColegas(existingMatches)
    const camps = getCampeonatos(existingMatches)
    const sugestoesEstadio = estadios.filter(e => 
        e.toLowerCase().includes(estadio.toLowerCase()) && e !== estadio
    )
    const sugestoesColegas = amigos.filter(c => 
        c.toLowerCase().includes(atualColega.toLowerCase())
    )
    const sugestoesCampeonato = camps.filter(c => 
        c.toLowerCase().includes(campeonato.toLowerCase()) && c !== campeonato
    )

    const addColega = (nome: string) => {
        if (!nome.trim()) return
        if (escolhaColegas.some(c => c.nome.toLowerCase() === nome.toLowerCase())) {
            setAtualColega("")
            return
        }
        setEscolhaColegas([...escolhaColegas, { id: Math.random().toString(), nome }])
        setAtualColega("")
        setMostrarColegas(false)
    }
    const removeColega = (id: string) => {
        setEscolhaColegas(escolhaColegas.filter(c => c.id !== id))
    }
  const handleSave = () => {
    const casa = parseInt(placarCasa)
    const fora = parseInt(placarRival)
    let resultado: "VITORIA" | "DERROTA" | "EMPATE" = "EMPATE"
    if(casa > fora) resultado = "VITORIA"
    else if(fora > casa) resultado = "DERROTA"
    const newMatch: Match = {
      id: Math.random().toString(36),
      date: data,
      status: resultado,
      estadio: estadio,
      placarCasa: casa,
      placarRival: fora,
      timeCasa: {name: "Ceara", logo: ""},
      rival: {name: rival, logo: ""},
      colegas: escolhaColegas,
      campeonato: campeonato
    }
    onSave(newMatch)
    setOpen(false)

    setRival("")
    setEstadio("")
    setPlacarCasa("0")
    setPlacarRival("0")
    setEscolhaColegas([])
    setCampeonato("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
                <Button className="bg-violet-600 hover:bg-violet-700   p-6 gap-2 text-lg font-bold shadow-md hover:shadow-violet-500/20 transition-all">
                    Adicionar partida <PlusCircle className="w-6 h-6"/> 
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[425px]" >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Nova Partida</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-5 py-4 text-center'  >
                  <div className="grid gap-2">
                        <Label htmlFor="rival" className="text-base text-slate-300">Nome do adversario</Label>
                        <Input id="rival" value={rival} onChange={(e) => setRival(e.target.value)} className="bg-slate-950 border-slate-700 text-lg h-12" placeholder="Ex: Fortaleza" />
                  </div>
                  <div className='grid grid-cols-3 gap-2 items-center'>
                    <div className="grid gap-2">
                            <Label htmlFor="gols-casa" className="text-base text-slate-300">Time Casa</Label>
                            <Input id="gols-casa" type="number" value={placarCasa} onChange={(e) => setPlacarCasa(e.target.value)} className="bg-slate-950 border-slate-700 text-center text-xl font-bold h-14" />
                        </div>
                        <span className='text-lg font-bold'>PLACAR</span>
                        <div className="grid gap-2">
                            <Label htmlFor="gols-rival" className="text-base text-slate-300">Time Fora</Label>
                            <Input id="gols-rival" type="number" value={placarRival} onChange={(e) => setPlacarRival(e.target.value)} className="bg-slate-950 border-slate-700 text-center text-xl font-bold h-14" />
                        </div>
                  </div>
                                <div className="grid gap-2 text-left relative">
                <Label htmlFor="campeonato" className="text-base text-slate-300">Campeonato</Label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                    <Input 
                        id="campeonato" 
                        value={campeonato} 
                        onChange={(e) => {
                            setCampeonato(e.target.value)
                            setMostrarCampeonato(true)
                        }}
                        onFocus={() => setMostrarCampeonato(true)}
                        onBlur={() => setTimeout(() => setMostrarCampeonato(false), 150)}
                        className="bg-slate-950 border-slate-700 text-lg h-12 pl-10" 
                        placeholder="Ex: Cearense" 
                        autoComplete="off"
                    />
                </div>
                {mostrarCampeonato && sugestoesCampeonato.length > 0 && (
                    <div className="absolute z-10 top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-md shadow-xl max-h-40 overflow-y-auto text-left">
                        {sugestoesCampeonato.map((camp, idx) => (
                            <button key={idx} type="button" onClick={() => setCampeonato(camp)} className="w-full px-4 py-2 hover:bg-violet-600/20 text-sm border-b border-slate-700/50 text-slate-300 hover:text-white">
                                {camp}
                            </button>
                        ))}
                    </div>
                )}
            </div>

                        <div className="grid gap-2 text-left relative">
                <Label htmlFor="estadio" className="text-base text-slate-300">Estádio</Label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                    <Input 
                        id="estadio" 
                        value={estadio} 
                        onChange={(e) => {
                            setEstadio(e.target.value)
                            setMostrarEstadios(true)
                        }}
                        onFocus={() => setMostrarEstadios(true)}
                        onBlur={() => setTimeout(() => setMostrarEstadios(false), 150)}
                        className="bg-slate-950 border-slate-700 text-lg h-12 pl-10" 
                        placeholder="Ex: Castelão" 
                        autoComplete="off"
                    />
                </div>
                {mostrarEstadios && sugestoesEstadio.length > 0 && (
                    <div className="absolute z-10 top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-md shadow-xl max-h-40 overflow-y-auto text-left">
                        {sugestoesEstadio.map((est, idx) => (
                            <button key={idx} type="button" onClick={() => setEstadio(est)} className="w-full px-4 py-2 hover:bg-violet-600/20 text-sm border-b border-slate-700/50 text-slate-300 hover:text-white">
                                {est}
                            </button>
                        ))}
                    </div>
                )}
            </div>
                    <div className="grid gap-2">
                        <Label htmlFor="data" className="text-base text-slate-300">Data do Jogo</Label>
                        <Input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} className="bg-slate-950 border-slate-700 text-lg h-12 block" />
                    </div>
                    <div className='grid gap-2 relative text-left'>
                <Label className="text-slate-300">Quem foi junto?</Label>
                <div className="flex flex-wrap gap-2 mb-1">
                    {escolhaColegas.map(col => (
                        <div key={col.id} onClick={() => removeColega(col.id)} className="hover:cursor-pointer flex items-center gap-1 bg-violet-900/50 text-violet-200 px-3 py-1 rounded-full text-sm border border-violet-500/30">
                            {col.nome}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 relative">
                    <div className="relative w-full">
                        <UserPlus className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                        <Input 
                            value={atualColega} 
                            onChange={(e) => {
                                setAtualColega(e.target.value)
                                setMostrarColegas(true)
                            }}
                            onFocus={() => setMostrarColegas(true)}
                            onBlur={() => setTimeout(() => setMostrarColegas(false), 150)}
                            onKeyDown={(e) => e.key === 'Enter' && addColega(atualColega)}
                            className="bg-slate-950 border-slate-700 pl-10 h-12"
                            placeholder="Nome do amigo"
                        />
                        {mostrarColegas && sugestoesColegas.length > 0 && (
                            <div className="absolute z-10 top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-md shadow-xl max-h-40 overflow-y-auto text-left">
                                {sugestoesColegas.map((amigo, idx) => (
                                    <button key={idx} type="button" onClick={() => addColega(amigo)} className="w-full px-4 py-2 hover:bg-violet-600/20 text-sm border-b border-slate-700/50 text-slate-300 hover:text-white">
                                        {amigo}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <Button type="button" onClick={() => addColega(atualColega)} className="h-12 w-12 bg-slate-800 hover:bg-slate-700 border border-slate-700 shrink-0">
                        <PlusCircle className="w-5 h-5"/>
                        <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-black text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                          Adicionar
                        </span>
                    </Button>
                </div>
            </div>
                 
                </div>
                <DialogFooter>
                    <Button onClick={handleSave} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg h-12">
                        Salvar Partida
                    </Button>
                </DialogFooter>
            </DialogContent>
    </Dialog>
  )
}
