chrome.runtime.onInstalled.addListener(() => {
    console.log("Device Form Filler Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background script:", message);

    if (message.action === "fillForm") {
        // Use chrome.tabs.query to ensure we have the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab && activeTab.id) {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: fillFormWithData,
                    args: [message.deviceData]
                }, (result) => {
                    console.log("Script execution result:", result);
                    sendResponse({ status: "success" });
                });
            }
        });

        return true;  // Required to indicate that sendResponse will be called asynchronously
    }
});

function fillFormWithData(deviceData) {
    console.log("Executing form fill script with data:", deviceData);

    function fillInputField(selector, value) {
        const inputElement = document.getElementById(selector);
        if (inputElement) {
            inputElement.focus();
            inputElement.value = value;
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
            inputElement.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    function fillReactSelectField(selector, values, optionPrefix, isMulti = false) {
        const inputElement = document.querySelector(selector);
        if (inputElement) {
            inputElement.focus();
            inputElement.click();

            if (!Array.isArray(values)) {
                values = [values];
            }

            values.forEach((value, index) => {
                inputElement.value = value;
                inputElement.dispatchEvent(new InputEvent('input', { bubbles: true }));
                inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

                const optionSelector = `[id^='${optionPrefix}-${index}']`;

                const waitForElement = (selector) => {
                    return new Promise((resolve, reject) => {
                        const interval = setInterval(() => {
                            const element = document.querySelector(selector);
                            if (element) {
                                clearInterval(interval);
                                resolve(element);
                            }
                        }, 100);

                        setTimeout(() => {
                            clearInterval(interval);
                            reject(new Error('Element not found'));
                        }, 5000);
                    });
                };

                waitForElement(optionSelector).then((dropdownOption) => {
                    dropdownOption.click();
                    if (isMulti && index < values.length - 1) {
                        inputElement.focus();
                    }
                }).catch(console.error);
            });
        }
    }

    // Fill the form fields based on the provided data
    fillInputField('title', deviceData.model_title || '');
    fillInputField('Model Name', deviceData.model_name || '');
    fillInputField('Launch Price', deviceData.launch_price || '');
    fillInputField('Release Date', deviceData.release_date || '');

    fillReactSelectField('#react-select-3-input', deviceData.brand_name, 'react-select-3-option');
    fillReactSelectField('#react-select-5-input', deviceData.colors_available.map(color => color.label), 'react-select-5-option', true);
    fillReactSelectField('#react-select-7-input', deviceData.mobile_storage, 'react-select-7-option');
    fillReactSelectField('#react-select-9-input', deviceData.ram, 'react-select-9-option');
    fillReactSelectField('#react-select-11-input', deviceData.processor, 'react-select-11-option');
    fillReactSelectField('#react-select-13-input', deviceData.ports, 'react-select-13-option');
    fillReactSelectField('#react-select-15-input', deviceData.speaker, 'react-select-15-option');
    fillReactSelectField('#react-select-17-input', deviceData.screen_size, 'react-select-17-option');
    fillReactSelectField('#react-select-19-input', deviceData.resolution, 'react-select-19-option');
    fillReactSelectField('#react-select-21-input', deviceData.screen_type, 'react-select-21-option');
    fillReactSelectField('#react-select-23-input', deviceData.refresh_rate, 'react-select-23-option');
    fillReactSelectField('#react-select-25-input', deviceData.camera_specs, 'react-select-25-option');
    fillReactSelectField('#react-select-27-input', deviceData.sim_type, 'react-select-27-option');
    fillReactSelectField('#react-select-29-input', deviceData.body_type, 'react-select-29-option');
    fillReactSelectField('#react-select-31-input', deviceData.finger_print, 'react-select-31-option');
    fillReactSelectField('#react-select-33-input', deviceData.battery_capacity, 'react-select-33-option');
    fillReactSelectField('#react-select-35-input', deviceData.network_bands, 'react-select-35-option');
    fillReactSelectField('#react-select-37-input', deviceData.screen_protection, 'react-select-37-option');
}
