import { NestFactory } from "@nestjs/core"
import { AppModule } from "src/app.module"
import { UserRoles } from "src/common/enum/user-roles.enum";
import { runUserSeed } from "src/database/seeds/default-user.seed";
import { User } from "src/entities/User.entity";
import { DataSource } from "typeorm";

export async function runSeed() {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource)
    await runUserSeed(dataSource)
    process.exit(1)
}
runSeed()