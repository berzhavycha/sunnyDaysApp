import { FC, JSXElementConstructor, PropsWithChildren } from "react"

interface Props {
    components: Array<JSXElementConstructor<PropsWithChildren>>
    children: React.ReactNode
}

export const Compose: FC<Props> = ({ components, children }) => {
    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>
            }, children)}
        </>
    )
}