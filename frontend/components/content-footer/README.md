# Content footer

This component is a reusable footer component that should be included in most pages

## How to use

```js
<template>
  <content-footer />
</template>
```

## Polyfill
In this component we import the generic footer component from the Burgerprofiel-application. 

```js
    switch (import.meta.env.VITE_ENVIRONMENT) {
      case 'Test':
        footerScript.setAttribute(
          'src',
          'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/c0df3610-36b9-4113-a487-05dfed92c317/embed',
        )
      case 'Production':
        footerScript.setAttribute(
          'src',
          'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/widget/f1d7f80f-ad17-4f25-92b4-027a99785068/embed',
        )
      default:
        footerScript.setAttribute(
          'src',
          'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/c0df3610-36b9-4113-a487-05dfed92c317/embed',
        )
    }
    document.head.appendChild(footerScript)
```

This component requires a polyfill to be present inside the project. For more information, please refer to the [documentation on Confluence](https://vlaamseoverheid.atlassian.net/wiki/spaces/IKPubliek/pages/5930059380/Ondersteunde+browers+en+browser+polyfills) 

We include the polyfill inside this project inside the [configuration file](/nuxt.config.ts)


