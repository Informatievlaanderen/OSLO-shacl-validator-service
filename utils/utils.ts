import { FILE_READ_ERROR, MIME_TYPES } from '~/constants/constants'
import type { CustomFile } from '~/types/customFile'
import { DataFactory } from 'rdf-data-factory'

const df: DataFactory = new DataFactory()

export const sendValidationRequest = async (body: object) => {
  const result: Response = await fetch(import.meta.env.VITE_VALIDATOR_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': MIME_TYPES.APPLICATION_JSON,
    },
    body: JSON.stringify(body),
  })
  return result
}

export const convertReadableStreamToString = async (
  stream: ReadableStream,
): Promise<string> => {
  const reader = stream.getReader()
  let result = ''
  const decoder = new TextDecoder('utf-8')

  while (true) {
    const { value, done } = await reader.read()

    if (done) {
      break
    }

    result += decoder.decode(value)
  }

  return result
}

export const readFileAsBase64 = (
  file: CustomFile,
  selectedAP: string,
): Promise<object> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e?.target?.result
      if (typeof data === 'string') {
        const base64 = data.substring(data.indexOf(',') + 1)
        resolve({
          contentSyntax: MIME_TYPES.LD_JSON,
          contentToValidate: base64,
          embeddingMethod: 'BASE64',
          validationType: selectedAP,
        })
      } else {
        reject(new Error(FILE_READ_ERROR))
      }
    }
    reader.onerror = () => {
      reject(new Error(FILE_READ_ERROR))
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  })
}

export const validateExternalURL = (
  content: string,
  externalURL: string,
): object => {
  return {
    contentToValidate:
      'https://www.itb.ec.europa.eu/files/samples/shacl/sample-invalid.ttl',
    validationType: 'core',
    reportSyntax: 'text/turtle',
    externalRules: [
      {
        ruleSet: externalURL,
      },
    ],
  }
}

export const validateURL = (
  content: string,
  selectedAP: string,
  apURL: string,
): object => {
  if (apURL) {
    return validateExternalURL(content, apURL)
  }
  return {
    contentToValidate: content,
    validationType: selectedAP,
    reportSyntax: MIME_TYPES.RDF_XML,
  }
}

export const validateFile = (base64: string, selectedAP: string): object => {
  return {
    contentSyntax: MIME_TYPES.LD_JSON,
    contentToValidate: base64,
    embeddingMethod: 'BASE64',
    validationType: selectedAP,
    reportSyntax: MIME_TYPES.RDF_XML,
  }
}
