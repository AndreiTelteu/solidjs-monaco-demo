import { createSignal, Show } from "solid-js";

export default function ContextMenu(props) {
    const [state, setState] = createSignal({
        open: false,
        top: 0,
        left: 0,
    });

    if (props.ref) {
        props.ref({
            open: (newState) => {
                console.log("context open", newState);
                setState(newState);
            },
        });
    }

    return (
        <Show when={state().open}>
            <div
                class="monaco-editor"
                style={{
                    position: "absolute",
                    top: `${state().top}px`,
                    left: `${state().left}px`,
                    "z-index": 100000,
                }}
            >
                <style type="text/css" media="screen">
                    {styles}
                </style>
                <div
                    class="monaco-scrollable-element"
                    role="presentation"
                    style="
                        overflow: hidden;
                        outline: 1px solid var(--vscode-menu-border);
                        border-radius: 5px;
                        color: var(--vscode-menu-foreground);
                        background-color: var(--vscode-menu-background);
                        box-shadow: 0 2px 8px var(--vscode-widget-shadow);
                    "
                >
                    <div
                        class="monaco-menu"
                        role="presentation"
                        style="overflow: hidden; max-height: 562px"
                    >
                        <div class="monaco-action-bar animated vertical">
                            <ul
                                class="actions-container"
                                role="menu"
                                tabindex="0"
                            >
                                <li
                                    class="action-item disabled"
                                    role="presentation"
                                    title=""
                                >
                                    <a
                                        class="action-label codicon separator disabled"
                                        role="presentation"
                                        aria-disabled="true"
                                        aria-label=""
                                        style="border-bottom-color: var(--vscode-menu-separatorBackground)"
                                    ></a>
                                </li>
                                <li class="action-item" role="presentation">
                                    <a
                                        class="action-menu-item"
                                        role="menuitem"
                                        tabindex="0"
                                        aria-checked=""
                                        aria-posinset="2"
                                        aria-setsize="5"
                                        style="color: var(--vscode-menu-foreground)"
                                    >
                                        <span
                                            class="menu-item-check codicon codicon-menu-selection"
                                            role="none"
                                            style="color: var(--vscode-menu-foreground)"
                                        ></span>
                                        <span
                                            class="action-label"
                                            aria-label="Cut"
                                        >
                                            Cut
                                        </span>
                                    </a>
                                </li>
                                <li class="action-item" role="presentation">
                                    <a
                                        class="action-menu-item"
                                        role="menuitem"
                                        tabindex="0"
                                        aria-checked=""
                                        aria-posinset="3"
                                        aria-setsize="5"
                                        style="color: var(--vscode-menu-foreground)"
                                    >
                                        <span
                                            class="menu-item-check codicon codicon-menu-selection"
                                            role="none"
                                            style="color: var(--vscode-menu-foreground)"
                                        ></span>
                                        <span
                                            class="action-label"
                                            aria-label="Copy"
                                        >
                                            Copy
                                        </span>
                                    </a>
                                </li>
                                <li class="action-item" role="presentation">
                                    <a
                                        class="action-menu-item"
                                        role="menuitem"
                                        tabindex="0"
                                        aria-checked=""
                                        aria-posinset="4"
                                        aria-setsize="5"
                                        style="color: var(--vscode-menu-foreground)"
                                    >
                                        <span
                                            class="menu-item-check codicon codicon-menu-selection"
                                            role="none"
                                            style="color: var(--vscode-menu-foreground)"
                                        ></span>
                                        <span
                                            class="action-label"
                                            aria-label="Paste"
                                        >
                                            Paste
                                        </span>
                                    </a>
                                </li>
                                <li
                                    class="action-item disabled"
                                    role="presentation"
                                    title=""
                                >
                                    <a
                                        class="action-label codicon separator disabled"
                                        role="presentation"
                                        aria-disabled="true"
                                        aria-label=""
                                        style="border-bottom-color: var(--vscode-menu-separatorBackground)"
                                    ></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        role="presentation"
                        aria-hidden="true"
                        class="invisible scrollbar horizontal"
                        style="
                            position: absolute;
                            width: 284px;
                            height: 0px;
                            left: 0px;
                            bottom: 0px;
                        "
                    >
                        <div
                            class="slider"
                            style="
                                position: absolute;
                                top: 0px;
                                left: 0px;
                                height: 10px;
                                transform: translate3d(0px, 0px, 0px);
                                contain: strict;
                                width: 284px;
                            "
                        ></div>
                    </div>
                    <div
                        role="presentation"
                        aria-hidden="true"
                        class="invisible scrollbar vertical"
                        style="position: absolute; width: 7px; height: 160px; right: 0px; top: 0px"
                    >
                        <div
                            class="slider"
                            style="
                                position: absolute;
                                top: 0px;
                                left: 0px;
                                width: 7px;
                                transform: translate3d(0px, 0px, 0px);
                                contain: strict;
                                height: 160px;
                            "
                        ></div>
                    </div>
                    <div class="shadow"></div>
                    <div class="shadow"></div>
                    <div class="shadow"></div>
                </div>
            </div>
        </Show>
    );
}

