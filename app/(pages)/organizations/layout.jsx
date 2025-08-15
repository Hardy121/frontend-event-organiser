import { Sidebar } from '@/components/layout/Sidebar';
import React from 'react';

export default function OrganisationPage({children}) {
    return (
        <div className="flex">
            <div className="h-svh bg-gray-800 sticky left-0 top-0 ">
                <Sidebar />
            </div>
            <div className="w-full ">
                {children}
            </div>
        </div>
    );
}
