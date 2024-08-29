import React from 'react';
import './FormFiller.css';
import { FilePenLine } from 'lucide-react';
interface FormFillerProps {
    selectedDevice: any;
}

const FormFiller: React.FC<FormFillerProps> = ({ selectedDevice }) => {
    const fillForm = () => {
        if (!selectedDevice) return;

        console.log("Sending message to background script with device data:", selectedDevice);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].id) {
                chrome.runtime.sendMessage({
                    action: "fillForm",
                    deviceData: selectedDevice
                }, (response) => {
                    console.log("Response from background script:", response);
                });
            }
        });
    };

    return (
        <button onClick={fillForm} className="fill-form-button">
            <FilePenLine size={18} />   Fill the Form!
        </button>
    );
};

export default FormFiller;