import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('profile')
@ApiBearerAuth()
@ApiTags('Profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService
    ) { }
    @Get()
    @UseGuards(AuthGuard)
    myProfile(@Req() req:any) {
        return this.profileService.findOne(req.userId)
    }
}