import bcrypt from 'bcrypt';
import UsersModel from '../models/users.model';
import { generateRandomString } from '../utils/util';
import { HttpError } from '../utils/error/http-error';
import { NewUserDTO, UserLoginDTO, UserQueryDTO } from '../dto/user.dto';

class AuthService {
  private UsersModel = UsersModel;

  constructor() {}

  public userRegistration = async (data: NewUserDTO) => {
    const userData = {
      ...data,
      secret: generateRandomString(32),
    };

    const user = new this.UsersModel(data);

    const newUser = await user.save();

    return newUser;
  };

  public userLogin = async (data: UserLoginDTO) => {
    const user = await this.UsersModel.findOne({ email: data.email });

    if (!user) {
      throw new HttpError('user not found!', 404);
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new HttpError('Passwords do not match', 403);
    }

    return user;
  };

  public getMe = async (data: UserQueryDTO) => {
    const user = await this.UsersModel.findById(data.id);

    return user?.toJSON();
  };
}

const authService = new AuthService();

export default authService;
