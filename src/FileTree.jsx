import { For, mergeProps, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { css } from 'solid-styled-components';

export default function FileTree(props) {
  return <div style={{
    background:'rgb(32, 35, 39)',
    'flex-grow': 1,
    color: '#cccccc',
  }}>
    <List
      depth={0}
      state={props.state}
      setState={props.setState}
      setStateGlobal={props.setState}
    />
  </div>
}

function List(props) {
  props = mergeProps({ depth: 0 }, props);
  return <For each={props.state}>
    {(item) => (
      <>
        <div onClick={() => {
          if (item.type == 'dir') {
            props.setState((i) => i.path == item.path, 'open', v => !v);
          }
          props.setStateGlobal({}, 'selected', false)
          props.setStateGlobal({}, 'children', {}, 'selected', false)
          props.setState((i) => i.path == item.path, 'selected', true)
        }}
        class={css`
          padding: 2px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          &.is-selected {
            background: rgba(55, 100, 190, 0.49);
          }
          &:hover {
            background: #37373d;
          }
        ` + (item.selected ? ' is-selected':'')}>
          <div style={{ width: `${props.depth*12}px`, 'flex-shrink': 0 }} />
          <div>{item.name} {item.selected?1:0}</div>
        </div>
        <Show when={item.open}>
          <List
            depth={props.depth + 1}
            state={item.children}
            setState={(...attrs) => {
              props.setState((i) => i.path == item.path, 'children', ...attrs)
            }}
            setStateGlobal={props.setState}
          />
        </Show>
      </>
    )}
  </For>
}
