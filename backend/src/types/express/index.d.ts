// src/types/express/index.d.ts
import type { ICookieUser, IUser } from '../user.types'; // or wherever your user type lives

declare global {
  namespace Express {
    interface Locals {
      user: ICookieUser;
    }
  }
}
