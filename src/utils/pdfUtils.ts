import { PDFDocument, rgb } from 'pdf-lib'

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
    const fontSize = 12
    const lineHeight = 20

    page.drawText(`Producto: ${product}`, {
      x: 50,
      y: currentY,
      size: titleSize,
      color: rgb(0, 0, 0)
    })

    currentY -= lineHeight + 10
    page.drawText(`Subproducto: ${subProduct}`, {
      x: 50,
      y: currentY,
      size: titleSize,
      color: rgb(0, 0, 0)
    })

    currentY -= lineHeight * 2
    page.drawText('Documentos Requeridos:', {
      x: 50,
      y: currentY,
      size: titleSize,
      color: rgb(0, 0, 0)
    })

    currentY -= lineHeight
    for (const doc of requiredDocs) {
      page.drawText('[', {
        x: 50,
        y: currentY,
        size: fontSize,
        color: rgb(0, 0, 0)
      })

      if (doc.isPresent) {
        page.drawText('X', {
          x: 53,
          y: currentY,
          size: fontSize,
          color: rgb(0, 0.5, 0)
        })
      }

      page.drawText(']', {
        x: 60,
        y: currentY,
        size: fontSize,
        color: rgb(0, 0, 0)
      })

      page.drawText(doc.title, {
        x: 70,
        y: currentY,
        size: fontSize,
        color: doc.isPresent ? rgb(0, 0, 0) : rgb(0.8, 0, 0)
      })
      currentY -= lineHeight
    }

    if (optionalDocs.length > 0) {
      currentY -= lineHeight
      page.drawText('Documentos Opcionales:', {
        x: 50,
        y: currentY,
        size: titleSize,
        color: rgb(0, 0, 0)
      })

      currentY -= lineHeight
      for (const doc of optionalDocs) {
        page.drawText('[', {
          x: 50,
          y: currentY,
          size: fontSize,
          color: rgb(0, 0, 0)
        })

        if (doc.isPresent) {
          page.drawText('X', {
            x: 53,
            y: currentY,
            size: fontSize,
            color: rgb(0, 0.5, 0)
          })
        }

        page.drawText(']', {
          x: 60,
          y: currentY,
          size: fontSize,
          color: rgb(0, 0, 0)
        })

        page.drawText(doc.title, {
          x: 70,
          y: currentY,
          size: fontSize,
          color: doc.isPresent ? rgb(0, 0, 0) : rgb(0.5, 0.5, 0)
        })
        currentY -= lineHeight
      }
    }
  }

  private async addTitlePage(pdfDoc: PDFDocument, title: string) {
    const page = pdfDoc.addPage()
    const { height } = page.getSize()
    page.drawText(title, {
      x: 50,
      y: height / 2,
      size: 20,
      color: rgb(0, 0, 0),
    })
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
