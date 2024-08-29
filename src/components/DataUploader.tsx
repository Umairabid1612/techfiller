import React, { useState } from 'react';
import './DataUploader.css';
import { Upload } from 'lucide-react';
interface Device {
    model_title: string;
    model_name: string;
    launch_price: string;
    release_date: string;
    [key: string]: any;
}

interface DataUploaderProps {
    onDataUpload: (data: Device[]) => void;
}

const DataUploader: React.FC<DataUploaderProps> = ({ onDataUpload }) => {
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result as string);
                    onDataUpload(data);
                    setError(null);
                } catch (err) {
                    setError('Invalid JSON file.');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="data-uploader">
            <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="file-input"
                id="file-upload"
            />
            <label htmlFor="file-upload" className="upload-button">
                <Upload size={18} />   Upload Data
            </label>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default DataUploader;