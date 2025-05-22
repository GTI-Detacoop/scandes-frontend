import type { MenuId } from "./menu"

export enum ProductName {
  DXP_IPS = 'Dxp Ips',
  DXP_DIPRECA = 'Dxp Dipreca',
  DXP_CAPREDENA = 'Dxp Capredena',
  DXP_AFP = 'Dxp Afp',
  DXP_SEGURO = 'Dxp Seguro',
}

export enum SubProductName {
  FINANCIAMIENTO = 'Financiamiento',
  REFINANCIAMIENTO = 'Refinanciamiento',
  FINANCIAMIENTO_CON_COMPRA = 'Financiamiento con compra de cartera',
  REFINANCIAMIENTO_CON_COMPRA = 'Refinanciamiento con compra de cartera',
  CREDITOS_PARALELOS = 'Creditos paralelos',
}

export interface SubProduct {
  name: SubProductName
  documentsNeeded?: MenuId[]
  optionalDocuments?: MenuId[]
}

export interface Product {
  name: ProductName
  subProducts: SubProduct[]
}
