import { For } from "solid-js";
import { styled } from "solid-styled-components";
import { produce, SetStoreFunction } from "solid-js/store";

export type TabItem = {
    name: string;
    path: string;
    selected: boolean;
    fixed: boolean;
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
                            {item.name}
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