const styles = `
.monaco-menu {
    font-size: 13px;
    border-radius: 5px;
    min-width: 160px;
}
.codicon-menu-selection:before { content: '\eab2'; }
.codicon-menu-submenu:before { content: '\eab6'; }
.monaco-menu .monaco-action-bar {
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
}
.monaco-menu .monaco-action-bar .actions-container {
    display: flex;
    margin: 0 auto;
    padding: 0;
    width: 100%;
    justify-content: flex-end;
}
.monaco-menu .monaco-action-bar.vertical .actions-container {
    display: inline-block;
}
.monaco-menu .monaco-action-bar.reverse .actions-container {
    flex-direction: row-reverse;
}
.monaco-menu .monaco-action-bar .action-item {
    cursor: pointer;
    display: inline-block;
    transition: transform 50ms ease;
    position: relative;  /* DO NOT REMOVE - this is the key to preventing the ghosting icon bug in Chrome 42 */
}
.monaco-menu .monaco-action-bar .action-item.disabled {
    cursor: default;
}
.monaco-menu .monaco-action-bar.animated .action-item.active {
    transform: scale(1.272019649, 1.272019649); /* 1.272019649 = √φ */
}
.monaco-menu .monaco-action-bar .action-item .icon,
.monaco-menu .monaco-action-bar .action-item .codicon {
    display: inline-block;
}
.monaco-menu .monaco-action-bar .action-item .codicon {
    display: flex;
    align-items: center;
}
.monaco-menu .monaco-action-bar .action-label {
    font-size: 11px;
    margin-right: 4px;
}
.monaco-menu .monaco-action-bar .action-item.disabled .action-label,
.monaco-menu .monaco-action-bar .action-item.disabled .action-label:hover {
    color: var(--vscode-disabledForeground);
}

/* Vertical actions */
.monaco-menu .monaco-action-bar.vertical {
    text-align: left;
}
.monaco-menu .monaco-action-bar.vertical .action-item {
    display: block;
}
.monaco-menu .monaco-action-bar.vertical .action-label.separator {
    display: block;
    border-bottom: 1px solid var(--vscode-menu-separatorBackground);
    padding-top: 1px;
    padding: 30px;
}
.monaco-menu .secondary-actions .monaco-action-bar .action-label {
    margin-left: 6px;
}

/* Action Items */
.monaco-menu .monaco-action-bar .action-item.select-container {
    overflow: hidden; /* somehow the dropdown overflows its container, we prevent it here to not push */
    flex: 1;
    max-width: 170px;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}
.monaco-menu .monaco-action-bar.vertical {
    margin-left: 0;
    overflow: visible;
}
.monaco-menu .monaco-action-bar.vertical .actions-container {
    display: block;
}
.monaco-menu .monaco-action-bar.vertical .action-item {
    padding: 0;
    transform: none;
    display: flex;
}
.monaco-menu .monaco-action-bar.vertical .action-item.active {
    transform: none;
}
.monaco-menu .monaco-action-bar.vertical .action-menu-item {
    flex: 1 1 auto;
    display: flex;
    height: 2em;
    align-items: center;
    position: relative;
    margin: 0 4px;
    border-radius: 4px;
}
.monaco-menu .monaco-action-bar.vertical .action-menu-item:hover .keybinding,
.monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .keybinding {
    opacity: unset;
}
.monaco-menu .monaco-action-bar.vertical .action-label {
    flex: 1 1 auto;
    text-decoration: none;
    padding: 0 1em;
    background: none;
    font-size: 12px;
    line-height: 1;
}
.monaco-menu .monaco-action-bar.vertical .keybinding,
.monaco-menu .monaco-action-bar.vertical .submenu-indicator {
    display: inline-block;
    flex: 2 1 auto;
    padding: 0 1em;
    text-align: right;
    font-size: 12px;
    line-height: 1;
}
.monaco-menu .monaco-action-bar.vertical .submenu-indicator {
    height: 100%;
}

.monaco-menu .monaco-action-bar.vertical .submenu-indicator.codicon {
    font-size: 16px !important;
    display: flex;
    align-items: center;
}
.monaco-menu .monaco-action-bar.vertical .submenu-indicator.codicon::before {
    margin-left: auto;
    margin-right: -20px;
}
.monaco-menu .monaco-action-bar.vertical .action-item.disabled .keybinding,
.monaco-menu .monaco-action-bar.vertical .action-item.disabled .submenu-indicator {
    opacity: 0.4;
}
.monaco-menu .monaco-action-bar.vertical .action-label:not(.separator) {
    display: inline-block;
    box-sizing: border-box;
    margin: 0;
}
.monaco-menu .monaco-action-bar.vertical .action-item {
    position: static;
    overflow: visible;
}
.monaco-menu .monaco-action-bar.vertical .action-item .monaco-submenu {
    position: absolute;
}
.monaco-menu .monaco-action-bar.vertical .action-label.separator {
    width: 100%;
    height: 0px !important;
    opacity: 1;
}
.monaco-menu .monaco-action-bar.vertical .action-label.separator.text {
    padding: 0.7em 1em 0.1em 1em;
    font-weight: bold;
    opacity: 1;
}
.monaco-menu .monaco-action-bar.vertical .action-label:hover {
    color: inherit;
}
.monaco-menu .monaco-action-bar.vertical .menu-item-check {
    position: absolute;
    visibility: hidden;
    width: 1em;
    height: 100%;
}
.monaco-menu .monaco-action-bar.vertical .action-menu-item.checked .menu-item-check {
    visibility: visible;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* Context Menu */
.context-view.monaco-menu-container {
    outline: 0;
    border: none;
    animation: fadeIn 0.083s linear;
    -webkit-app-region: no-drag;
}
.context-view.monaco-menu-container :focus,
.context-view.monaco-menu-container .monaco-action-bar.vertical:focus,
.context-view.monaco-menu-container .monaco-action-bar.vertical :focus {
    outline: 0;
}
.hc-black .context-view.monaco-menu-container,
.hc-light .context-view.monaco-menu-container,
:host-context(.hc-black) .context-view.monaco-menu-container,
:host-context(.hc-light) .context-view.monaco-menu-container {
    box-shadow: none;
}
.hc-black .monaco-menu .monaco-action-bar.vertical .action-item.focused,
.hc-light .monaco-menu .monaco-action-bar.vertical .action-item.focused,
:host-context(.hc-black) .monaco-menu .monaco-action-bar.vertical .action-item.focused,
:host-context(.hc-light) .monaco-menu .monaco-action-bar.vertical .action-item.focused {
    background: none;
}

/* Vertical Action Bar Styles */
.monaco-menu .monaco-action-bar.vertical {
    padding: 4px 0;
}
.monaco-menu .monaco-action-bar.vertical .action-menu-item {
    height: 2em;
}
.monaco-menu .monaco-action-bar.vertical .action-label:not(.separator),
.monaco-menu .monaco-action-bar.vertical .keybinding {
    font-size: inherit;
    padding: 0 2em;
}
.monaco-menu .monaco-action-bar.vertical .menu-item-check {
    font-size: inherit;
    width: 2em;
}
.monaco-menu .monaco-action-bar.vertical .action-label.separator {
    font-size: inherit;
    margin: 5px 0 !important;
    padding: 0;
    border-radius: 0;
}
.linux .monaco-menu .monaco-action-bar.vertical .action-label.separator,
:host-context(.linux) .monaco-menu .monaco-action-bar.vertical .action-label.separator {
    margin-left: 0;
    margin-right: 0;
}
.monaco-menu .monaco-action-bar.vertical .submenu-indicator {
    font-size: 60%;
    padding: 0 1.8em;
}
.linux .monaco-menu .monaco-action-bar.vertical .submenu-indicator {
:host-context(.linux) .monaco-menu .monaco-action-bar.vertical .submenu-indicator {
    height: 100%;
    mask-size: 10px 10px;
    -webkit-mask-size: 10px 10px;
}
.monaco-menu .action-item {
    cursor: default;
}
/* Arrows */
.monaco-scrollable-element > .scrollbar > .scra {
    cursor: pointer;
    font-size: 11px !important;
}

.monaco-scrollable-element > .visible {
    opacity: 1;

    /* Background rule added for IE9 - to allow clicks on dom node */
    background:rgba(0,0,0,0);

    transition: opacity 100ms linear;
}
.monaco-scrollable-element > .invisible {
    opacity: 0;
    pointer-events: none;
}
.monaco-scrollable-element > .invisible.fade {
    transition: opacity 800ms linear;
}

/* Scrollable Content Inset Shadow */
.monaco-scrollable-element > .shadow {
    position: absolute;
    display: none;
}
.monaco-scrollable-element > .shadow.top {
    display: block;
    top: 0;
    left: 3px;
    height: 3px;
    width: 100%;
}
.monaco-scrollable-element > .shadow.left {
    display: block;
    top: 3px;
    left: 0;
    height: 100%;
    width: 3px;
}
.monaco-scrollable-element > .shadow.top-left-corner {
    display: block;
    top: 0;
    left: 0;
    height: 3px;
    width: 3px;
}
.monaco-scrollable-element > .shadow.top {
    box-shadow: var(--vscode-scrollbar-shadow) 0 6px 6px -6px inset;
}
.monaco-scrollable-element > .shadow.left {
    box-shadow: var(--vscode-scrollbar-shadow) 6px 0 6px -6px inset;
}
.monaco-scrollable-element > .shadow.top.left {
    box-shadow: var(--vscode-scrollbar-shadow) 6px 6px 6px -6px inset;
}
.monaco-scrollable-element > .scrollbar > .slider {
    background: var(--vscode-scrollbarSlider-background);
}
.monaco-scrollable-element > .scrollbar > .slider:hover {
    background: var(--vscode-scrollbarSlider-hoverBackground);
}
.monaco-scrollable-element > .scrollbar > .slider.active {
    background: var(--vscode-scrollbarSlider-activeBackground);
}
`;
