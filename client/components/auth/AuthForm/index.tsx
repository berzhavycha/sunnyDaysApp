import { Dispatch, SetStateAction, FC } from "react";
import { View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { Button } from "../Button";
import { Input } from "../Input";
import { AuthFormProps } from "./authForm.interface";

export const AuthForm: FC<AuthFormProps> = ({
  title,
  subTitle,
  fields,
  handleAuth,
  actionButtonText,
}) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    fieldsError,
  } = fields;

  return (
    <View className="flex-1 justify-center items-center bg-gray-900">
      <Image
        source={require("@/assets/images/weather-icon.png")}
        className="w-[80px] h-[80px] mb-8"
      />
      <Text
        className={`text-2xl mb-${subTitle ? "2" : "6"} text-white font-bold`}
      >
        {title}
      </Text>
      {subTitle && (
        <Text className="text-xs mb-8 font-light text-gray-400">
          {subTitle}
        </Text>
      )}
      <Input
        value={email}
        onChange={setEmail}
        placeholder="Email"
        icon="mail"
        error={fieldsError.email}
      />
      <Input
        value={password}
        onChange={setPassword}
        placeholder="Password"
        icon="lock"
        error={fieldsError.password}
        isSecured
      />
      {confirmPassword !== undefined && (
        <Input
          value={confirmPassword as string}
          onChange={setConfirmPassword as Dispatch<SetStateAction<string>>}
          placeholder="Confirm Password"
          icon="key"
          error={fieldsError.confirmPassword as string}
          isSecured
        />
      )}
      <Button text={actionButtonText} onPress={handleAuth} />
      <View>
        {actionButtonText === "Login" ? (
          <Text className="text-gray-400 mt-8">
            Don`t have an account?{" "}
            <Link href="/sign-up/" className="font-bold text-blue-500">
              Sign Up
            </Link>
          </Text>
        ) : (
          <Text className="text-gray-400 mt-8">
            Have an account?{" "}
            <Link href="/login/" className="font-bold text-blue-500">
              Login
            </Link>
          </Text>
        )}
      </View>
    </View>
  );
};
