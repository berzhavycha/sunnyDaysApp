import { FC, useRef } from "react";

import { useDeleteWeatherSubscription, useOutsideClick } from "@/hooks";
import { ModalBackground } from "@/components";

type Props = {
    city: string;
    onClose: () => void
}

export const DeletionModal: FC<Props> = ({ city, onClose }) => {
    const { deleteSubscription } = useDeleteWeatherSubscription();

    const onDelete = async (): Promise<void> => {
        onClose()
        await deleteSubscription(city)
    }

    const deletionModalRef = useRef<HTMLDivElement>(null)
    useOutsideClick(deletionModalRef, onClose);

    return (
        <>
            <ModalBackground
                isVisible={true}
                onClose={onClose}
                zIndex={20}
            />
            <div ref={deletionModalRef} className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-8 pb-5 rounded-md shadow-lg z-30">
                <h3 className="mb-6 text-xl">Are you sure you want to delete {city}?</h3>
                <div className="w-full flex gap-4 justify-end">
                    <button onClick={onDelete} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">OK</button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:text-gray-100 transition-all">Cancel</button>
                </div>
            </div>
        </>
    )
}
