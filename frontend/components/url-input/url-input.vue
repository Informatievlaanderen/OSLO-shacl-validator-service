<template>
  <vl-form-message-label :for="id"> {{ label }}</vl-form-message-label>
  <vl-input-field
    :id="id"
    :name="name"
    mod-block
    :placeholder="placeholder"
    @input="onChange"
  />
</template>

<script setup lang="ts" name="urlInput">
import type { UrlInput } from '~/types/urlInput'
defineProps<UrlInput>()
</script>
