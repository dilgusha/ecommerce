import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities";
import { UserKey } from "src/entities/User.entity";
import { Repository } from "typeorm";

export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) { }


    find(where?: Partial<User>) {
        return this.userRepository.find({ where })
    }

    findOne(where: Partial<User>, select?: UserKey[]) {
        return this.userRepository.findOne({ where, select })
    }
}