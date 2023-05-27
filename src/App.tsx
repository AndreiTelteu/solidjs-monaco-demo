import { Component, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";

// @ts-ignore
import MyCustomMonaco from "./Monaco";
// @ts-ignore
import FileTree from "./FileTree";
// @ts-ignore
import ContextMenu from "./ContextMenu";

const App: Component = () => {
    let context;
    const [value, setValue] = createSignal(`<?php
phpinfo();
`);
    const defaultFileAttrs = { open: false, selected: false };
    const [state, setState] = createStore([
        { type: "dir", name: "src", path: "src/", ...defaultFileAttrs },
        { type: "dir", name: "docs", path: "src/docs/", ...defaultFileAttrs },
        {
            type: "file",
            name: "index.md",
            path: "src/docs/index.md",
            ...defaultFileAttrs,
        },
        {
            type: "file",
            name: "main.js",
            path: "src/main.js",
            ...defaultFileAttrs,
        },
        {
            type: "file",
            name: "index.php",
            path: "index.php",
            ...defaultFileAttrs,
        },
        {
            type: "file",
            name: "index.js",
            path: "index.js",
            ...defaultFileAttrs,
        },
        {
            type: "file",
            name: "contact.php",
            path: "contact.php",
            ...defaultFileAttrs,
        },
        {
            type: "file",
            name: "package.json",
            path: "package.json",
            ...defaultFileAttrs,
        },
    ]);
    // const capturecon = () => {
    //     const root = document.querySelector(".shadow-root-host");
    //     const context = root?.shadowRoot?.querySelector(
    //         ".context-view.monaco-menu-container"
    //     );
    //     const isVisible = context?.style?.display === "";
    //     console.log({ isVisible });
    //     if (isVisible) setValue(context.innerHTML);
    // };
    // onMount(() => {
    //     setInterval(() => {
    //         capturecon();
    //     }, 1000);
    // });

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                "flex-direction": "row",
                "align-content": "stretch",
            }}
        >
            <ContextMenu ref={context} />
            <div
                style={{
                    width: "200px",
                    display: "flex",
                    "flex-direction": "column",
                    "align-content": "stretch",
                }}
                onClick={(e: MouseEvent) => {
                    console.log("parent click", e);
                    context?.open({
                        open: true,
                        top: e.clientY,
                        left: e.clientX,
                    });
                }}
            >
                <FileTree state={state} setState={setState} />
            </div>
            <div style={{ "flex-grow": 1 }}>
                <MyCustomMonaco
                    value={value}
                    options={{
                        value: value(),
                        theme: "vs-dark",
                        minimap: {
                            enabled: true,
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default App;
