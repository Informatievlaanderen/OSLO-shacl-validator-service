import { FILE_READ_ERROR, MIME_TYPES, NamedNode } from "~/constants/constants";
import type { CustomFile } from "~/types/customFile";
import type * as RDF from '@rdfjs/types';
import { DataFactory } from 'rdf-data-factory'
import type { SHACLValidationResult } from "~/types/schaclValidationResult";

const df: DataFactory = new DataFactory()

export const convertReadableStreamToString = async (stream: ReadableStream): Promise<string> => {
  const reader = stream.getReader();
  let result = '';
  const decoder = new TextDecoder('utf-8');

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    result += decoder.decode(value);
  }

  return result;
};

export const readFileAsBase64 = (file: CustomFile, selectedAP: string): Promise<object> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e?.target?.result
      if (typeof data === 'string') {
        const base64 = data.substring(data.indexOf(',') + 1)
        resolve({
          contentSyntax: "text/turtle",
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

export const validateURL = (content: string, selectedAP: string): object => {
  return {
    contentToValidate: content,
    validationType: selectedAP,
    reportSyntax: MIME_TYPES.RDF_XML,
  }
}

export const validateFile = (base64: string, selectedAP: string): object => {
  return {
    contentSyntax: "text/turtle",
    contentToValidate: base64,
    embeddingMethod: 'BASE64',
    validationType: selectedAP,
    reportSyntax: MIME_TYPES.RDF_XML,
  }
}
