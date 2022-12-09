<script lang="ts" context="module">
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

  let monaco: typeof Monaco
  let extraLibPlotly: Monaco.IDisposable
  let extraLib: Monaco.IDisposable
  let editorsMounted = 0
  let isSetup = false

  async function setup() {
    if (monaco) return

    // @ts-ignore
    self.MonacoEnvironment = {
      getWorker: function (_moduleId: any, label: string) {
        if (label === 'json') {
          return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
          return new tsWorker()
        }
        return new editorWorker()
      },
    }

    monaco = await import('monaco-editor')
    return
  }

  async function unMount() {
    extraLibPlotly?.dispose()
    extraLib?.dispose()
  }

  export async function setExtraLibPlotly() {
    if (!monaco) await setup()
    extraLibPlotly?.dispose()
    const PlotlyTypeRaw = (await import('$assets/plotly.d.ts?raw')).default
    const PlotlyTypeUrl = (await import('$assets/plotly.d.ts?url')).default
    extraLibPlotly = monaco.languages.typescript.typescriptDefaults.addExtraLib(
      PlotlyTypeRaw,
      PlotlyTypeUrl
    )
  }

  export async function setExtraLib(str: string) {
    if (!monaco) await setup()
    extraLib?.dispose()
    extraLib = monaco.languages.typescript.typescriptDefaults.addExtraLib(
      str,
      'extraLib'
    )
  }
</script>

<script lang="ts">
  import type Monaco from 'monaco-editor'
  import { onMount } from 'svelte'

  export let value = ''
  export let options: Monaco.editor.IStandaloneEditorConstructionOptions = {}

  let divEl: HTMLDivElement
  let editor: Monaco.editor.IStandaloneCodeEditor

  onMount(async () => {
    await setup()
    editorsMounted++

    editor = monaco.editor.create(divEl, {
      value,
      language: 'typescript',
      minimap: { enabled: false },
      // language: "javascript",
      // automaticLayout: true,
      ...options,
    })

    editor.onDidChangeModelContent(handleChange)

    return () => {
      editor.dispose()
      editorsMounted--
      if (editorsMounted === 0) unMount()
    }
  })

  function handleChange(event: Monaco.editor.IModelContentChangedEvent) {
    value = editor.getValue()
  }
</script>

<div bind:this={divEl} class="h-screen container" />

<style>
  .container {
    height: 100%;
    /*
    border: #ccc solid 1px;
    border-radius: 5px;
    */
  }
</style>
