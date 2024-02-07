import { Input, InputProps } from '@/components/common';
import { UseControllerProps, Controller, FieldValues } from 'react-hook-form'


export function ControlledInput<FormType extends FieldValues>({
    control,
    name,
    rules,
    ...inputProps
}: UseControllerProps<FormType> & InputProps): JSX.Element {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={(({ field, fieldState }) => (
                <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    {...inputProps}
                    error={fieldState.error?.message || inputProps.error || ''}
                />
            )
            )}
        />
    );
}