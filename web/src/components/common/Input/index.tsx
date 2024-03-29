'use client';

import { useState, forwardRef } from 'react';
import { IconDefinition, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error: string;
  icon: IconDefinition;
  isDark?: boolean;
  isSecured?: boolean;
  iconStyles?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, label, error, isSecured, icon, className, iconStyles, ...props }, ref) => {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(Boolean(isSecured));

    const toggleShowPassword = (): void => {
      setIsPasswordShown((prevIsPasswordShown) => !prevIsPasswordShown);
    };

    const iconClassWithLabel = `absolute left-3 text-gray-500 ${iconStyles}`;
    const iconClassWithoutLabel = `absolute left-3 text-gray-500 ${iconStyles}`;

    return (
      <div className="relative w-full">
        {label && (
          <label className="block text-left mb-2 text-xs  font-bold text-blue-900 md:text-lg">
            {label}
          </label>
        )}
        <FontAwesomeIcon
          className={label ? iconClassWithLabel : iconClassWithoutLabel}
          icon={icon}
        />
        <input
          ref={ref}
          type={isPasswordShown ? 'password' : 'text'}
          placeholder={placeholder}
          className={`text-sm w-full bg-slate-200 pl-8 pr-4 placeholder-gray-500 py-2 rounded-md outline-none ${className}`}
          {...props}
        />
        {isSecured && (
          <button
            type="button"
            className="absolute top-7 right-3 md:top-12"
            onClick={toggleShowPassword}
          >
            <FontAwesomeIcon
              className="text-gray-500 text-sm sm:text-md md:text-xl"
              icon={isPasswordShown ? faEye : faEyeSlash}
            />
          </button>
        )}
        <div className="text-xs text-left text-red-500 mt-2 mb-4 h-2">{error}</div>
      </div>
    );
  },
);
Input.displayName = 'Input';
