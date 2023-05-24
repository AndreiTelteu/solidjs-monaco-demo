import { For, mergeProps, createEffect, createMemo } from 'solid-js';
import { createStore } from 'solid-js/store';
import { css } from 'solid-styled-components';

export default function FileTree(props) {
  const treeRecursive = (c) => {
    const delete_items = []
    c.forEach((item, index) => {
      let children = []
      if (item.type == 'dir') {
        c.forEach((fitem, findex) => {
          if (fitem.path != item.path && (fitem.path.indexOf(item.path) === 0 || fitem.path.indexOf(item.path+'/') === 0)) {
            children.push(fitem)
            delete_items.push(fitem.path)
          }
        })
      }
      c[index] = {...c[index], children: treeRecursive([...children])}
    })
    delete_items.forEach(i => {
      let index = c.findIndex(item => item.path == i)
      if (index !== null) c.splice(index, 1)
    })
    return c;
  }
  const tree = createMemo(() => treeRecursive([...props.state]))

  return <div style={{
    background:'rgb(32, 35, 39)',
    'flex-grow': 1,
    color: '#cccccc',
  }}>
    <List
      depth={0}
      state={tree()}
      setState={props.setState}
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
          props.setState({}, 'selected', false)
          props.setState((i) => i.path == item.path, 'selected', true)
        }}
        class={css`
          padding: 2px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          &:hover {
            background: #37373d;
          }
          &.is-selected {
            background: rgba(55, 100, 190, 0.49);
          }
        ` + (item.selected ? ' is-selected':'')}>
          <div style={{ width: `${props.depth*12}px`, 'flex-shrink': 0 }} />
          <div>{item.name}</div>
        </div>
        <Show when={item.open}>
          <List
            depth={props.depth + 1}
            state={item.children}
            setState={props.setState}
          />
        </Show>
      </>
    )}
  </For>
}
