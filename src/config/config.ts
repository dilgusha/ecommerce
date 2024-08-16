import * as dotenv from 'dotenv'
import * as  path from 'path'

dotenv.config({
    path: path.join(__dirname, '../../.env')
});
export default {
    port: process.env.PORT,
    database: {
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        dbPort: process.env.DATABASE_PORT
    },
    jwtSecret: process.env.JWT_SECRET,
}