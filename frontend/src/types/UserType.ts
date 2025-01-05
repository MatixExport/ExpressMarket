

export enum UserRole {
    CLIENT = "client",
    EMPLOYEE = "employee",
  }

export interface User {
    id: number,
    login: string,
    email: string,
    phone: string,
    role: UserRole,
    createdAt: string,
    updatedAt: string
}

