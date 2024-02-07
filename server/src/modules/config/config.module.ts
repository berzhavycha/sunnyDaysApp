import { configValidationSchema } from './validation';
import { Module } from '@nestjs/common';
import { ConfigModule as OriginalConfigModule } from '@nestjs/config';


@Module({
    imports: [
        OriginalConfigModule.forRoot({ isGlobal: true, envFilePath: './.env', validationSchema: configValidationSchema }),
    ],
    exports: [ConfigModule],
})
export class ConfigModule { }
