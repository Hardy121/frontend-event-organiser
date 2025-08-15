"use client"
import { LeftPanel } from "@/components/layout/LeftPanel";
import { MainContent } from "@/components/page/create-event/event-layout/MainContent";
import { formatDateForInput } from "@/utils/formateDate";
import { formatTimeFromMs } from "@/utils/formateTime";
import { useState } from "react";


const hours = 60 * 60 * 1000;
const startTime = Date.now() + (hours * 2);
const endTime = Date.now() + (hours * 4);
const days = Date.now() + (hours * 48);

export default function CreateEventPage({ children }) {
    const [currentView, setCurrentView] = useState('build');
    const [eventInputs, setEventInputs] = useState({
        title: '',
        summary: ''
    });

    const [dateTimeInputs, setdateTimeInputs] = useState({
        date: formatDateForInput(days)||'',
        startTime: formatTimeFromMs(startTime) || '',
        endTime: formatTimeFromMs(endTime) || ''
    })


    return (
        <div className="flex">
            <div className="lg:h-svh lg:sticky fixed lg:left-0 lg:w-auto w-full top-14 z-40 lg:top-0 bg-white ">
                <LeftPanel eventTitle={eventInputs?.title} setCurrentView={setCurrentView} currentView={currentView} />
            </div>

            <div className="lg:h-svh lg:overflow-y-scroll w-full ">
                {currentView == "build" ?
                    <div className="flex  bg-gray-50">
                        <MainContent
                            setEventInputs={setEventInputs}
                            eventInputs={eventInputs}
                            setdateTimeInputs={setdateTimeInputs}
                            dateTimeInputs={dateTimeInputs} />
                    </div>
                    : null}
            </div>
        </div>
    )
}

