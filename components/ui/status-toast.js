'use client';
import { useEffect } from 'react';

export default function StatusToast({ message, icon, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const Icon = icon;

    return (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 shadow-lg text-white transition-all bg-gray-800 border border-gray-700 duration-300`}>
            <Icon className="w-5 h-5" />
            <span>{message}</span>
        </div>
    );
}
