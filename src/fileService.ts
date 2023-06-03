const fileCache = {
    "index.php": `<?php
include('contact.php');
`,
    "contact.php": `<?php

if (!isset($_POST['from'])
|| !isset($_POST['subject'])
|| !isset($_POST['message'])) {
    return 'Error invalid data';
}
`,
    "Tabs.tsx": `import {createSignal} from "solid-js"
    `,
};

export default class fileService {
    static open(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // fetch file content = fake content for demo
            if (fileCache.hasOwnProperty(path)) {
                return resolve(fileCache[path]);
            }
            reject({ error: "File not found" });
        });
    }
    static save(path: string, content: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (fileCache.hasOwnProperty(path)) {
                fileCache[path] = content;
                return resolve(true);
            }
            reject({ error: "File not found" });
        });
    }
}
