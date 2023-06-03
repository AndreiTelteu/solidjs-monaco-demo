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
    return (
        <div class="monaco-editor">
            <TabBar>
                <For each={props.state}>
                    {(item) => (
                        <TabItemElement
                            class={`tab-item-element ${
                                item.selected ? "is-selected" : ""
                            }`}
                            selected={item.selected}
                            onClick={(e) => {
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
                                onClick={() => {
                                    props.setState(
                                        produce((v: TabItem[]) => {
                                            let index = v.findIndex(
                                                (i) => i.path == item.path
                                            );
                                            if (index !== -1) {
                                                v.splice(index, 1);
                                            }
                                        })
                                    );
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

export const TabItemElement = styled("button")(
    (props: { selected?: boolean }) => ({
        appearance: "none",
        display: "inline-block",
        fontSize: "14px",
        background: "rgb(45, 45, 45)",
        color: "var(--vscode-foreground)",
        padding: "4px 8px",
        border: "none",
        ...(props.selected
            ? {
                  background: "var(--vscode-editor-background)",
                  color: "#fff",
              }
            : {}),
    })
);

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
    opacity: 0,
    "&::before": {
        content: `' \\2716'`,
        fontSize: "14px",
    },
    "&:hover": {
        background: "rgba(255, 255, 255, 0.15)",
        color: "#fff",
    },
    [`.tab-item-element:hover &, .tab-item-element.is-selected &`]: {
        opacity: 1,
    },
});
