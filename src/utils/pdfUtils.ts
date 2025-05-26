import { PDFDocument, PDFPage, rgb, type Color } from 'pdf-lib'

interface FileToCombine {
  title: string
  file: File | Blob
}

interface DocumentStatus {
  title: string
  isPresent: boolean
}

export class PDFCombiner {
  async combine(
    files: FileToCombine[],
    product: string,
    subProduct: string,
    requiredDocs: DocumentStatus[],
    optionalDocs: DocumentStatus[]
  ): Promise<Blob> {
    const pdfDoc = await PDFDocument.create()

    await this.addSummaryPage(pdfDoc, product, subProduct, requiredDocs, optionalDocs)

    for (const fileData of files) {
      await this.addTitlePage(pdfDoc, fileData.title)
      const arrayBuffer = await fileData.file.arrayBuffer()

      if (fileData.file.type === 'application/pdf') {
        await this.addPDFContent(pdfDoc, arrayBuffer)
      } else if (fileData.file.type.startsWith('image/')) {
        await this.addImageContent(pdfDoc, arrayBuffer)
      } else {
        throw new Error(`Unsupported file type: ${fileData.file.type}`)
      }
    }

    const pdfBytes = await pdfDoc.save()
    return new Blob([pdfBytes], { type: 'application/pdf' })
  }

  private async pageText(page: PDFPage, text: string, y: number,  x: number = 50, size: number = 12, color: Color = rgb(0, 0, 0)) {
    page.drawText(text, {
      x,
      y,
      size,
      color
    })
  }

  private async addCheckboxList(page: PDFPage, checklistDocs: DocumentStatus[], height: number, fontSize: number = 12, lineHeight: number = 20): Promise<number> {
    for (const doc of checklistDocs) {
      await this.pageText(page, '[', height, 50, fontSize, rgb(0, 0, 0))
      if (doc.isPresent) {
        await this.pageText(page, 'X', height, 53, fontSize, rgb(0, 0.5, 0))
      }
      await this.pageText(page, ']', height, 60, fontSize, rgb(0, 0, 0))
      await this.pageText(page, doc.title, height, 70, fontSize, doc.isPresent ? rgb(0, 0, 0) : rgb(0.8, 0, 0))
      height -= lineHeight
    }
    return height
  }

  private async addSummaryPage(
    pdfDoc: PDFDocument,
    product: string,
    subProduct: string,
    requiredDocs: DocumentStatus[],
    optionalDocs: DocumentStatus[]
  ) {
    const page = pdfDoc.addPage()
    const { height } = page.getSize()
    let currentY = height - 50

    const titleSize = 16
    const lineHeight = 20

    await this.pageText(page, `Producto: ${product}`, currentY, 50, titleSize)
    currentY -= lineHeight + 10

    await this.pageText(page, `Subproducto: ${subProduct}`, currentY, 50, titleSize)

    currentY -= lineHeight * 2
    await this.pageText(page, 'Documentos Requeridos:', currentY, 50, titleSize)

    currentY -= lineHeight
    currentY = await this.addCheckboxList(page, requiredDocs, currentY)

    if (optionalDocs.length > 0) {
      currentY -= lineHeight
      await this.pageText(page, 'Documentos Opcionales:', currentY, 50, titleSize)

      currentY -= lineHeight
      await this.addCheckboxList(page, optionalDocs, currentY)
    }
  }

  private async addTitlePage(pdfDoc: PDFDocument, title: string) {
    const page = pdfDoc.addPage()
    const { height } = page.getSize()
    await this.pageText(page, title, height / 2, 50, 20, rgb(0, 0, 0))
  }

  private async addPDFContent(pdfDoc: PDFDocument, buffer: ArrayBuffer) {
    const externalPDF = await PDFDocument.load(buffer)
    const copiedPages = await pdfDoc.copyPages(externalPDF, externalPDF.getPageIndices())
    copiedPages.forEach(page => pdfDoc.addPage(page))
  }

  private async addImageContent(pdfDoc: PDFDocument, buffer: ArrayBuffer) {
    const image = await pdfDoc.embedJpg(buffer)
    const page = pdfDoc.addPage()
    const { width: pageWidth, height: pageHeight } = page.getSize()
    const { width: imgWidth, height: imgHeight } = image.scale(1)

    const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight) * 0.95
    const scaled = image.scale(scale)

    const x = (pageWidth - scaled.width) / 2
    const y = (pageHeight - scaled.height) / 2

    page.drawImage(image, {
      x,
      y,
      width: scaled.width,
      height: scaled.height,
    })
  }
}

export function downloadPDF(blob: Blob, filename: string = 'documentos-combinados.pdf') {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
