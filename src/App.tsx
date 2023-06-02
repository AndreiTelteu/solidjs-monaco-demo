import { Component, createSignal, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";

// @ts-ignore
import MyCustomMonaco from "./Monaco";
import FileTree, { FileItem } from "./FileTree";
import ContextMenu, { ContextRef } from "./ContextMenu";
import Tabs, { TabItem } from "./Tabs";

const App: Component = () => {
    let context: ContextRef;
    const [value, setValue] = createSignal(`<?php
phpinfo();
`);
    const defaultFileAttrs = { open: false, selected: false };
    const [files, setFiles] = createStore<FileItem[]>([
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
            name: "Tabs.tsx",
            path: "Tabs.tsx",
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

    const [tabs, setTabs] = createStore<TabItem[]>([]);

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

    const onContextClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        context?.set({
            open: true,
            top: e.clientY,
            left: e.clientX,
            options: [
                {
                    type: "option",
                    label: "New file",
                    onClick: () => {
                        console.log("new file");
                    },
                },
                {
                    type: "option",
                    label: "New folder",
                    onClick: () => {
                        console.log("new folder");
                    },
                },
                { type: "separator" },
                {
                    type: "option",
                    label: "Cut",
                    onClick: () => {},
                },
                {
                    type: "option",
                    label: "Copy",
                    onClick: () => {},
                },
                {
                    type: "option",
                    label: "Paste",
                    disabled: true,
                    onClick: () => {},
                },
                { type: "separator" },
                {
                    type: "option",
                    label: "Download...",
                    onClick: () => {},
                },
                {
                    type: "option",
                    label: "Upload...",
                    onClick: () => {},
                },
                { type: "separator" },
                {
                    type: "option",
                    label: "Rename...",
                    onClick: () => {},
                },
                {
                    type: "option",
                    label: "Delete permanently",
                    onClick: () => {},
                },
            ],
        });
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                "flex-direction": "row",
                "align-content": "stretch",
                overflow: "hidden",
                position: "relative",
            }}
            onContextMenu={onContextClick}
            onClick={(e) => context?.set({ open: false })}
        >
            <ContextMenu ref={context} />
            <div
                style={{
                    width: "200px",
                    display: "flex",
                    "flex-direction": "column",
                    "align-content": "stretch",
                }}
            >
                <FileTree
                    state={files}
                    setState={setFiles}
                    onSelectItem={(item: FileItem) => {
                        setTabs({}, "selected", false);
                        setTabs(
                            produce((v: TabItem[]) => {
                                v.forEach((i) => (i.selected = false));
                                let alreadyOpened = v.findIndex(
                                    (f) => f.path == item.path
                                );
                                if (alreadyOpened !== -1) {
                                    v[alreadyOpened].selected = true;
                                    // TODO: doubleclick should make fixed true here
                                    return;
                                }
                                let notFixedItem = v.findIndex(
                                    (f) => f.fixed == false
                                );
                                if (notFixedItem !== -1) {
                                    v[notFixedItem] = {
                                        name: item.name,
                                        path: item.path,
                                        selected: true,
                                        fixed: false,
                                    };
                                    return;
                                }
                                v.push({
                                    name: item.name,
                                    path: item.path,
                                    selected: true,
                                    fixed: false,
                                });
                            })
                        );
                    }}
                />
            </div>
            <div style={{ "flex-grow": 1 }}>
                <Tabs state={tabs} setState={setTabs} />
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
