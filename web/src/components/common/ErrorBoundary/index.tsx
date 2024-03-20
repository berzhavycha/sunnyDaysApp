import { FC } from "react";

import { ErrorBoundaryProps } from "@/app/error";

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({ error, reset }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center gap-3">
            <div className="relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded pr-12" role="alert">
                <strong className="font-bold">Something went wrong!</strong>
                <span className="block sm:inline"> {error.message}</span>
                <button
                    className="absolute top-0 right-0 px-4 py-3"
                    onClick={() => reset()}
                >
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <button className="px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => reset()}>
                Try Again
            </button>
        </div>
    );
}