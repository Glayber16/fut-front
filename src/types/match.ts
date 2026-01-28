

export type MatchStatus = "VITORIA" | "DERROTA" | "EMPATE";

export interface Team {
    name: string;
    logo?: string; 
}

export interface Colega{
    id: string;
    nome: string;
}

export interface Match {
    id: string;
    date: string;
    estadio: string;
    timeCasa: Team;
    rival: Team;
    placarCasa: number;
    placarRival: number;
    status: MatchStatus;
    colegas: Colega[];
    campeonato: string;
}