export interface StatsData {
  totalJogos: number
  resultados: { tipo: string; quantidade: number }[]
  jogosSozinho: number
  topColegas: {
    nome: string
    jogos: number
    vitorias: number
    derrotas: number
    empates: number
  }[]
}
