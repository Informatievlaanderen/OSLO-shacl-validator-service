<template>
  <vl-column width="12" width-s="12" v-if="errorMessage">
    <vl-alert icon="warning" title="Fout!" mod-error>
      <p>
        {{ errorMessage }}
      </p>
    </vl-alert>
  </vl-column>
</template>

<script setup lang="ts" name="genericError">
defineProps<{
  errorMessage: string
}>()
</script>
