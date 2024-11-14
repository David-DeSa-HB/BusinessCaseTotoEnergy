export interface RegisterInput {
  email: string,
  password: string,
  lastName: string,
  firstName: string
}

export namespace RegisterInput{
  export function formBirthDate(birthDate: string): string{
    const dateSplit = birthDate.split('/');
    return  `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
  }
}
