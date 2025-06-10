import type { MenuId } from "./menu"

export enum ProductName {
  DXP_IPS = 'DXP IPS',
  DXP_DIPRECA = 'DXP DIPRECA',
  DXP_CAPREDENA = 'DXP CAPREDENA',
  DXP_AFP = 'DXP AFP',
  DXP_SEGURO = 'DXP COMPAÑÍA DE SEGUROS',
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
