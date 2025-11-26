# Google Account Router

_[日本語版はこちら / Japanese version](README.md)_

A browser extension that automatically switches to a specified Google account when accessing Google services (Gmail, YouTube, etc.) based on predefined rules.

## 🌟 Features

- **Automatic Account Switching**: Automatically switches to specified accounts when accessing Google services like Gmail, YouTube, etc.
- **Intuitive GUI Settings**: Easy-to-use React-based settings page for managing rules
- **Supported Services**:
  - Gmail
  - Google Calendar
  - Google Drive
  - YouTube
  - Google Keep
  - Google Gemini
  - Google Docs
  - Google Meet
  - Google NotebookLM
- **Service-Specific Processing**: Optimized redirect handling for each service
- **Enable/Disable Rules**: Temporarily disable rules as needed
- **Lightweight**: Simple and fast operation

## 📋 Environment

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

## 🚀 Installation

### Development Version (Build Required)

1. Clone repository

```bash
git clone https://github.com/yourusername/g-account-router-ext.git
cd g-account-router-ext
```

2. Install dependencies

```bash
npm install
```

3. Build

```bash
# For Chrome/Edge
npm run build:chrome

# For Firefox
npm run build:firefox
```

4. Load extension in your browser

**For Chrome/Edge:**

- Navigate to `chrome://extensions/` or `edge://extensions/`
- Enable "Developer mode"
- Click "Load unpacked"
- Select the `dist` folder

**For Firefox:**

- Navigate to `about:debugging#/runtime/this-firefox`
- Click "Load Temporary Add-on"
- Select `manifest.json` in the `dist` folder

## 📖 Usage

### 1. Open Settings Page

- Right-click the extension icon in the browser toolbar
- Select "Options" or "Extension options"

### 2. Add Rules

1. Click "Add New Rule" button
2. Enter the following information:
   - **Service**: Select the Google service to apply automatic switching (Gmail, Calendar, Drive, YouTube, etc.)
   - **Account Email Address**: Email address of the Google account to switch to (e.g., `user@example.com`)
   - **Label (Optional)**: Description of the rule (e.g., "Work Gmail")
3. Click "Save"

### 3. Manage Rules

- **Edit**: Click "Edit" button to modify content
- **Delete**: Click "Delete" button to remove rule
- **Enable/Disable**: Toggle rule application with "Enable"/"Disable" button

### 4. Experience Automatic Switching

When you access the configured Google service, it will automatically switch to the specified account.

## 💡 Usage Examples

### Example 1: Always open work Gmail with specified account

- **Service**: `Gmail`
- **Account Email Address**: `work@company.com`
- **Label**: `Work Gmail`

### Example 2: Open YouTube with personal account

- **Service**: `YouTube`
- **Account Email Address**: `personal@gmail.com`
- **Label**: `Personal YouTube`

### Example 3: Use Google Drive with multiple accounts

- **Service**: `Google Drive`
- **Account Email Address**: `work@company.com`
- **Label**: `Work Drive`

## ❗ Limitations

- You must be logged in to Google accounts beforehand
- If you're not logged in with the specified email address account, redirect may not work correctly
- May not work with some special Google services
- If an account is already specified in the URL (via `authuser` parameter or `/u/{number}/` path), the extension will skip processing to avoid conflicts

## 🐛 Troubleshooting

### Rules not being applied

1. Check that the rule is "Enabled" in the settings page
2. Verify that the service is correctly selected
3. Confirm that the account email address is correct (use the email address of a logged-in account)
4. Try restarting the browser

### Settings not being saved

1. Check that browser storage permissions are granted
2. Settings may not be saved in browser private mode

## 📝 Development

### Development Environment Setup

```bash
# Clone repository
git clone https://github.com/yourusername/g-account-router-ext.git
cd g-account-router-ext

# Install dependencies
npm install

# Development mode build (watch file changes)
npm run watch

# Production build
npm run build

# Chrome/Edge build
npm run build:chrome

# Firefox build
npm run build:firefox

# Create extension package
npm run package:chrome  # For Chrome/Edge
npm run package:firefox # For Firefox
```

### Tech Stack

- **TypeScript**: Type-safe development
- **React**: GUI construction
- **Webpack**: Bundling and build
- **WebExtension Polyfill**: Cross-browser compatibility
- **browser.storage.sync**: Rule synchronization storage
- **browser.webNavigation**: Navigation event monitoring
- **Service-Specific Processing**: Optimized URL handling for each Google service

### Directory Structure

```
g-account-router-ext/
├── dist/                   # Build output
├── public/
│   ├── manifest.chrome.json  # Chrome manifest
│   ├── manifest.firefox.json # Firefox manifest
│   ├── options.html          # Settings page HTML
│   └── icons/                # Icon images
├── src/
│   ├── background.ts         # Service Worker (rule application)
│   ├── options.tsx           # Settings page (React)
│   ├── logic/
│   │   ├── services.ts       # Supported services definition
│   │   ├── router-rules.ts   # Rule matching logic
│   │   └── storage.ts        # Storage operations
│   └── components/
│       └── RuleEditor.tsx    # Rule editing component
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## 📄 License

ISC License

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [WebExtension Polyfill](https://github.com/mozilla/webextension-polyfill) - Cross-browser compatibility

---
