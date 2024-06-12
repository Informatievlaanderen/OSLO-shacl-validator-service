# Tabs

This component is a reusable tabs component. It's a wrapper around the [vl-ui-tabs component](https://overheid.vlaanderen.be/webuniversum/v3/documentation/components/vl-ui-tabs) from the Webuniversum of the Flemish Government.

## How to use

```js
import type { Tab } from '~/types/tab'

const tabHeaders: Tab[] = [
  { id: 'file', label: 'Valideer een bestand' },
  { id: 'url', label: 'Valideer een URL' },
]

<template>
  <tabs :tabs="tabHeaders">
    <template #file>hello from file</template>
    <template #url>hello from url</template>
  </tabs>
</template>
```
