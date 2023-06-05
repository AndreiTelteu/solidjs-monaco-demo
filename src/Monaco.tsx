import { createEffect, createSignal, mergeProps, onMount } from "solid-js";
import * as monaco from "monaco-editor";
import { produce } from "solid-js/store";
import fileService from "./fileService";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === "json") {
            return new jsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
            return new tsWorker();
        }
        return new editorWorker();
    },
};

export type EditorRef = {
    save: () => Promise<boolean>;
};

export default function Monaco(props) {
    props = mergeProps({ options: {}, value: "", showActionBar: true }, props);
    let editorObj: monaco.editor.IStandaloneCodeEditor;
    let editorRef;
    const [content, setContent] = createSignal<string>();
    let langs = monaco.languages.getLanguages();

    onMount(() => {
        props.options.model =
            monaco.editor.getModel(
                monaco.Uri.parse("file:///" + props?.item?.path)
            ) ||
            monaco.editor.createModel(
                content(),
                undefined,
                monaco.Uri.parse("file:///" + props?.item?.path)
            );
        editorObj = monaco.editor.create(editorRef, props.options);

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
                        //@ts-ignore
                        i.dirty = true;
                        //@ts-ignore
                        i.fixed = true;
                    })
                );
            }
            setContent(editorContent);
        });
    });

    createEffect(() => {
        content?.();
        if (!props.item?.dirty) {
            let state = editorObj.saveViewState();
            editorObj.setValue(content?.() || "");
            editorObj.restoreViewState(state);
        }
    });

    createEffect(() => {
        props?.item?.selected;
        if (props?.item?.selected == true && props?.item?.dirty == false) {
            console.log("selected ! fetch new content !!!", props?.item?.path);
            fileService
                .open(props?.item?.path)
                .then((response) => {
                    if (response !== content()) setContent(response);
                })
                .catch((err) => setContent(err.error));
        }
    });

    if (props.ref) {
        props.ref({
            save: () => {
                return fileService.save(props?.item?.path, content());
            },
        });
    }

    return (
        <div
            ref={editorRef}
            style={{
                display: props?.item?.selected ? "block" : "none",
                height: "100%",
                width: "100%",
            }}
        ></div>
    );
}
