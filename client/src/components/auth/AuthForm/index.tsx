import { FC, useState } from 'react';
import { DocumentNode } from 'graphql';
import { View, Text, Image } from 'react-native';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, ControlledInput, Spinner } from '@/components/common';
import { AuthType, FieldErrorsState, UserDto, useAuth } from '@/hooks';
import { convertCamelToSpacedPascal } from '@/utils';
import { userSchema } from './validation';

export type AuthFormProps = {
  title: string;
  subTitle?: string;
  authType: AuthType;
  authMutation: DocumentNode;
};

export const AuthForm: FC<AuthFormProps> = ({ title, subTitle, authType, authMutation }) => {
  const [fieldsError, setFieldsError] = useState<FieldErrorsState<UserDto>>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { loading, authHandler } = useAuth(setFieldsError, authMutation);
  const { control, handleSubmit } = useForm<UserDto>({
    mode: 'onSubmit',
    resolver: joiResolver(userSchema(authType)),
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <View className="flex-1 justify-center items-center bg-gray-900">
          <Image
            source={require('@/assets/images/weather-icon.png')}
            className="w-[80px] h-[80px] mb-8"
          />
          <Text
            className={`text-2xl mb-${subTitle !== undefined ? '2' : '8'} text-white font-bold`}
          >
            {title}
          </Text>
          {subTitle && <Text className="text-xs mb-8 font-light text-gray-400">{subTitle}</Text>}
          <View className="w-64">
            <ControlledInput
              control={control}
              name="email"
              placeholder="Email"
              icon="mail"
              error={fieldsError.email}
            />
            <ControlledInput
              control={control}
              name="password"
              placeholder="Password"
              icon="lock"
              error={fieldsError.password}
              isSecured
            />
            {authType === AuthType.SIGN_UP && (
              <ControlledInput
                control={control}
                name="confirmPassword"
                placeholder="Confirm Password"
                icon="key"
                isSecured
                error={fieldsError.confirmPassword ?? ''}
              />
            )}
            <Button
              text={convertCamelToSpacedPascal(authType)}
              onPress={handleSubmit(async (data) => await authHandler(data))}
            />
            <View className="justify-center items-center">
              {authType === AuthType.SIGN_IN ? (
                <Text className="text-gray-400 mt-8">
                  Don`t have an account?{' '}
                  <Link href="/sign-up/" className="font-bold text-blue-500">
                    {convertCamelToSpacedPascal(AuthType.SIGN_UP)}
                  </Link>
                </Text>
              ) : (
                <Text className="text-gray-400 mt-8">
                  Have an account?{' '}
                  <Link href="/sign-in/" className="font-bold text-blue-500">
                    {convertCamelToSpacedPascal(AuthType.SIGN_IN)}
                  </Link>
                </Text>
              )}
            </View>
          </View>
        </View>
      )}
    </>
  );
};
