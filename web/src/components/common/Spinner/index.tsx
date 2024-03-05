import { Spinner as NextSpinner } from "@chakra-ui/spinner";

export const Spinner = (): JSX.Element => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-900 flex justify-center items-center z-100">
            <NextSpinner size="lg" className="w-24 h-24 text-blue-500" />
        </div>
    );
};