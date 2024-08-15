export interface Product {
  nome: string;
  unidadeMedida: 'lt' | 'kg' | 'un';
  quantidade: number;
  preco: string;
  produtoPerecivel: boolean;
  dataValidade?: string;
  dataFabricacao: string;
}
