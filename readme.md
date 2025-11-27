### About

This is a simple Chrome Extension that displays the exact time an Instagram was posted, rather than a date or some time ago.

[Available on the Chrome Web Store](https://chrome.google.com/webstore/detail/exact-time-viewer-for-ins/koffnfmgjmoopfgelgbbkjmdnppadlae).

### How it works

The content script watches the page for Instagram `<time>` elements that expose a `datetime` attribute and replaces the relative “5h/2d” label with a formatted local timestamp (including seconds and your time zone). It also keeps the formatted value in the element `title` for easy hover previews and accessibility.

### Usage

No build step is required anymore. Load the repository directory as an unpacked extension:

1. Visit `chrome://extensions`
2. Enable Developer Mode
3. Choose “Load unpacked” and select the project directory containing `manifest.json`

Chrome will pick up `content/content.js` directly, and the icons are referenced from `content/icons`.
