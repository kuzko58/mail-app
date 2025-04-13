import { UserQueryDTO } from '../dto/user.dto';
import UsersModel from '../models/users.model';

class UsersService {
  private UsersModel: typeof UsersModel;
  constructor() {
    this.UsersModel = UsersModel;
  }

  public getUser = async (data: UserQueryDTO) => {
    const user = await this.UsersModel.findById(data.id);

    return user?.toJSON();
  };

  public getAllUsers = async () => {
    const users = await this.UsersModel.find().lean();

    return users;
  };
}

const usersService = new UsersService();

export default usersService;
