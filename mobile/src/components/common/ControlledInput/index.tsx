import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { Input, InputProps } from '@/components/common/Input';

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
      render={({ field, fieldState }) => (
        <Input
          value={field.value}
          onChangeText={field.onChange}
          {...inputProps}
          error={fieldState.error?.message ?? inputProps.error ?? ''}
        />
      )}
    />
  );
}
