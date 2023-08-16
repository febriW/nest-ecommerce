import { Module } from "@nestjs/common"
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService : ConfigService) => ({
                type: 'mysql',
                host: configService.getOrThrow('MYSQL_HOST'),
                port: configService.getOrThrow('MYSQL_PORT'),
                database: configService.getOrThrow('MYSQL_DB'),
                username: configService.getOrThrow('MYSQL_ROOT_USERNAME'),
                password: configService.getOrThrow('MYSQL_ROOT_PASSWORD'),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow('SYNCHRONIZE')
            }),
            inject: [ConfigService]
        }),
    ],
})

export class DatabaseModule {}