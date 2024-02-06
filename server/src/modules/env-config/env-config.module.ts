import { validationSchema } from '@modules/validationSchema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env', validationSchema }),
    ],
    exports: [ConfigModule],
})
export class EnvConfigModule { }
