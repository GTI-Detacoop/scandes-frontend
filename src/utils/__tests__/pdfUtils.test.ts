import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { PDFCombiner, downloadPDF } from '../pdfUtils'
import { PDFDocument } from 'pdf-lib'

// Mock pdf-lib
vi.mock('pdf-lib', () => {
  const mockPage = {
    getSize: vi.fn().mockReturnValue({ width: 595, height: 842 }),
    drawText: vi.fn(),
    drawImage: vi.fn()
  }

  const mockDoc = {
    addPage: vi.fn().mockReturnValue(mockPage),
    save: vi.fn().mockReturnValue(new Uint8Array()),
    copyPages: vi.fn().mockReturnValue([mockPage]),
    embedJpg: vi.fn().mockReturnValue({
      scale: vi.fn().mockReturnValue({ width: 100, height: 100 })
    })
  }

  return {
    PDFDocument: {
      create: vi.fn().mockResolvedValue(mockDoc),
      load: vi.fn().mockResolvedValue({
        ...mockDoc,
        getPageIndices: vi.fn().mockReturnValue([0])
      })
    },
    rgb: vi.fn().mockReturnValue({ r: 0, g: 0, b: 0 })
  }
})

interface MockFileOptions {
  type?: string
}

// Mock de File y Blob para el entorno de pruebas
global.File = class MockFile {
  type: string

  constructor(_parts: BlobPart[], _filename: string, options: MockFileOptions = {}) {
    this.type = options.type || ''
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    return Promise.resolve(new ArrayBuffer(0))
  }
} as unknown as typeof File

global.Blob = class MockBlob {
  type: string
  constructor(parts?: BlobPart[], options: BlobPropertyBag = {}) {
    this.type = options.type || 'application/pdf'
  }
} as unknown as typeof Blob

describe('PDFCombiner', () => {
  let pdfCombiner: PDFCombiner

  beforeEach(() => {
    pdfCombiner = new PDFCombiner()
    vi.clearAllMocks()
  })

  describe('combine', () => {
    it('should create a PDF with summary page and documents', async () => {
      const files = [
        {
          title: 'Test Document 1',
          file: new File([], 'test1.pdf', { type: 'application/pdf' })
        },
        {
          title: 'Test Document 2',
          file: new File([], 'test2.jpg', { type: 'image/jpeg' })
        }
      ]

      const requiredDocs = [
        { title: 'Required Doc 1', isPresent: true },
        { title: 'Required Doc 2', isPresent: false }
      ]

      const optionalDocs = [
        { title: 'Optional Doc 1', isPresent: true }
      ]

      const result = await pdfCombiner.combine(
        files,
        'Test Product',
        'Test SubProduct',
        requiredDocs,
        optionalDocs
      )

      expect(result).toBeInstanceOf(Blob)
      expect(result.type).toBe('application/pdf')
      expect(PDFDocument.create).toHaveBeenCalled()
    })

    it('should handle unsupported file types', async () => {
      const files = [{
        title: 'Test Document',
        file: new File([], 'test.txt', { type: 'text/plain' })
      }]

      await expect(pdfCombiner.combine(
        files,
        'Test Product',
        'Test SubProduct',
        [],
        []
      )).rejects.toThrow('Unsupported file type: text/plain')
    })

    it('should create a PDF with only required documents', async () => {
      const files = [{
        title: 'Test Document',
        file: new File([], 'test.pdf', { type: 'application/pdf' })
      }]

      const requiredDocs = [
        { title: 'Required Doc 1', isPresent: true },
        { title: 'Required Doc 2', isPresent: false }
      ]

      const result = await pdfCombiner.combine(
        files,
        'Test Product',
        'Test SubProduct',
        requiredDocs,
        []
      )

      expect(result).toBeInstanceOf(Blob)
      expect(result.type).toBe('application/pdf')
      expect(PDFDocument.create).toHaveBeenCalled()
    })

    it('should create a PDF with only optional documents', async () => {
      const files = [{
        title: 'Test Document',
        file: new File([], 'test.pdf', { type: 'application/pdf' })
      }]

      const optionalDocs = [
        { title: 'Optional Doc 1', isPresent: true },
        { title: 'Optional Doc 2', isPresent: false }
      ]

      const result = await pdfCombiner.combine(
        files,
        'Test Product',
        'Test SubProduct',
        [],
        optionalDocs
      )

      expect(result).toBeInstanceOf(Blob)
      expect(result.type).toBe('application/pdf')
      expect(PDFDocument.create).toHaveBeenCalled()
    })

    it('should handle PDF and image files correctly', async () => {
      const files = [
        {
          title: 'PDF Document',
          file: new File([], 'test.pdf', { type: 'application/pdf' })
        },
        {
          title: 'Image Document',
          file: new File([], 'test.jpg', { type: 'image/jpeg' })
        }
      ]

      const result = await pdfCombiner.combine(
        files,
        'Test Product',
        'Test SubProduct',
        [],
        []
      )

      expect(result).toBeInstanceOf(Blob)
      expect(result.type).toBe('application/pdf')
      expect(PDFDocument.load).toHaveBeenCalled()
      expect(PDFDocument.create).toHaveBeenCalled()
    })
  })
})

describe('downloadPDF', () => {
  let originalCreateElement: typeof document.createElement
  let originalAppendChild: typeof document.body.appendChild
  let originalRemoveChild: typeof document.body.removeChild
  let originalCreateObjectURL: typeof URL.createObjectURL
  let originalRevokeObjectURL: typeof URL.revokeObjectURL

  beforeEach(() => {
    originalCreateElement = document.createElement
    originalAppendChild = document.body.appendChild
    originalRemoveChild = document.body.removeChild
    originalCreateObjectURL = URL.createObjectURL
    originalRevokeObjectURL = URL.revokeObjectURL

    document.createElement = vi.fn().mockReturnValue({
      href: '',
      download: '',
      click: vi.fn()
    })
    document.body.appendChild = vi.fn()
    document.body.removeChild = vi.fn()
    URL.createObjectURL = vi.fn().mockReturnValue('mock-url')
    URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    document.createElement = originalCreateElement
    document.body.appendChild = originalAppendChild
    document.body.removeChild = originalRemoveChild
    URL.createObjectURL = originalCreateObjectURL
    URL.revokeObjectURL = originalRevokeObjectURL
  })

  it('should create and trigger download link', () => {
    const blob = new Blob(['test'])
    const filename = 'test.pdf'

    downloadPDF(blob, filename)

    expect(document.createElement).toHaveBeenCalledWith('a')
    expect(URL.createObjectURL).toHaveBeenCalledWith(blob)
    expect(document.body.appendChild).toHaveBeenCalled()
    expect(document.body.removeChild).toHaveBeenCalled()
    expect(URL.revokeObjectURL).toHaveBeenCalled()
  })

  it('should use default filename if not provided', () => {
    const blob = new Blob(['test'])

    downloadPDF(blob)

    const link = (document.createElement as ReturnType<typeof vi.fn>).mock.results[0].value
    expect(link.download).toBe('documentos-combinados.pdf')
  })
})
