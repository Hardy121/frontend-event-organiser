"use client"
import React, { useState } from 'react'
import { MainContent } from './event-layout/MainContent';

const Create = () => {
    const [currentView, setCurrentView] = useState('main');

    return (
        <div className="flex  bg-gray-50">
            <MainContent currentView={currentView} />
        </div>
    );
};


export default Create   