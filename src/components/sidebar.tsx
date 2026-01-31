'use client'
import React from 'react'
import { Button } from './ui/button'
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Menu,
  Trophy,
} from 'lucide-react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from './ui/sheet'

export default function Sidebar() {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 text-slate-100 md:hidden">
        <h1 className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Trophy className="h-5 w-5 text-violet-500" /> Arquivo Futebol
        </h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:bg-violet-900/50 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 border-r-slate-800 bg-slate-950 p-0 text-slate-100"
          >
            <SheetTitle className="flex items-center gap-2 border-b border-slate-800 p-4 text-left text-slate-100">
              <Trophy className="h-5 w-5 text-violet-500" /> Menu
            </SheetTitle>
            <SheetDescription className="sr-only">Menu mobile</SheetDescription>

            <div className="flex flex-col gap-2 p-4">
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start gap-3 text-slate-300 transition-all hover:-translate-y-1.5 hover:bg-violet-600 hover:text-white"
              >
                <Link href="/">
                  <LayoutDashboard className="h-5 w-5" />
                  Partidas
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start gap-3 text-slate-300 transition-all hover:-translate-y-1.5 hover:bg-violet-600 hover:text-white"
              >
                <Link href="/criar_partidas">
                  <LayoutDashboard className="h-5 w-5" />
                  Adicionar Partida
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start gap-3 text-slate-300 transition-all hover:-translate-y-1.5 hover:bg-violet-600 hover:text-white"
              >
                <Link href="/graficos">
                  <ChartNoAxesCombined className="h-5 w-5" />
                  Gráficos
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col items-center gap-8 border-r border-slate-800 bg-slate-950 py-6 text-slate-300 md:flex">
        <div className="w-full border-b border-slate-800 px-6 pb-6">
          <h1 className="flex w-full items-center gap-2 text-xl font-bold tracking-tight text-slate-100">
            <Trophy className="h-6 w-6 text-violet-500" />
            <div className="flex flex-col leading-none">
              Arquivo
              <span className="text-violet-400">Futebol 2026</span>
            </div>
          </h1>
        </div>

        <div className="flex h-full w-full flex-col gap-3 px-4">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start gap-3 text-xl text-slate-300 transition-all hover:-translate-y-1.5 hover:bg-violet-600 hover:text-white"
          >
            <Link href="/">
              <LayoutDashboard className="h-6 w-6" /> Partidas
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start gap-3 text-xl text-slate-300 transition-all hover:-translate-y-1.5 hover:bg-violet-600 hover:text-white"
          >
            <Link href="/criar_partidas">
              <LayoutDashboard className="h-6 w-6" />
              Adicionar Partida
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start gap-3 text-xl text-slate-300 transition-all hover:-translate-y-1.5 hover:bg-violet-600 hover:text-white"
          >
            <Link href="/graficos">
              <ChartNoAxesCombined className="h-6 w-6" /> Gráficos
            </Link>
          </Button>
        </div>
      </aside>
    </>
  )
}
