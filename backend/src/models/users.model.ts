import { Schema, model, type Query } from 'mongoose';
import bcrypt from 'bcrypt';

const usersSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

usersSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

usersSchema.pre('findOneAndUpdate', function (next) {
  const query = this as Query<any, any> & { _update: any };

  if (!query._update.password) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  query._update.password = bcrypt.hashSync(query._update.password, salt);
  next();
});

usersSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['password'];
    delete ret['secret'];
    delete ret['__v'];
    return ret;
  },
});

const UsersModel = model('User', usersSchema);

export default UsersModel;
