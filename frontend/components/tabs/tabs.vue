<template>
  <vl-tabs :hash-change="true">
    <template v-for="tab in tabs">
      <vl-tab :label="tab?.label" :id="tab?.id" mod-show-title>
        <slot v-if="tab?.id" :name="tab.id" />
      </vl-tab>
    </template>
  </vl-tabs>
</template>

<script setup lang="ts" name="tabs">
import type { Tab } from '~/types/tab'

defineProps({
  tabs: {
    type: Array<Tab>,
  },
})
</script>
