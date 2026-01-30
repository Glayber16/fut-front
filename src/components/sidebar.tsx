"use client"
import React from 'react'
import { Button } from './ui/button'
import { ChartNoAxesCombined, LayoutDashboard, Menu, Trophy } from 'lucide-react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet'

export default function Sidebar() {


  return (
    <>

      <div className='md:hidden fixed top-0 left-0 right-0 h-16 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-4 z-50 text-slate-100'>
        <h1 className='font-bold text-lg tracking-tight flex items-center gap-2'>
            <Trophy className="w-5 h-5 text-violet-500"/> Arquivo Futebol
        </h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-violet-900/50">
                <Menu className="w-6 h-6"/>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-slate-950 border-r-slate-800 p-0 text-slate-100">
            <SheetTitle className='p-4 border-b border-slate-800 text-left flex items-center gap-2 text-slate-100'>
                 <Trophy className="w-5 h-5 text-violet-500"/> Menu
            </SheetTitle>
            <SheetDescription className="sr-only">Menu mobile</SheetDescription>
            
            <div className='flex flex-col gap-2 p-4'>
              <Button asChild variant="ghost" className="justify-start w-full gap-3 text-slate-300 hover:text-white hover:bg-violet-600 hover:-translate-y-1.5 transition-all">
                <Link href="/"><LayoutDashboard className='w-5 h-5'/>Partidas</Link>
              </Button> 
              <Button asChild variant="ghost" className=" justify-start w-full gap-3 text-slate-300 hover:text-white hover:bg-violet-600 hover:-translate-y-1.5 transition-all">
                <Link href="/criar_partidas"><LayoutDashboard className='w-5 h-5' />Adicionar Partida</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start w-full gap-3 text-slate-300 hover:text-white hover:bg-violet-600 hover:-translate-y-1.5 transition-all">
                <Link href="/graficos"><ChartNoAxesCombined className='w-5 h-5'/>Gráficos</Link>
              </Button>
            </div> 
          </SheetContent>
        </Sheet>
      </div>

     
      <aside className='hidden md:flex fixed left-0 top-0 h-full w-64 border-r border-slate-800 flex-col items-center py-6 gap-8 bg-slate-950 z-40 text-slate-300'>
        <div className='border-b border-slate-800 w-full pb-6 px-6'>
          <h1 className='w-full font-bold text-xl tracking-tight flex items-center gap-2 text-slate-100'>
             <Trophy className="w-6 h-6 text-violet-500"/>
             <div className="flex flex-col leading-none">
                Arquivo
                <span className="text-violet-400">Futebol 2026</span>
             </div>
          </h1>
        </div>
        
        <div className='flex flex-col gap-3 w-full px-4 h-full'>
          <Button asChild variant="ghost" className=" justify-start w-full gap-3 text-xl text-slate-300 hover:text-white hover:bg-violet-600 hover:-translate-y-1.5 transition-all">
            <Link href="/"><LayoutDashboard className='w-6 h-6' /> Partidas</Link>
          </Button> 
          <Button asChild variant="ghost" className=" justify-start w-full gap-3 text-xl text-slate-300 hover:text-white hover:bg-violet-600 hover:-translate-y-1.5 transition-all">
            <Link href="/criar_partidas"><LayoutDashboard className='w-6 h-6' />Adicionar Partida</Link>
          </Button> 
          <Button asChild variant="ghost" className="justify-start w-full gap-3 text-xl text-slate-300 hover:text-white hover:bg-violet-600 hover:-translate-y-1.5 transition-all">
            <Link href="/graficos"><ChartNoAxesCombined className='w-6 h-6'/> Gráficos</Link>
          </Button>
        </div> 
      </aside>
    </>
  )
}