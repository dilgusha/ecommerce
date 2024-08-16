import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    findOne(id: number) {
        return this.userRepo.findOne({ where: { id } });
    }
}