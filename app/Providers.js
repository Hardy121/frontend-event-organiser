import Header from "@/components/layout/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

    return (
        <GoogleOAuthProvider clientId={clientId}>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Header />
            {children}
        </GoogleOAuthProvider>
    )
}