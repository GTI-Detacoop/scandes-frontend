import { PDFDocument, rgb } from 'pdf-lib'
import { jsPDF } from 'jspdf'

interface FileToCombine {
  title: string
  file: File | Blob
}

export async function combineFilesIntoPDF(files: FileToCombine[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create()

  for (const { title, file } of files) {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const fileType = file.type

      const separatorPage = pdfDoc.addPage()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { width, height } = separatorPage.getSize()
      const fontSize = 20

      separatorPage.drawText(title, {
        x: 50,
        y: height / 2,
        size: fontSize,
        color: rgb(0, 0, 0),
      })

      if (fileType === 'application/pdf') {
        const loadedPdf = await PDFDocument.load(arrayBuffer)
        const pages = await pdfDoc.copyPages(loadedPdf, loadedPdf.getPageIndices())
        pages.forEach(page => pdfDoc.addPage(page))
      } else if (fileType.startsWith('image/')) {
        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()

        const base64Image = await blobToBase64(new Blob([arrayBuffer], { type: fileType }))

        const tempPdf = new jsPDF()
        tempPdf.addImage(base64Image, 'JPEG', 0, 0, width, height)

        const tempPdfBytes = tempPdf.output('arraybuffer')
        const tempPdfDoc = await PDFDocument.load(tempPdfBytes)
        const [tempPage] = await pdfDoc.copyPages(tempPdfDoc, [0])
        pdfDoc.addPage(tempPage)
      }

    } catch (error) {
      console.error(`Error procesando archivo ${title}:`, error)
      throw new Error(`Error al procesar el archivo ${title}`)
    }
  }

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      resolve(base64String.split(',')[1])
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
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
