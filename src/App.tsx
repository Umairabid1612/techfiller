import React, { useState } from 'react';
import DataUploader from './components/DataUploader';
import DeviceSelector from './components/DeviceSelector';
import FormFiller from './components/FormFiller';
import './App.css';

interface Device {
  model_title: string;
  model_name: string;
  [key: string]: any;
}

const App: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState<number | null>(null);

  const handleDataUpload = (data: Device[]) => {
    setDevices(data);
  };

  const handleSelectDevice = (index: number) => {
    setSelectedDeviceIndex(index);
  };

  return (
    <div className="app">
      <h1 className="title">Form Filler</h1>
      <p className="subtitle">Streamline your form filling process</p>
      {devices.length === 0 ? (
        <DataUploader onDataUpload={handleDataUpload} />
      ) : (
        <>
          <DeviceSelector
            devices={devices.map(device => device.model_title)}
            selectedDeviceIndex={selectedDeviceIndex}
            onSelectDevice={handleSelectDevice}
          />
          {selectedDeviceIndex !== null && (
            <FormFiller selectedDevice={devices[selectedDeviceIndex]} />
          )}
        </>
      )}
    </div>
  );
};

export default App;