import { FC, JSXElementConstructor, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  components: JSXElementConstructor<PropsWithChildren>[];
};

export const Compose: FC<Props> = ({ components, children }) => {
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};
