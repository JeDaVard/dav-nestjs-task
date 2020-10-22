import { TypeOrmModule } from '@nestjs/typeorm'
import * as config from 'config'

const { type, port, database, username, password, host, synchronize } = config.get('db')

export const typeOrmConfig: TypeOrmModule = {
    type,
    host: process.env.RDS_HOST || host,
    port: process.env.RDS_PORT || port,
    username: process.env.RDS_USERNAME || username,
    password: process.env.RDS_PASSWORD || password,
    database: process.env.RDS_DATABASE || database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize,
}
