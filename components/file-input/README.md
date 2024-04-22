# Tabs

This component is a reusable upload component. It's a wrapper around the [vl-ui-upload component](https://overheid.vlaanderen.be/webuniversum/v3/documentation/forms/vl-ui-upload) from the Webuniversum of the Flemish Government.

## How to use

```js
import type { FileInput } from '~/types/fileInput'

<template>
  <file-input
    :onAdd="onAdd"
    :onError="onError"
    :onRemove="onRemove"
    :disabled="false"
  />
</template>
```
