import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { UsersDTO } from './dto/users.dto';
import { Request, Response } from 'express';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async register(body: UsersDTO, req: Request, res: Response): Promise<void> {
    const user = await this.userModel.findOne({ email: body.email });

    if (user) {
      req.flash('error', 'This email is already in use!');
      return res.redirect(303, '/auth/register');
    }

    const NewUser = await this.userModel.create({
      email: body.email,
      password: body.password,
      username: body.username,
    });

    NewUser.password = await NewUser.encryptPassword(body.password);

    await NewUser.save();

    req.flash('done', 'You can login now!');
    return res.redirect(303, '/auth/login');
  }
}
