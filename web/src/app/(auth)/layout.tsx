import { FC, PropsWithChildren } from 'react';

import { AuthLayout } from '@/layouts';

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <AuthLayout>{children}</AuthLayout>
    );
};

export default PublicLayout;