import { createSignal, mergeProps, onMount } from "solid-js";
import * as monaco from "monaco-editor";

export default function Monaco(props) {
  props = mergeProps({ options: { value: '' }, showActionBar: true }, props);
  const [content, setContent] = createSignal(props.options?.value);

  onMount(() => {
    editorObj = monaco.editor.create(editorRef, props.options);
    let langs = monaco.languages.getLanguages();
    monaco.editor.setModelLanguage(editorObj.getModel(), 'php');
    // console.log('langs', langs)
    editorObj.updateOptions({
      fontSize: 16,
    });
    editorObj.updateOptions({
      tabSize: 4,
      insertSpaces: true,
    });
    // editorObj.updateOptions({
    //   theme: 'vs-dark', //'vs' | 'vs-dark' | 'hc-black' | 'hc-light'
    // });
    // editorObj.updateOptions({
    //   cursorStyle: 'line', // 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin'
    // });
    // editorObj.updateOptions({
    //   cursorBlinking: '', //'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
    // });
    editorObj.setValue(content())
    editorObj.onKeyUp(() => {
      const editorContent = editorObj.getValue();
      setContent(editorContent)
    });
  })

  let editorObj;
  let editorRef;
  return <div ref={editorRef} style={{height: '100%', with: '100%'}}></div>
}
