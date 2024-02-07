import { configValidationSchema } from './validation';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env', validationSchema: configValidationSchema }),
    ],
    exports: [ConfigModule],
})
export class CustomConfigModule { }
