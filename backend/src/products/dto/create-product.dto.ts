import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayNotEmpty,
  ValidateIf,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export function IsTaxRateAllowed(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isTaxRateAllowed',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          if (
            obj.defaultTax === true &&
            value !== undefined &&
            value !== null
          ) {
            return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return 'You cannot provide taxRate when defaultTax is enabled';
        },
      },
    });
  };
}
export class CreateProductDto {
  @MaxLength(155)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(155)
  @IsString()
  @IsNotEmpty()
  title_ar: string;

  @MaxLength(500)
  @IsString()
  @IsNotEmpty()
  description: string;

  @MaxLength(500)
  @IsString()
  @IsNotEmpty()
  description_ar: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isAvalible?: boolean;

  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  hasTax?: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  defaultTax?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'taxRate must be a number' })
  @Min(0, { message: 'taxRate cannot be negative' })
  @Max(100, { message: 'taxRate cannot exceed 100%' })
  @IsTaxRateAllowed()
  taxRate?: number;

  @IsArray()
  @Type(() => Number)
  @ArrayNotEmpty({ message: 'At least one category is required' })
  categories: number[];

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'price must be a valid decimal with up to 2 digits after the point',
    },
  )
  @Min(0, { message: 'price cannot be negative' })
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { message: 'quantity must be a valid number' })
  quantity: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'At least one color is required' })
  @Type(() => Number)
  colors: number[];

  @IsArray()
  @Type(() => Number)
  @IsOptional()
  sizes: number[];

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9-]+$/, {
    message: 'SKU must contain only letters, numbers, or hyphens',
  })
  sku: string;
}
