import { FC } from "react"

type Props = {
    content: string | number | JSX.Element;
    onClick: () => Promise<void>;
    isActive?: boolean;
    isDisabled?: boolean;
}

export const Button: FC<Props> = ({ content, onClick, isActive, isDisabled }) => {
    const onPress = async (): Promise<void> => await onClick();

    const className = `bg-blue-${isDisabled ? 400 : 600} px-4 text-white py-2 rounded-xl border-2 ${isActive ? 'border-white' : 'border-blue-600'} hover:bg-blue-400`

    return (
        <button className={className} onClick={onPress}>{content}</button>
    )
}