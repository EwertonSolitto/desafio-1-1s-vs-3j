import type { UserModel } from "../UserModel";

export function checkUserType(object: any): object is UserModel[] {
  return object
}