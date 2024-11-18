export interface User {
  id: string;
  email: string,
  password: string,
  lastName: string,
  firstName: string,
  phone: string,
  birthDate: string
}

export interface EditUserInput {
  email: string,
  lastName: string,
  firstName: string,
  phone: string,
  birthDate: string
}
