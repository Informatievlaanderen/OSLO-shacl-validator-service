<template>
  <content-header
    title="OSLO"
    href="https://www.vlaanderen.be/digitaal-vlaanderen"
    subtitle="OSLO VALIDATOR"
  />
  <vl-layout>
    <vl-region>
      <vl-grid mod-stacked>
        <vl-column width="12" width-s="12">
          <vl-title tag-name="h1" tag-style="h2" mod-no-space-bottom>
            Valideer je bestand of URL
          </vl-title>
        </vl-column>
        <vl-column width="12" width-s="12">
          <vl-tabs :hash-change="true" ref="tabsRef">
            <vl-tab id="file" label="Valideer een bestand" mod-show-title>
              <file-input
                :onAdd="onAdd"
                :onError="onError"
                :onRemove="onRemove"
              />
            </vl-tab>
            <vl-tab id="url" label="Valideer een URL" mod-show-title>
              <vl-form-message-label for="URL">
                Vul een url in</vl-form-message-label
              >
              <vl-input-field
                id="URL"
                name="URL"
                mod-block
                placeholder="https://data.vlaanderen.be/doc/applicatieprofiel/PersoonBasis/ontwerpstandaard/2023-06-01/shacl/persoon-basis-SHACL.ttl"
                v-model="shaclURL"
              />
            </vl-tab>
          </vl-tabs>
        </vl-column>
        <vl-column width="12" width-s="12">
          <vl-typography>
            <h4>Applicatieprofiel</h4>
          </vl-typography>
          <vl-form-message-label for="AP">
            Selecteer een applicatieprofiel
          </vl-form-message-label>
          <vl-multiselect
            v-model="selectedAP"
            :options="data?.APs"
            :custom-label="(ap: string) => ap?.replace('_', ' ')"
            :id="'multiselect-5'"
            :mod-multiple="false"
            placeholder="Selecteer een applicatieprofiel"
          >
            <option v-for="ap in data?.APs" :value="ap.toLowerCase()">
              {{ ap?.replace('_', ' ') }}
            </option>
            <template v-slot:noResult>
              <span>Geen applicatieprofielen gevonden...</span>
            </template>
            <template v-slot:noOptions>
              <span>Geen opties beschikbaar!</span>
            </template>
          </vl-multiselect>
          <!-- <vl-select
            id="AP"
            v-model="selectedAP"
            mod-block
            placeholderText="Kies een applicatieprofiel..."
          >
            <option v-for="ap in data?.APs" :value="ap.toLowerCase()">
              {{ ap?.replace('_', ' ') }}
            </option>
          </vl-select> -->
        </vl-column>
        <vl-column width="12" width-s="12" v-if="errorMessage">
          <vl-alert icon="warning" title="Fout!" mod-error>
            <p>
              {{ errorMessage }}
            </p>
          </vl-alert>
        </vl-column>
        <vl-column width="12" width-s="12">
          <vl-button
            @click="validate"
            mod-block
            mod-wide
            :mod-disabled="isModDisabled"
          >
            Valideer
          </vl-button>
        </vl-column>
        <vl-column v-if="SHACL">
          <rdf-result
            :SHACL="SHACL"
            :selectedAP="selectedAP"
            :isFile="tabsRef?.activeTabIndex === 0"
            :requestBody="requestBody"
          />
        </vl-column>
        <vl-column>
          <isa-footer />
        </vl-column>
      </vl-grid>
    </vl-region>
  </vl-layout>
  <content-footer />
</template>

<script setup lang="ts">
import { API_ERROR_MESSAGE } from '~/constants/constants'
import type { CustomFile } from '~/types/customFile'

const error = ref(false)
const errorMessage = ref('')
const requestBody = ref()
// const selectedAP = ref('persoon_basis')
const selectedAP = ref('')
const shaclFile = ref<CustomFile | null>(null)
const shaclURL = ref<string>(
  // 'https://data.vlaanderen.be/doc/applicatieprofiel/persoon-basis/shacl/persoon-basis-SHACL.ttl',
  '',
)
const tabsRef = ref()
const SHACL = ref<string | null>(null)

const { data } = await useAsyncData('data', async () => {
  const APs = await fetchAPs()
  return {
    APs,
  }
})

const onAdd = (file: CustomFile) => {
  error.value = file.status === 'error'
  if (!error.value) shaclFile.value = file
}

const onRemove = () => {
  // reset errors
  shaclFile.value = null
  resetErrors()
}

const resetErrors = () => {
  error.value = false
  errorMessage.value = ''
}

const onError = () => {
  error.value = true
}

const isModDisabled = computed(() => {
  const isValid = shaclFile.value || shaclURL.value

  return !isValid || error.value
})

const validate = async () => {
  const isFileTabActive = tabsRef.value?.activeTabIndex === 0
  const validateInput = async (isFile: boolean) => {
    if (isFile && !shaclFile.value) {
      throw new Error(
        'shaclFile does not exist, please upload a file or provide a URL',
      )
    }

    const value = isFile ? shaclFile.value : shaclURL.value

    console.log(isFile)

    return isFile
      ? validateFile(<CustomFile>value, selectedAP?.value)
      : validateURL(<string>value, selectedAP?.value)
  }

  const validateFunction = async () => validateInput(isFileTabActive)
  try {
    const body: object = await validateFunction()

    const result: Response = await sendValidationRequest(body)
    if (!result?.body) {
      throw new Error(API_ERROR_MESSAGE)
    }

    const data = await convertReadableStreamToString(result.body)

    if (!result.ok) {
      throw new Error(data ?? API_ERROR_MESSAGE)
    }
    // Reset any existing errors upon successful validation
    resetErrors()
    // Store the request body to pass down to the rdf-result component
    requestBody.value = body
    // Store the SHACL data either as base64 or as a URL
    SHACL.value = data
  } catch (err: unknown) {
    console.log(err)
    errorMessage.value = err instanceof Error ? err.message : API_ERROR_MESSAGE
  }
}
</script>
