import { Calendar } from 'lucide-react';

export const LeftSide = () => {
    return (
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-cover bg-center" style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.85), rgba(29, 78, 216, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23grad1)' d='M0,0 L1200,0 L1200,600 Q900,650 600,600 Q300,550 0,600 Z'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%23ffffff' opacity='0.1'/%3E%3Ccircle cx='800' cy='200' r='60' fill='%23ffffff' opacity='0.08'/%3E%3Ccircle cx='1000' cy='400' r='100' fill='%23ffffff' opacity='0.06'/%3E%3Ccircle cx='400' cy='500' r='40' fill='%23ffffff' opacity='0.1'/%3E%3Cpath d='M100,300 Q400,250 700,300 T1200,350 L1200,800 L0,800 Z' fill='%23ffffff' opacity='0.03'/%3E%3C/svg%3E")`
        }}>
            {/* Simple background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-white/25 rounded-full animate-pulse delay-2000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                {/* Logo */}
                <div className="mb-12">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                        <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">EventHub</h1>
                    <p className="text-blue-100 text-xl leading-relaxed">
                        Create, manage, and host extraordinary events with ease.
                    </p>
                </div>

                {/* Simple feature list */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-lg">Professional event management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-lg">Seamless ticket booking</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-lg">Real-time analytics</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
