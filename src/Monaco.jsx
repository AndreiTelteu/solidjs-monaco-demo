import { createEffect, createSignal, mergeProps, onMount } from "solid-js";
import * as monaco from "monaco-editor";
import { produce } from "solid-js/store";

export default function Monaco(props) {
    props = mergeProps({ options: {}, value: "", showActionBar: true }, props);
    const [content, setContent] = createSignal();

    onMount(() => {
        editorObj = monaco.editor.create(editorRef, props.options);
        let langs = monaco.languages.getLanguages();
        monaco.editor.setModelLanguage(editorObj.getModel(), "php");
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
        // editorObj.setValue(content())
        editorObj.onKeyUp(() => {
            const editorContent = editorObj.getValue();
            if (editorContent !== content()) {
                props?.setTabs?.(
                    (i) => i.path === props?.item?.path,
                    produce((i) => {
                        i.dirty = true;
                        i.fixed = true;
                    })
                );
            }
            setContent(editorContent);
        });
    });

    createEffect(() => {
        content?.();
        if (!props.item.dirty) {
            editorObj.setValue(content?.() || "");
        }
    });
    createEffect(() => {
        props?.item?.selected;
        if (props?.item?.selected == true && props?.item?.dirty == false) {
            console.log("selected ! fetch new content !!!", props?.item?.path);
        }
    });

    let editorObj;
    let editorRef;
    return (
        <div
            ref={editorRef}
            style={{
                display: props?.item?.selected ? "block" : "none",
                height: "100%",
                with: "100%",
            }}
        ></div>
    );
}
