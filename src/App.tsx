import type { Component } from 'solid-js';

// @ts-ignore
// import MonacoEditor from 'solidjs-monaco-editor-component'

import MyCustomMonaco from './Monaco'
import FileTree from './FileTree.jsx'

const value = `<?php
phpinfo();
`

const App: Component = () => {
  return (
    <div style={{height:'100vh', display:'flex', "flex-direction":'row', "align-content":'stretch'}}>
      <div style={{width: '200px'}}>
        <FileTree tree={[
          {type: 'dir', name: 'src', children: [
            {type: 'dir', name: 'docs', children: [
              {type: 'file', name: 'index.md'},
            ]},
            {type: 'file', name: 'main.js'},
          ]},
          {type: 'file', name: 'index.php'},
          {type: 'file', name: 'index.js'},
          {type: 'file', name: 'contact.php'},
          {type: 'file', name: 'package.json'},
        ]} />
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
