import { parseHtml } from 'html-parser-lite'

// this function is adapted from https://github.com/jsnelders/chrome-bookmarks-converter/blob/233d344c998a33828fd3a7ce0a46c670041eb506/chrome-bookmarks-converter.js
function createFolder(dlRootChildren, parent) {
    let h3 = {}

    let currentFolder = {
        type: 'folder',
        title: '',
        add_date: '',
        last_modified: '',
        items: []
    }

    let link = {}

    let h3Ready = false // When set to true, the last elements was a H3, so expecting the next to be a DL

    dlRootChildren.forEach(el => {
        if(h3Ready === true && el.tagName !== 'dl') {
            // Expecting a folder next but not found. Cancel the ready, and raise a warning.
            h3Ready = false
            console.error('H3 Ready. Expecting a DL but not found. Next element is (' + el.tagName + '): ', el)

            // Push the last heading, and continue normally.
            currentFolder.items.push(h3)
        }

        if(el.tagName == 'dl') {
            currentFolder = {
                type: 'folder',
                title: h3.title,
                add_date: h3.add_date,
                last_modified: h3.last_modified,
                items: []
            }

            if(h3Ready === true) {
                h3Ready = false
            }

            parent.items.push(currentFolder)

            createFolder(el.children(), currentFolder)
        }

        if(el.tagName === 'h3') {
            h3 = {
                title: el.textContent,
                add_date: el.getAttribute('add_date'),
                last_modified: el.getAttribute('last_modified')
            }

            h3Ready = true

            // If next child element is a DL, then it contains the the links in the 'folder'
        }

        if(el.tagName === 'a') {
            link = {
                type: 'link',
                title: el.textContent ?? '',
                href: el.getAttribute('href'),
                add_date: el.getAttribute('add_date'),
                icon: el.getAttribute('icon')
            }

            parent.items.push(link)
        }
    })
}

export default function parseBookmarksString(bookmarksString) {
    bookmarksString = bookmarksString.replace(/<DT>/g, '') // remove <DT> tag as our parser can't handle partial tags (tags with no end tag) that are deeply nested
    bookmarksString = bookmarksString.replace(/<p>/g, '') // remove <p> tag as our parser can't handle partial tags (tags with no end tag) that are deeply nested

    const parsedHTMLTree = parseHtml(bookmarksString)

    const bookmarks = {
        type: 'folder',
        items: []
    }

    createFolder(parsedHTMLTree[4].children(), bookmarks)

    return bookmarks
}
