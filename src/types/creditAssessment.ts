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
  VALIDACION_PREVISION = 'validacion-prevision'
}

export type DocumentMap = {
  [key in DocumentType]: File | undefined
}
