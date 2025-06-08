export interface AuthFormProps {
    isRegister: boolean;
    setIsRegister: (value: boolean) => void;
}

export type AuthFormData = {
    email: string;
    password: string;
};