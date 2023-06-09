import { For } from "solid-js";
import { styled } from "solid-styled-components";
import { produce, SetStoreFunction } from "solid-js/store";

export type TabItem = {
    name: string;
    path: string;
    selected: boolean;
    fixed: boolean;
    dirty: boolean;
};

export default function Tabs(props: {
    state: TabItem[];
    setState: SetStoreFunction<TabItem[]>;
}) {
    const close = (item: TabItem, index: number) => {
        let newIndex = -1;
        props.setState(
            produce((v: TabItem[]) => {
                if (item.selected) {
                    newIndex = Math.max(0, index - 1);
                }
                v.splice(index, 1);
                if (v.length > 0 && newIndex < v.length && newIndex !== -1) {
                    v[newIndex].selected = true;
                }
            })
        );
    };

    return (
        <div class="monaco-editor">
            <TabBar>
                <For each={props.state}>
                    {(item, index) => (
                        <TabItemElement
                            class={`tab-item-element ${
                                item.selected ? "is-selected" : ""
                            } ${!item.fixed ? "is-not-fixed" : ""} ${
                                item.dirty ? "is-dirty" : ""
                            }`}
                            onAuxClick={(e) => {
                                if (e.which == 2) {
                                    // middle click close tab
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.stopImmediatePropagation();
                                    close(item, index());
                                }
                            }}
                            onClick={(e) => {
                                if (e.which == 2) {
                                    // safari still uses which==2 instead of onAuxClick
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.stopImmediatePropagation();
                                    close(item, index());
                                    return;
                                }
                                props.setState({}, "selected", false);
                                props.setState(
                                    (i) => i.path == item.path,
                                    "selected",
                                    true
                                );
                            }}
                            onDblClick={(e) => {
                                props.setState({}, "selected", false);
                                props.setState(
                                    (i) => i.path == item.path,
                                    produce((i) => {
                                        i.fixed = true;
                                        i.selected = true;
                                        return i;
                                    })
                                );
                            }}
                        >
                            {item.name}-{item.fixed ? "F" : "!f"}-
                            {item.dirty ? "D" : "!d"}
                            <TabClose
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.stopImmediatePropagation();
                                    close(item, index());
                                }}
                            />
                        </TabItemElement>
                    )}
                </For>
            </TabBar>
        </div>
    );
}

export const TabBar = styled("div")({
    background: "rgb(37, 37, 38)",
});

export const TabItemElement = styled("button")({
    appearance: "none",
    display: "inline-block",
    fontSize: "14px",
    background: "rgb(45, 45, 45)",
    color: "var(--vscode-foreground)",
    padding: "4px 8px",
    border: "none",
    ["&.is-selected"]: {
        background: "var(--vscode-editor-background)",
        color: "#fff",
    },
    ["&.is-not-fixed"]: {
        fontStyle: "italic",
    },
});

export const TabClose = styled("button")({
    appearance: "none",
    display: "inline-block",
    marginRight: "-4px",
    marginLeft: "4px",
    padding: "0 4px",
    border: "none",
    borderRadius: "6px",
    background: "rgba(255, 255, 255, 0)",
    color: "var(--vscode-foreground)",
    width: "20px",
    textAlign: "center",
    opacity: 0,
    "&:hover": {
        background: "rgba(255, 255, 255, 0.15)",
        color: "#fff",
    },
    "&::before": {
        content: `'\\2716'`, // close
        fontSize: "14px",
    },
    [`.tab-item-element:hover &, .tab-item-element.is-selected &`]: {
        opacity: 1,
    },
    ".tab-item-element.is-dirty &": {
        opacity: 1,
        "&::before": {
            content: `'\\25CF'`, // bullet
            fontSize: "16px",
        },
        "&:hover::before": {
            content: `'\\2716'`, // close
            fontSize: "14px",
        },
    },
});
