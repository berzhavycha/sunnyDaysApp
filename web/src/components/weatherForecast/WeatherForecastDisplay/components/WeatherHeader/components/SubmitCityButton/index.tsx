import { Button } from "@/components/common";
import { ADD_SUBSCRIPTION_BTN_CONTENT } from "@/components/weatherForecast/constants";
import { FC } from "react";
import { useFormStatus } from "react-dom";
import { MoonLoader } from "react-spinners";


export const SubmitCityButton: FC = () => {
    const { pending } = useFormStatus()

    const content = pending ? <MoonLoader color="#bae6fd" size={18} /> : ADD_SUBSCRIPTION_BTN_CONTENT

    return (
        <Button
            type="submit"
            content={content}
            className={`${pending && 'flex justify-center items-center min-w-16'} text-center text-xs sm:text-base sm:py-2 sm:px-4`}
        />
    )
}