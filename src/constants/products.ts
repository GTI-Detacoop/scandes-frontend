import { ProductName, SubProductName, type Product } from '@/types/product'
import { MenuId } from '@/types/menu'

export const defaultDocumentsNeeded: MenuId[] = [
  MenuId.CARNET_IDENTIDAD,
  MenuId.LIQUIDACIONES,
  MenuId.VIGENCIA_CEDULA,
  MenuId.INFORMES_COMERCIALES,
  MenuId.LEY_REEMPENDIMIENTO,
  MenuId.REGISTRO_DEUDORES,
  MenuId.PREEVALUACION_CREDITO,
  MenuId.VALIDACION_PREVISION,
  MenuId.NEITCOM,
]

export const defaultOptionalDocuments: MenuId[] = [
  MenuId.ACLARACION_DEUDA,
]


export const products: Product[] = [
  {
    name: ProductName.DXP_IPS,
    subProducts: [
      ...[SubProductName.FINANCIAMIENTO, SubProductName.REFINANCIAMIENTO, SubProductName.CREDITOS_PARALELOS].map(subProduct => ({
        name: subProduct,
        documentsNeeded: defaultDocumentsNeeded,
        optionalDocuments: defaultOptionalDocuments,
      })),
      ...[SubProductName.FINANCIAMIENTO_CON_COMPRA, SubProductName.REFINANCIAMIENTO_CON_COMPRA].map(subProduct => ({
        name: subProduct,
        documentsNeeded: [...defaultDocumentsNeeded, MenuId.CERTIFICADO_DEUDA],
        optionalDocuments: defaultOptionalDocuments,
      })),
    ]
  },
  {
    name: ProductName.DXP_DIPRECA,
    // Due to internal Detacoop policy, Dipreca do not provided purchase of portfolio
    subProducts: [SubProductName.FINANCIAMIENTO, SubProductName.REFINANCIAMIENTO, SubProductName.CREDITOS_PARALELOS].map(subProduct => ({
      name: subProduct,
      documentsNeeded: [...defaultDocumentsNeeded, MenuId.CARNET_MEDICINA_CURATIVA],
      optionalDocuments: defaultOptionalDocuments,
    })),
  },
  {
    name: ProductName.DXP_CAPREDENA,
    subProducts: [
      ...[SubProductName.FINANCIAMIENTO, SubProductName.REFINANCIAMIENTO, SubProductName.CREDITOS_PARALELOS].map(subProduct => ({
        name: subProduct,
        documentsNeeded: defaultDocumentsNeeded,
        optionalDocuments: defaultOptionalDocuments,
      })),
      ...[SubProductName.FINANCIAMIENTO_CON_COMPRA, SubProductName.REFINANCIAMIENTO_CON_COMPRA].map(subProduct => ({
        name: subProduct,
        documentsNeeded: [...defaultDocumentsNeeded, MenuId.CERTIFICADO_DEUDA],
        optionalDocuments: defaultOptionalDocuments,
      })),
    ]
  },
  {
    name: ProductName.DXP_AFP,
    subProducts: [
      ...[SubProductName.FINANCIAMIENTO, SubProductName.REFINANCIAMIENTO, SubProductName.CREDITOS_PARALELOS].map(subProduct => ({
        name: subProduct,
        documentsNeeded: [...defaultDocumentsNeeded, MenuId.CERTIFICADO_SALDO_DE_FONDA],
        optionalDocuments: [...defaultOptionalDocuments, MenuId.CERTIFICADO_DE_MATRIMONIO, MenuId.CERTIFICADO_DE_NACIMIENTO],
      })),
      ...[SubProductName.FINANCIAMIENTO_CON_COMPRA, SubProductName.REFINANCIAMIENTO_CON_COMPRA].map(subProduct => ({
        name: subProduct,
        documentsNeeded: [...defaultDocumentsNeeded, MenuId.CERTIFICADO_DEUDA, MenuId.CERTIFICADO_SALDO_DE_FONDA],
        optionalDocuments: [...defaultOptionalDocuments, MenuId.CERTIFICADO_DE_MATRIMONIO, MenuId.CERTIFICADO_DE_NACIMIENTO],
      })),
    ]
  },
  {
    name: ProductName.DXP_SEGURO,
    subProducts: [
      ...[SubProductName.FINANCIAMIENTO, SubProductName.REFINANCIAMIENTO, SubProductName.CREDITOS_PARALELOS].map(subProduct => ({
        name: subProduct,
        documentsNeeded: [...defaultDocumentsNeeded, MenuId.POLIZA],
        optionalDocuments: defaultOptionalDocuments,
      })),
      ...[SubProductName.FINANCIAMIENTO_CON_COMPRA, SubProductName.REFINANCIAMIENTO_CON_COMPRA].map(subProduct => ({
        name: subProduct,
        documentsNeeded: [...defaultDocumentsNeeded, MenuId.CERTIFICADO_DEUDA, MenuId.POLIZA],
        optionalDocuments: defaultOptionalDocuments,
      })),
    ]
  },
]
