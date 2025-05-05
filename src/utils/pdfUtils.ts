import { PDFDocument, rgb } from 'pdf-lib'

interface FileToCombine {
  title: string
  file: File | Blob
}

export class PDFCombiner {
  async combine(files: FileToCombine[]): Promise<Blob> {
    const pdfDoc = await PDFDocument.create()

    for (const fileData of files) {
      await this.addTitlePage(pdfDoc, fileData.title)
      const arrayBuffer = await fileData.file.arrayBuffer()

      if (fileData.file.type === 'application/pdf') {
        await this.addPDFContent(pdfDoc, arrayBuffer)
      } else if (fileData.file.type.startsWith('image/')) {
        await this.addImageContent(pdfDoc, arrayBuffer, fileData.file.type)
      } else {
        throw new Error(`Unsupported file type: ${fileData.file.type}`)
      }
    }

    const pdfBytes = await pdfDoc.save()
    return new Blob([pdfBytes], { type: 'application/pdf' })
  }

  private async addTitlePage(pdfDoc: PDFDocument, title: string) {
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
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

  private async addImageContent(pdfDoc: PDFDocument, buffer: ArrayBuffer, mimeType: string) {
    const image = await pdfDoc.embedJpg(buffer) // use embedPng if needed
    const page = pdfDoc.addPage()
    const { width: pageWidth, height: pageHeight } = page.getSize()
    const { width: imgWidth, height: imgHeight } = image.scale(1)

    // Scale image to fit within page, preserving aspect ratio
    const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight) * 0.95 // leave some margin
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
