import React, { useState, useRef, useEffect } from 'react';
import './DeviceSelector.css';

interface DeviceSelectorProps {
    devices: string[];
    selectedDeviceIndex: number | null;
    onSelectDevice: (index: number) => void;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ devices, selectedDeviceIndex, onSelectDevice }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (index: number) => {
        onSelectDevice(index);
        setIsOpen(false);
    };

    const visibleDevices = devices; // Limit to 5 visible items

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedDeviceIndex !== null ? devices[selectedDeviceIndex] : 'Select Device...'}
                <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {visibleDevices.map((device, index) => (
                        <li key={index} onClick={() => handleSelect(index)}>
                            {device}
                        </li>
                    ))}
                    {devices.length > 5 && (
                        <li onClick={() => setIsOpen(false)}>
                            ... {devices.length - 5} more items
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default DeviceSelector;