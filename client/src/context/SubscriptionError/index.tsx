import {
    FC,
    createContext,
    PropsWithChildren,
    useState,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react';

interface SubscriptionErrorState {
    message: string
}

interface SubscriptionErrorContextType {
    error: SubscriptionErrorState;
    setError: Dispatch<SetStateAction<SubscriptionErrorState>>
}

const SubscriptionErrorContext = createContext<SubscriptionErrorContextType | null>(null);

export const useSubscriptionError = (): SubscriptionErrorContextType => {
    const subscriptionErrorContext = useContext(SubscriptionErrorContext);

    if (!subscriptionErrorContext) {
        throw new Error('useSubscriptionError must be used within an SubscriptionErrorProvider');
    }

    return subscriptionErrorContext;
};

export const SubscriptionErrorProvider: FC<PropsWithChildren> = ({ children }) => {
    const [error, setError] = useState<SubscriptionErrorState>({
        message: ''
    })

    const contextValue: SubscriptionErrorContextType = {
        error,
        setError
    };

    return <SubscriptionErrorContext.Provider value={contextValue}>{children}</SubscriptionErrorContext.Provider>;
};
