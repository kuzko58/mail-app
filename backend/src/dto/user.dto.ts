export interface UserJsonDTO {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserQueryDTO {
  id: string;
}
