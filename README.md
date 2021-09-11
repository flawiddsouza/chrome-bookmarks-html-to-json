## Usage

### As a command
```bash
npx github:flawiddsouza/chrome-bookmarks-html-to-json path/to/your/chrome-bookmarks-export.html
```

This will create a chrome-bookmarks-export.json file in the current directory.

Example:
If your html file is bookmarks_9_10_21.html, then your json file will be bookmarks_9_10_21.json

### As a npm package
```bash
npm install github:flawiddsouza/chrome-bookmarks-html-to-json
```

In your code:
```js
import parseBookmarksString from 'chrome-bookmarks-html-to-json'
import { readFileSync } from 'fs'

const bookmarksString = readFileSync('path/to/your/chrome-bookmarks-export.html', 'utf-8')
const bookmarks = parseBookmarksString(bookmarksString)
console.dir(bookmarks, { depth: null })
```
