# 🚀 Device Form Filler Extension

**Device Form Filler Extension** is a Chrome extension that streamlines the process of filling out forms by automatically populating fields based on device data. This tool is perfect for users who regularly fill out forms with similar data and want to save time.

## ✨ Features

- **Upload Device Data**: Upload a JSON file with device information.
- **Select Device**: Choose from a list of devices to auto-fill forms.
- **Instant Form Filling**: Automatically fills out form fields based on the selected device.
- **Sleek UI**: A beautiful, responsive user interface that enhances your workflow.

## 🛠️ Requirements

To use this extension, you need to have the following installed:

- **Node.js** (v12 or higher)
- **npm** (Node Package Manager)

Make sure these are installed on your machine. If not, you can download them from [Node.js official website](https://nodejs.org/).

## 📦 Installation

Follow these steps to set up the extension:

1. **Clone the repository** (or download the source code):

   ```
   git clone https://github.com/yourusername/device-form-filler-extension.git
   cd device-form-filler-extension
   ```

2. **Install dependencies**:

   ```
   npm install
   ```

3. **Build the extension**:

   ```
   npm run build
   ```

## 🚀 Load Extension in Chrome

1. **Open Chrome** and navigate to \`chrome://extensions/\`.
2. **Enable Developer Mode** by toggling the switch at the top right.
3. **Click on "Load unpacked"**.
4. **Select the \`dist\` folder** inside your project directory. This will load the extension into Chrome.

## 🎮 Usage

1. **Open the extension** by clicking on the extension icon in the Chrome toolbar.
2. **Upload Device Data**: Click the "Upload Data" button and upload your JSON file containing the device information.
3. **Select a Device** from the dropdown menu.
4. **Click "Fill the Form!"** and watch as the form fields are automatically populated with your selected device's data.

## 📝 JSON File Format

The JSON file should contain an array of devices, where each device has the following structure:

```
[
  {
    "model_title": "Device 1",
    "model_name": "Model 1",
    "launch_price": "1000",
    "release_date": "2023-01-01",
    "brand_name": "Brand 1",
    "colors_available": [
      { "label": "Red" },
      { "label": "Blue" }
    ]
  },
  ...
]
```

## ⚙️ Development

If you want to modify the extension:

1. **Make your changes** in the source files.
2. **Rebuild the project**:

   ```
   npm run build
   ```

3. **Reload the extension** in Chrome to see your changes.

## 🤝 Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy a faster, more efficient way to fill out your forms with the **Device Form Filler Extension**! 🚀
