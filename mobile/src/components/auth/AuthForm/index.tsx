import { joiResolver } from '@hookform/resolvers/joi';
import { Link } from 'expo-router';
import { DocumentNode } from 'graphql';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';

import { BackgroundSpinner, Button, ControlledInput } from '@/components/common';
import { AuthType, useAuth, UserDto } from '@/hooks';
import { convertCamelToSpacedPascal } from '@/shared';

import { userSchema } from './validation';

export type AuthFormProps = {
  title: string;
  subTitle?: string;
  authType: AuthType;
  authMutation: DocumentNode;
};

export const AuthForm: FC<AuthFormProps> = ({ title, subTitle, authType, authMutation }) => {
  const { loading, authHandler, fieldsError } = useAuth(authMutation);
  const { control, handleSubmit } = useForm<UserDto>({
    mode: 'onSubmit',
    resolver: joiResolver(userSchema(authType)),
  });

  const onSubmit = async (data: UserDto): Promise<void> => await authHandler(data);

  return (
    <>
      {loading ? (
        <BackgroundSpinner />
      ) : (
        <View className="flex-1 justify-center items-center bg-gray-900">
          <Image
            source={require('@/assets/images/weather-icon.png')}
            className="w-[80px] h-[80px] mb-8"
          />
          <Text className="text-2xl mb-2 text-white font-bold">{title}</Text>
          {subTitle && <Text className="text-xs mb-2 font-light text-gray-400">{subTitle}</Text>}
          <View className="h-8">
            {fieldsError.unexpectedError && (
              <Text className="text-red-500 text-[12px]">
                {fieldsError.unexpectedError} Try again later!
              </Text>
            )}
          </View>
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
            <Button text={convertCamelToSpacedPascal(authType)} onPress={handleSubmit(onSubmit)} />
            <View className="justify-center items-center">
              <Text className="text-gray-400 mt-8">
                {authType === AuthType.SIGN_IN ? 'Don`t have an account? ' : 'Have an account? '}
                <Link
                  href={authType === AuthType.SIGN_IN ? '/sign-up/' : '/sign-in/'}
                  className="font-bold text-blue-500"
                >
                  {convertCamelToSpacedPascal(
                    authType === AuthType.SIGN_IN ? AuthType.SIGN_UP : AuthType.SIGN_IN,
                  )}
                </Link>
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
