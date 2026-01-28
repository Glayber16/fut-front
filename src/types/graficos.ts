export interface StatsData {
  totalJogos: number;
  resultados: { tipo: string; quantidade: number }[];
  topColegas: { nome: string; jogos: number }[];
}