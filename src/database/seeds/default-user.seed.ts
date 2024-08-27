import { NestFactory } from "@nestjs/core"
import { AppModule } from "src/app.module"
import { UserRoles } from "src/common/enum/user-roles.enum";
import { User } from "src/entities/User.entity";
import { DataSource } from "typeorm";

export async function runUserSeed(dataSource:DataSource) {
    
    let userRepo = dataSource.getRepository(User)

    let defaultUser = await userRepo.create({
        email: 'admin@example.com',
        password: 'Passw0rd!',
        firstName: 'User',
        lastName: '',
        roles: [UserRoles.ADMIN],
    })
    await defaultUser.save()
}