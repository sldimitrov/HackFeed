import { ADMIN_ROLE, USER_ROLE } from '../contants/users.ts';

export type AuthFormData = {
  email: string;
  password: string;
};

export interface AuthFormProps {
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
}

export type UserRoles = typeof ADMIN_ROLE | typeof USER_ROLE;
