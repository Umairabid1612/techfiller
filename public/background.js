chrome.runtime.onInstalled.addListener(() => {
    console.log("Device Form Filler Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background script:", message);

    if (message.action === "fillForm") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab && activeTab.id) {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: () => window.location.href, // Get the current URL dynamically
                }, (result) => {
                    const currentUrl = result[0].result; // Get the URL from the script execution
                    console.log("Current URL:", currentUrl);

                    // Execute form filling logic, passing the current URL
                    chrome.scripting.executeScript({
                        target: { tabId: activeTab.id },
                        func: fillFormWithData, // Use the existing form fill logic
                        args: [message.deviceData, currentUrl] // Pass the dynamic URL
                    }, (result) => {
                        console.log("Form filling result:", result);
                        sendResponse({ status: "success" });
                    });
                });
            }
        });

        return true; // Required to keep the message channel open for asynchronous sendResponse
    }
});


function fillFormWithData(deviceData, currentUrl) {
    console.log("Executing form fill script with data:", deviceData, "on URL:", currentUrl);

    function waitForElement(selector) {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(interval);
                    resolve(element);
                }
            }, 100); // Check every 100ms

            setTimeout(() => {
                clearInterval(interval);
                reject(new Error(`Element with selector "${selector}" not found`));
            }, 5000); // Timeout after 5 seconds
        });
    }

    function fillInputField(selector, value) {
        waitForElement(`#${selector}`).then(inputElement => {
            inputElement.focus();
            inputElement.value = value;
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
            inputElement.dispatchEvent(new Event('change', { bubbles: true }));
        }).catch(console.error);
    }

    function fillReactSelectField(selector, values, optionPrefix, isMulti = false) {
        waitForElement(selector).then(inputElement => {
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

                waitForElement(optionSelector).then((dropdownOption) => {
                    dropdownOption.click();  // Select the option
                    if (isMulti && index < values.length - 1) {
                        inputElement.focus();  // Re-focus for multi-select
                    }
                }).catch(console.error);
            });
        }).catch(console.error);
    }
    function fillSelectField(selector, value) {
        if (value === 1) {
            const selectElement = document.querySelector(selector);
            if (selectElement) {
                selectElement.focus();
                selectElement.click();  // Simulate a click to open the dropdown

                setTimeout(() => {
                    selectElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
                }, 100);  // Adjust the delay if needed
            }
        }
    }


    // Detect which form is being used (Mobile, Laptop, or Tablet) based on the URL or form identifier.
    if (currentUrl.includes('/mobiles/add')) {
        // Fill the Mobile Form
        console.log("Filling the Mobile form");
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
        // Add the rest of the mobile fields...

    } else if (currentUrl.includes('/laptops/add')) {
        // Fill the Laptop Form
        console.log("Filling the Laptop form");
        fillInputField('title', deviceData.model_title || '');
        fillInputField('Model Name', deviceData.model_name || '');
        fillInputField('Launch Price', deviceData.launch_price || '');
        fillInputField('Release Date', deviceData.release_date || '');
        fillReactSelectField('#react-select-3-input', deviceData.brand_name, 'react-select-3-option');
        fillReactSelectField('#react-select-5-input', deviceData.colors_available.map(color => color.label), 'react-select-5-option', true);
        fillReactSelectField('#react-select-11-input', deviceData.storage_ssd, 'react-select-11-option');
        fillReactSelectField('#react-select-13-input', deviceData.ram, 'react-select-13-option');
        fillReactSelectField('#react-select-15-input', deviceData.ram_type, 'react-select-15-option');
        fillReactSelectField('#react-select-17-input', deviceData.processor, 'react-select-17-option');
        fillReactSelectField('#react-select-19-input', deviceData.generation, 'react-select-19-option');
        fillReactSelectField('#react-select-21-input', deviceData.graphic_card_type, 'react-select-21-option');
        fillReactSelectField('#react-select-23-input', deviceData.graphic_card_name, 'react-select-23-option');
        fillReactSelectField('#react-select-25-input', deviceData.graphic_card_memory, 'react-select-25-option');
        fillReactSelectField('#react-select-27-input', deviceData.laptop_type, 'react-select-27-option');
        const portsArray = deviceData.ports.split(","); // Split the ports by comma
        fillReactSelectField('#react-select-29-input', portsArray, 'react-select-29-option', true);
        fillReactSelectField('#react-select-31-input', deviceData.speaker, 'react-select-31-option');
        fillReactSelectField('#react-select-33-input', deviceData.resolution, 'react-select-33-option');
        fillReactSelectField('#react-select-35-input', deviceData.refresh_rate, 'react-select-35-option');
        fillReactSelectField('#react-select-37-input', deviceData.screen_size, 'react-select-37-option');
        fillReactSelectField('#react-select-39-input', deviceData.screen_type, 'react-select-39-option');
        fillReactSelectField('#react-select-41-input', deviceData.camera_specs, 'react-select-41-option');
        fillReactSelectField('#react-select-43-input', deviceData.keyboard, 'react-select-43-option');
        fillReactSelectField('#react-select-45-input', deviceData.battery, 'react-select-45-option');
        fillReactSelectField('#react-select-47-input', deviceData.finger_print, 'react-select-47-option');
        fillSelectField('#react-select-49-input', deviceData.backlit)
        fillSelectField('#react-select-51-input', deviceData.touch_screen)

    } else if (currentUrl.includes('/tablets/add')) {
        // Fill the Tablet Form
        console.log("Filling the Tablet form");
        fillInputField('title', deviceData.model_title || '');
        fillInputField('Model Name', deviceData.model_name || '');
        fillInputField('Launch Price', deviceData.launch_price || '');
        fillInputField('Release Date', deviceData.release_date || '');
        fillReactSelectField('#react-select-53-input', deviceData.brand_name, 'react-select-53-option');
        fillReactSelectField('#react-select-55-input', deviceData.colors_available.map(color => color.label), 'react-select-5-option', true)
        fillReactSelectField('#react-select-57-input', deviceData.mobile_storage, 'react-select-57-option');
        fillReactSelectField('#react-select-59-input', deviceData.ram, 'react-select-59-option');
        fillReactSelectField('#react-select-61-input', deviceData.processor, 'react-select-61-option');
        fillReactSelectField('#react-select-63-input', deviceData.ports, 'react-select-63-option');
        fillReactSelectField('#react-select-65-input', deviceData.speaker, 'react-select-65-option');
        fillReactSelectField('#react-select-67-input', deviceData.screen_size, 'react-select-67-option');
        fillReactSelectField('#react-select-69-input', deviceData.resolution, 'react-select-69-option');
        fillReactSelectField('#react-select-71-input', deviceData.screen_type, 'react-select-71-option');
        fillReactSelectField('#react-select-73-input', deviceData.refresh_rate, 'react-select-73-option');
        fillReactSelectField('#react-select-75-input', deviceData.camera_specs, 'react-select-75-option');
        fillReactSelectField('#react-select-77-input', deviceData.body_type, 'react-select-77-option');
        fillReactSelectField('#react-select-79-input', deviceData.finger_print, 'react-select-79-option');
        fillReactSelectField('#react-select-81-input', deviceData.battery_capacity, 'react-select-81-option');
        fillReactSelectField('#react-select-83-input', deviceData.network_bands, 'react-select-83-option');
        fillReactSelectField('#react-select-85-input', deviceData.screen_protection, 'react-select-85-option');
        // Add the rest of the tablet fields...

    } else {
        console.error("Unknown form detected.");
    }
}
