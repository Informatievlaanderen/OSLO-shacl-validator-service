<template>
  <vl-tabs :hash-change="false">
    <vl-tab vl-tab id="pretty" label="Pretty">
      <vl-grid mod-stacked>
        <GenericError v-if="errorMessage" :errorMessage="errorMessage" />
        <vl-column v-else v-for="result in resultObject">
          <vl-info-tile
            v-if="result.type === VALIDATION_REPORT"
            tag-name="div"
            class="overviewItem"
            title="ValidationReport"
            :subtitle="result.type"
          >
            Conforms? <strong>{{ result.conforms }}</strong>
            <br />
            Aantal fouten?
            <strong>{{ Object.keys(resultObject).length - 1 }}</strong>
          </vl-info-tile>
          <vl-info-tile
            v-else
            tag-name="div"
            class="errorItem"
            :title="result.message"
            :subtitle="result.type"
          >
            Location: <strong>{{ result?.resultPath }}</strong>
          </vl-info-tile>
        </vl-column>
      </vl-grid>
    </vl-tab>
    <vl-tab id="raw" label="Raw">
      <GenericError v-if="errorMessage" :errorMessage="errorMessage" />
      <vl-grid v-else mod-stacked>
        <vl-column width="4">
          <vl-select
            id="select"
            v-model="selectedFormat"
            placeholder-text="Selecteer een formaat"
          >
            <option :value="MIME_TYPES.RDF_XML">Rdf/xml</option>
            <option :value="MIME_TYPES.LD_JSON">JSON-LD</option>
            <option :value="MIME_TYPES.TURTLE">Turtle</option>
            <option :value="MIME_TYPES.N_TRIPLES" selected>N-Triples</option>
          </vl-select>
        </vl-column>
        <vl-column width="8" class="flexEnd">
          <vl-link :download="nameDownloadFile" :href="downloadLink">
            <vl-icon icon="file-download" />
            Download
          </vl-link>
        </vl-column>
        <vl-column>
          <vl-textarea
            disabled
            mod-block
            :value="displayedResult"
          ></vl-textarea>
        </vl-column>
      </vl-grid>
    </vl-tab>
  </vl-tabs>
</template>

<script setup lang="ts">
import { RdfXmlParser } from 'rdfxml-streaming-parser'
import { DataFactory } from 'rdf-data-factory'
import GenericError from './generic-error.vue'
import {
  FILE_EXTENSIONS,
  MIME_TYPES,
  VALIDATION_REPORT,
  NamedNode,
  VALIDATION_ERROR,
} from '~/constants/constants'
import type { SHACLValidationResult } from '~/types/schaclValidationResult'
import { Readable } from 'readable-stream'
import type * as RDF from '@rdfjs/types'

const props = defineProps<{
  SHACL: string
  selectedAP: string
  isFile: boolean
  requestBody: object
}>()

const df: DataFactory = new DataFactory()

const resultObject = ref<SHACLValidationResult>({})
const selectedFormat = ref<string>(MIME_TYPES.RDF_XML)
const displayedResult = ref<string>('')
const downloadLink = ref<string>('')
const nameDownloadFile = ref<string>('')
const errorMessage = ref<string>('')

const parseResult = (rdfXML: string) => {
  try {
    const stream = new Readable()
    stream.push(rdfXML) // Push the rdfXML into the stream
    stream.push(null) // Indicates end of data

    const myParser = new RdfXmlParser()

    stream
      .pipe(myParser)
      .on('data', processQuad)
      .on('error', (err) => handleError(err))
      .on('end', () => {
        // reset error message since succesfully parsed
        errorMessage.value = ''
        // call change format to display the result
        changeFormat()
      })
  } catch (err: unknown) {
    errorMessage.value = err instanceof Error ? err.message : VALIDATION_ERROR
  }
}

const handleError = (err: unknown) => {
  errorMessage.value = err instanceof Error ? err.message : VALIDATION_ERROR
}

const processQuad = (quad: RDF.Quad) => {
  const subject = quad.subject.value
  const predicate = quad.predicate.value
  const object = quad.object.value

  if (!resultObject.value[subject]) {
    resultObject.value[subject] = {}
  }

  if (predicate === df.namedNode(NamedNode.Conforms).value) {
    resultObject.value[subject].conforms = object
  }

  if (predicate === df.namedNode(NamedNode.Type).value) {
    resultObject.value[subject].type = object
  }

  if (predicate === df.namedNode(NamedNode.ResultPath).value) {
    resultObject.value[subject].resultPath = object
  }

  if (predicate === df.namedNode(NamedNode.ResultMessage).value) {
    resultObject.value[subject].message = object
  }
}

const changeFormat = async () => {
  try {
    const requestBody: object = props.requestBody

    const response = await fetch(import.meta.env.VITE_VALIDATOR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': MIME_TYPES.APPLICATION_JSON,
      },
      body: JSON.stringify({
        ...requestBody,
        reportSyntax: selectedFormat.value,
      }),
    })

    const decoder = new TextDecoder('utf-8')
    const reader = response.body?.getReader()
    const { value } = (await reader?.read()) as { value?: Uint8Array }

    displayedResult.value = decoder.decode(value)
    updateDownloadLinkAndName(decoder.decode(value))
  } catch (err) {
    console.log(err)
    errorMessage.value = err instanceof Error ? err.message : VALIDATION_ERROR
  }
}

const updateDownloadLinkAndName = (value: string) => {
  downloadLink.value = 'data:application/octet-stream;base64,' + btoa(value)
  nameDownloadFile.value = 'result'

  const extension =
    FILE_EXTENSIONS[selectedFormat.value] || FILE_EXTENSIONS[MIME_TYPES.LD_JSON]
  nameDownloadFile.value += extension
}

watch(selectedFormat, changeFormat)
watch(
  () => props.SHACL,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      // reset resultObject to avoid duplicates and multiple entries
      resultObject.value = {}
      parseResult(newVal)
    }
  },
)
onMounted(() => {
  if (props.SHACL) {
    parseResult(props.SHACL)
  }
})
</script>

<style scoped src="./style.scss" />
