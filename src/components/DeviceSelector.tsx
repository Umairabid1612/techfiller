import React, { useState, useRef, useEffect } from 'react';
import './DeviceSelector.css';
import Fuse from 'fuse.js';

interface DeviceSelectorProps {
    devices: string[];
    selectedDeviceIndex: number | null;
    onSelectDevice: (index: number) => void;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ devices, selectedDeviceIndex, onSelectDevice }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fuse = new Fuse(devices.map(device => ({ title: device })), {
        keys: ['title'], // Use only the title as the key
        threshold: 0.3,  // Adjust this for more or less fuzzy results
    });

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
        setSearchTerm(''); // Clear search after selection
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredDevices = searchTerm ? fuse.search(searchTerm).map(result => result.item.title) : devices;

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedDeviceIndex !== null ? devices[selectedDeviceIndex] : 'Select Device...'}
                <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search device..."
                        className="dropdown-search"
                    />
                    <ul>
                        {filteredDevices.map((device, index) => (
                            <li key={index} onClick={() => handleSelect(devices.indexOf(device))}>
                                {device}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DeviceSelector;
