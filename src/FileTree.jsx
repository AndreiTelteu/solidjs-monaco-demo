import { For, mergeProps } from "solid-js";
import {createStore} from 'solid-js/store';

export default function FileTree(props) {
  props = mergeProps({ tree: [] }, props);
  return <List tree={props.tree} />
}

function List(props) {
  props = mergeProps({ tree: [] }, props);
  const [openState, setOpenState] = createStore({});
  return <For each={props.tree}>
    {(item) => (
      <>
        <div onClick={() => {
          if (item.type == 'dir') {
            setOpenState(item.name, (v) => !v);
          }
        }}>
          <div>{item.name}</div>
        </div>
        <Show when={openState?.[item.name]}>
          <div style={{padding: '0 16px'}}>
            <List tree={item.children} />
          </div>
        </Show>
      </>
    )}
  </For>
}
