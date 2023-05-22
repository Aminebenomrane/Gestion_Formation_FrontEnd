import { Role } from "./role";

export interface RegisterRequest {
    firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
  age: number;
  grade: string;
}
