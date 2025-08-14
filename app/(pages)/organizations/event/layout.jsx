import { LeftPanel } from "@/components/page/create-event/event-layout/LeftPanel";

export default function CreateEventPage({ children }) {
    return (
        <div className="flex">
            <div className="lg:h-svh lg:sticky fixed lg:left-0 lg:w-auto w-full top-14 z-40 lg:top-0 bg-white ">
                <LeftPanel />
            </div>

            {/* Page Content (pushed to the right) */}
            <div className="lg:h-svh lg:overflow-y-scroll w-full ">
                {children}
            </div>
        </div>
    )
}
