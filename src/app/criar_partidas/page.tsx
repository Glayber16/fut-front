"use client"
import React from 'react'
import { Match } from "@/types/match";
import CreateMatchModal from '@/components/createMatchModal'
import Sidebar from "@/components/sidebar" 

export default function CriarPartidasPage() {
  
  const matchesMock: Match[] = []

  const handleSaveMatch = (newMatch: Match) => {
    console.log("Objeto da partida criado:", newMatch)
    alert(`Partida contra ${newMatch.rival.name} criada! (Ver console)`)
  }

  return (
    <div className="flex h-screen w-full bg-slate-950 text-white overflow-hidden">
        <Sidebar />
        <main className="flex-1 h-full flex flex-col items-center justify-center p-4">
            
            <div className="text-center space-y-6">
                <h1 className="text-3xl font-bold">Adicionar Novo Jogo</h1>
                <div className="flex justify-center">
                    <CreateMatchModal 
                        onSave={handleSaveMatch} 
                        existingMatches={matchesMock} 
                    />
                </div>
            </div>

        </main>
    </div>
  )
}