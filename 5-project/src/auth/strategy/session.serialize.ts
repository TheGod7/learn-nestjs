import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { User, UserDocument } from '../../users/schemas/users.schema';
import { UsersDTO } from 'src/users/dto/users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class userSerializer extends PassportSerializer {
  constructor(
    private readonly userService: UsersService,
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
  ) {
    super();
  }

  serializeUser(user: User, done: (err: string, payload: string) => void) {
    done(null, user.email);
  }

  deserializeUser(
    email: string,
    done: (err: string, payload: UsersDTO) => void,
  ) {
    this.user
      .findOne({ email: email })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err, null));
  }
}
