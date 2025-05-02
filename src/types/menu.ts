import type { Component } from 'vue'

export enum MenuTitle {
  DESCUENTO_PLANILLA = 'Descuento por Planilla',
  EVALUACION_CREDITO = 'Evaluación de Crédito',
  CARNET_IDENTIDAD = 'Carnet de Identidad',
  IPS = 'IPS',
  ACLARACION_DEUDA = 'Aclaración de Deuda',
  CERTIFICADO_DEUDA = 'Certificado de Deuda',
  INFORMES_COMERCIALES = 'Informes Comerciales',
  LEY_REEMPENDIMIENTO = 'Ley Reemprendimiento',
  REGISTRO_DEUDORES = 'Registro de Deudores',
  PREEVALUACION_CREDITO = 'Preevaluación de Crédito',
  VIGENCIA_CEDULA = 'Vigencia de Cédula',
  NEITCOM = 'Neitcom',
  VALIDACION_PREVISION = 'Validación de Previsión',
  OBTENER_IPS = 'Obtener IPS',
  HISTORIAL = 'Historial',
  OTRO_PRODUCTO = 'Otro Producto',
  INICIO = 'Inicio'
}

export enum MenuId {
  DESCUENTO_PLANILLA = 'descuento-planilla',
  EVALUACION_CREDITO = 'evaluacion-credito',
  CARNET_IDENTIDAD = 'evaluacion-credito-id',
  IPS = 'evaluacion-credito-ips',
  ACLARACION_DEUDA = 'aclaracion-deuda',
  CERTIFICADO_DEUDA = 'certificado-deuda',
  INFORMES_COMERCIALES = 'informes-comerciales',
  LEY_REEMPENDIMIENTO = 'ley-reemprendimiento',
  REGISTRO_DEUDORES = 'registro-deudores',
  PREEVALUACION_CREDITO = 'preevaluacion-credito',
  VIGENCIA_CEDULA = 'vigencia-cedula',
  NEITCOM = 'neitcom',
  VALIDACION_PREVISION = 'validacion-prevision',
  OBTENER_IPS = 'obtener-ips',
  HISTORIAL = 'historial',
  OTRO_PRODUCTO = 'otro-producto',
  INICIO = 'otro-producto-inicio'
}

export interface NestedMenuItem {
  id: MenuId
  title: MenuTitle
  icon: string
  component: Component
}

export interface SubMenuItem {
  id: MenuId
  title: MenuTitle
  icon: string
  component: Component
  nested?: NestedMenuItem[]
  isGroup?: boolean
}

export interface MainMenuItem {
  id: MenuId
  title: MenuTitle
  icon: string
  component?: Component
  subItems: SubMenuItem[]
}