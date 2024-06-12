import { FILE_READ_ERROR, MIME_TYPES } from '~/constants/constants'
import type { CustomFile } from '~/types/customFile'
import { DataFactory } from 'rdf-data-factory'

const df: DataFactory = new DataFactory()

export const fetchAPs = async () => {
  try {
    const result: Response = await fetch(import.meta.env.VITE_AP_LIST_URL)
    const data = await result.json()
    const types = data.validationTypes.map(
      (val: { type: string; description: string }) => val.type,
    )
    console.log(data)
    return types
  } catch (error) {
    console.error(error)
  }
}

export const sendValidationRequest = async (body: object) => {
  const result: Response = await fetch(import.meta.env.VITE_VALIDATOR_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': MIME_TYPES.LD_JSON,
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

export const readFileAsBase64 = (file: CustomFile): Promise<object> => {
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
    contentToValidate: content,
    validationType: 'core',
    reportSyntax: MIME_TYPES.LD_JSON,
    externalRules: [
      {
        ruleSet: externalURL,
      },
    ],
  }
}

export const validateURL = (content: string, selectedAP: string): object => {
  return {
    contentToValidate: content,
    validationType: selectedAP,
    reportSyntax: MIME_TYPES.RDF_XML,
  }
}

export const validateFile = async (
  content: CustomFile,
  selectedAP: string,
): Promise<object> => {
  let body: object = await readFileAsBase64(content)
  return {
    ...body,
    validationType: selectedAP,
  }
}
