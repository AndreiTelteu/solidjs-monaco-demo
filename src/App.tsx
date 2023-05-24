import type { Component } from 'solid-js';
import { createStore } from 'solid-js/store';

// @ts-ignore
import MyCustomMonaco from './Monaco'
// @ts-ignore
import FileTree from './FileTree'

const value = `<?php
phpinfo();
`

const App: Component = () => {
  const defaultFileAttrs = { open: false, selected: false };
  const [state, setState] = createStore([
    {type: 'dir', name: 'src', path: 'src/', ...defaultFileAttrs},
    {type: 'dir', name: 'docs', path: 'src/docs/', ...defaultFileAttrs},
    {type: 'file', name: 'index.md', path: 'src/docs/index.md', ...defaultFileAttrs},
    {type: 'file', name: 'main.js', path: 'src/main.js', ...defaultFileAttrs},
    {type: 'file', name: 'index.php', path: 'index.php', ...defaultFileAttrs},
    {type: 'file', name: 'index.js', path: 'index.js', ...defaultFileAttrs},
    {type: 'file', name: 'contact.php', path: 'contact.php', ...defaultFileAttrs},
    {type: 'file', name: 'package.json', path: 'package.json', ...defaultFileAttrs},
  ]);
  
  return (
    <div style={{height:'100vh', display:'flex', "flex-direction":'row', "align-content":'stretch'}}>
      <div style={{width: '200px', display:'flex', "flex-direction":'column', "align-content":'stretch'}}>
        <FileTree state={state} setState={setState} />
      </div>
      <div style={{'flex-grow': 1}}>
        <MyCustomMonaco
          options={{
            value,
            theme:'vs-dark',
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
