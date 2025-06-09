export type AuthFormData = {
  email: string;
  password: string;
};

export interface AuthFormProps {
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
}
