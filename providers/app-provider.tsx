import { Toast } from "@/components/toast/Toast";
import React from "react";
import ReactQueryProvider from "./react-query-provider";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Toast />
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
        </>
    );
}