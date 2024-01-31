import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export function ValidateProperty(
  variable: string,
  isString: boolean,
  isNumber?: boolean,
  isPositive?: boolean,
): PropertyDecorator {
  return function (target: any, propertyKey: string) {
    const decorators: PropertyDecorator[] = [
      IsNotEmpty({ message: `${variable} is required` }),
    ];

    if (isString) {
      decorators.push(IsString({ message: `${variable} must be a string` }));
    }

    if (isNumber) {
      decorators.push(IsInt({ message: `${variable} must be a number` }));
    }

    if (isPositive) {
      decorators.push(
        IsPositive({ message: `${variable} must be a positive integer` }),
      );
    }

    decorators.forEach((decorator) => decorator(target, propertyKey));
  };
}
