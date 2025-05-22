import type { MenuId, MenuTitle } from '@/types/menu'
import type { Component } from 'vue'
export enum DocumentType {
  CARNET_IDENTIDAD = 'carnet-identidad',
  IPS = 'ips',
  ACLARACION_DEUDA = 'aclaracion-deuda',
  CERTIFICADO_DEUDA = 'certificado-deuda',
  INFORMES_COMERCIALES = 'informes-comerciales',
  LEY_REEMPENDIMIENTO = 'ley-reemprendimiento',
  REGISTRO_DEUDORES = 'registro-deudores',
  PREEVALUACION_CREDITO = 'preevaluacion-credito',
  VIGENCIA_CEDULA = 'vigencia-cedula',
  NEITCOM = 'neitcom',
  VALIDACION_PREVISION = 'validacion-prevision',
  CARNET_MEDICINA_CURATIVA = 'carnet-medicina-curativa',
  CERTIFICADO_SALDO_DE_FONDA = 'certificado-saldo-de-fonda',
  CERTIFICADO_DE_NACIMIENTO = 'certificado-de-nacimiento',
  CERTIFICADO_DE_MATRIMONIO = 'certificado-de-matrimonio'
}

export type DocumentMap = {
  [key in DocumentType]: File | undefined
}
export interface Step {
  id: MenuId
  title: MenuTitle
  icon: string
  documentType: DocumentType
  component: Component
}
