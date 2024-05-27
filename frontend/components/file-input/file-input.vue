<template>
  <vl-upload
    id="upload-component"
    name="upload-component"
    url="https://httpbin.org/post"
    upload-drag-text="Sleep het bestand hierheen of klik om te bladeren."
    upload-response-error="Er liep iets fout bij het uploaden."
    upload-invalid-file-type="Dit bestandstype is niet toegestaan."
    upload-max-files-exceeded="bestand(en) uploaden maximaal."
    upload-max-file-size="Het bestand van maximaal "
    upload-files-hidden-close-label="Verwijder alle bestanden"
    upload-label="Bestand toevoegen"
    :max-files="1"
    max-files-msg="Maximaal 1 bestand toegestaan"
    :max-filesize="20000000"
    allowed-file-types=".ttl, .rdf, .xml, .json, .jsonld"
    max-filesize-msg="De bestandsgrootte is te groot"
    @upload-error="onError"
    @upload-file-added="onAdd"
    @upload-removed-file="onRemove"
  />
</template>

<script setup lang="ts" name="fileInput">
import type { FileInput } from '~/types/fileInput'
defineProps<FileInput>()
</script>
