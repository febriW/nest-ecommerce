import { DataSource, DataSourceOptions } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'

import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../../.env') })
const configService = new ConfigService()

export const AppDataSource: DataSourceOptions = {
    type: 'mysql',
    host: configService.getOrThrow('MYSQL_HOST'),
    port: configService.getOrThrow('MYSQL_PORT'),
    database: configService.getOrThrow('MYSQL_DB'),
    username: configService.getOrThrow('MYSQL_ROOT_USERNAME'),
    password: configService.getOrThrow('MYSQL_ROOT_PASSWORD'),
    synchronize: configService.getOrThrow('SYNCHRONIZE'),
    migrations: ['migrations/*.ts'],
    entities: [ '../modules/**/entities/*.entity.ts'],
    logging: 'all',
    logger: 'advanced-console'
}

const dataSource = new DataSource(AppDataSource)
export default dataSource