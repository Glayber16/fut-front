'use client'
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
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Match, Colega } from '@/types/match'
function getEstadios(matches: Match[]) {
  return Array.from(new Set(matches.map((m) => m.estadio)))
}
function getColegas(matches: Match[]) {
  return Array.from(
    new Set(matches.flatMap((m) => m.colegas.map((c) => c.nome))),
  )
}
function getCampeonatos(matches: Match[]) {
  return Array.from(new Set(matches.map((m) => m.campeonato)))
}
interface CreateMatchDialogProps {
  onSave: (match: Match) => void
  existingMatches: Match[]
}
export default function CreateMatchModal({
  onSave,
  existingMatches,
}: CreateMatchDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [rival, setRival] = useState('')
  const [estadio, setEstadio] = useState('')
  const [data, setData] = useState('')
  const [placarCasa, setPlacarCasa] = useState('0')
  const [placarRival, setPlacarRival] = useState('0')
  const [atualColega, setAtualColega] = useState('')
  const [campeonato, setCampeonato] = useState('')
  const [escolhaColegas, setEscolhaColegas] = useState<Colega[]>([])
  const [mostrarEstadios, setMostrarEstadios] = useState(false)
  const [mostrarColegas, setMostrarColegas] = useState(false)
  const [mostrarCampeonato, setMostrarCampeonato] = useState(false)

  const estadios = getEstadios(existingMatches)
  const amigos = getColegas(existingMatches)
  const camps = getCampeonatos(existingMatches)
  const sugestoesEstadio = estadios.filter(
    (e) => e.toLowerCase().includes(estadio.toLowerCase()) && e !== estadio,
  )
  const sugestoesColegas = amigos.filter((c) =>
    c.toLowerCase().includes(atualColega.toLowerCase()),
  )
  const sugestoesCampeonato = camps.filter(
    (c) =>
      c.toLowerCase().includes(campeonato.toLowerCase()) && c !== campeonato,
  )

  const addColega = (nome: string) => {
    if (!nome.trim()) return
    if (
      escolhaColegas.some((c) => c.nome.toLowerCase() === nome.toLowerCase())
    ) {
      setAtualColega('')
      return
    }
    setEscolhaColegas([
      ...escolhaColegas,
      { id: Math.random().toString(), nome },
    ])
    setAtualColega('')
    setMostrarColegas(false)
  }
  const removeColega = (id: string) => {
    setEscolhaColegas(escolhaColegas.filter((c) => c.id !== id))
  }
  const handleSave = () => {
    const casa = parseInt(placarCasa)
    const fora = parseInt(placarRival)
    let resultado: 'VITORIA' | 'DERROTA' | 'EMPATE' = 'EMPATE'
    if (casa > fora) resultado = 'VITORIA'
    else if (fora > casa) resultado = 'DERROTA'
    const newMatch: Match = {
      id: Math.random().toString(36),
      date: data,
      status: resultado,
      estadio: estadio,
      placarCasa: casa,
      placarRival: fora,
      timeCasa: { name: 'Ceara', logo: '' },
      rival: { name: rival, logo: '' },
      colegas: escolhaColegas,
      campeonato: campeonato,
    }
    onSave(newMatch)
    setOpen(false)

    setRival('')
    setEstadio('')
    setPlacarCasa('0')
    setPlacarRival('0')
    setEscolhaColegas([])
    setCampeonato('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-violet-600 p-6 text-lg font-bold shadow-md transition-all hover:bg-violet-700 hover:shadow-violet-500/20">
          Adicionar partida <PlusCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-slate-800 bg-slate-900 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Nova Partida</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5 py-4 text-center">
          <div className="grid gap-2">
            <Label htmlFor="rival" className="text-base text-slate-300">
              Nome do adversario
            </Label>
            <Input
              id="rival"
              value={rival}
              onChange={(e) => setRival(e.target.value)}
              className="h-12 border-slate-700 bg-slate-950 text-lg"
              placeholder="Ex: Fortaleza"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-2">
            <div className="grid gap-2">
              <Label htmlFor="gols-casa" className="text-base text-slate-300">
                Time Casa
              </Label>
              <Input
                id="gols-casa"
                type="number"
                value={placarCasa}
                onChange={(e) => setPlacarCasa(e.target.value)}
                className="h-14 border-slate-700 bg-slate-950 text-center text-xl font-bold"
              />
            </div>
            <span className="text-lg font-bold">PLACAR</span>
            <div className="grid gap-2">
              <Label htmlFor="gols-rival" className="text-base text-slate-300">
                Time Fora
              </Label>
              <Input
                id="gols-rival"
                type="number"
                value={placarRival}
                onChange={(e) => setPlacarRival(e.target.value)}
                className="h-14 border-slate-700 bg-slate-950 text-center text-xl font-bold"
              />
            </div>
          </div>
          <div className="relative grid gap-2 text-left">
            <Label htmlFor="campeonato" className="text-base text-slate-300">
              Campeonato
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
              <Input
                id="campeonato"
                value={campeonato}
                onChange={(e) => {
                  setCampeonato(e.target.value)
                  setMostrarCampeonato(true)
                }}
                onFocus={() => setMostrarCampeonato(true)}
                onBlur={() =>
                  setTimeout(() => setMostrarCampeonato(false), 150)
                }
                className="h-12 border-slate-700 bg-slate-950 pl-10 text-lg"
                placeholder="Ex: Cearense"
                autoComplete="off"
              />
            </div>
            {mostrarCampeonato && sugestoesCampeonato.length > 0 && (
              <div className="absolute top-full z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-slate-700 bg-slate-800 text-left shadow-xl">
                {sugestoesCampeonato.map((camp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCampeonato(camp)}
                    className="w-full border-b border-slate-700/50 px-4 py-2 text-sm text-slate-300 hover:bg-violet-600/20 hover:text-white"
                  >
                    {camp}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative grid gap-2 text-left">
            <Label htmlFor="estadio" className="text-base text-slate-300">
              Estádio
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
              <Input
                id="estadio"
                value={estadio}
                onChange={(e) => {
                  setEstadio(e.target.value)
                  setMostrarEstadios(true)
                }}
                onFocus={() => setMostrarEstadios(true)}
                onBlur={() => setTimeout(() => setMostrarEstadios(false), 150)}
                className="h-12 border-slate-700 bg-slate-950 pl-10 text-lg"
                placeholder="Ex: Castelão"
                autoComplete="off"
              />
            </div>
            {mostrarEstadios && sugestoesEstadio.length > 0 && (
              <div className="absolute top-full z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-slate-700 bg-slate-800 text-left shadow-xl">
                {sugestoesEstadio.map((est, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setEstadio(est)}
                    className="w-full border-b border-slate-700/50 px-4 py-2 text-sm text-slate-300 hover:bg-violet-600/20 hover:text-white"
                  >
                    {est}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="data" className="text-base text-slate-300">
              Data do Jogo
            </Label>
            <Input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="block h-12 border-slate-700 bg-slate-950 text-lg"
            />
          </div>
          <div className="relative grid gap-2 text-left">
            <Label className="text-slate-300">Quem foi junto?</Label>
            <div className="mb-1 flex flex-wrap gap-2">
              {escolhaColegas.map((col) => (
                <div
                  key={col.id}
                  onClick={() => removeColega(col.id)}
                  className="flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-900/50 px-3 py-1 text-sm text-violet-200 hover:cursor-pointer"
                >
                  {col.nome}
                </div>
              ))}
            </div>

            <div className="relative flex gap-2">
              <div className="relative w-full">
                <UserPlus className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
                <Input
                  value={atualColega}
                  onChange={(e) => {
                    setAtualColega(e.target.value)
                    setMostrarColegas(true)
                  }}
                  onFocus={() => setMostrarColegas(true)}
                  onBlur={() => setTimeout(() => setMostrarColegas(false), 150)}
                  onKeyDown={(e) => e.key === 'Enter' && addColega(atualColega)}
                  className="h-12 border-slate-700 bg-slate-950 pl-10"
                  placeholder="Nome do amigo"
                />
                {mostrarColegas && sugestoesColegas.length > 0 && (
                  <div className="absolute top-full z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-slate-700 bg-slate-800 text-left shadow-xl">
                    {sugestoesColegas.map((amigo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => addColega(amigo)}
                        className="w-full border-b border-slate-700/50 px-4 py-2 text-sm text-slate-300 hover:bg-violet-600/20 hover:text-white"
                      >
                        {amigo}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button
                type="button"
                onClick={() => addColega(atualColega)}
                className="h-12 w-12 shrink-0 border border-slate-700 bg-slate-800 hover:bg-slate-700"
              >
                <PlusCircle className="h-5 w-5" />
                <span className="pointer-events-none absolute -top-10 left-1/2 w-max -translate-x-1/2 rounded bg-black px-2 py-1 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  Adicionar
                </span>
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            className="h-12 w-full bg-emerald-600 text-lg font-bold text-white hover:bg-emerald-700"
          >
            Salvar Partida
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
