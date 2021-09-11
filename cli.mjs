#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import parseBookmarksString from './bookmarks-parser.mjs'

let bookmarksHtmlFile = ''

if(process.argv.length > 2) {
    bookmarksHtmlFile = process.argv[2]
} else {
    console.error('Please provide a bookmarks html file as the argument')
    process.exit()
}

const bookmarksString = fs.readFileSync(bookmarksHtmlFile, 'utf-8')
const bookmarks = parseBookmarksString(bookmarksString)

const outputPath = path.resolve(`./${path.parse(bookmarksHtmlFile).name}.json`)
fs.writeFileSync(outputPath, JSON.stringify(bookmarks, null, '\t'))

console.log('JSON file saved to: ' + outputPath)
