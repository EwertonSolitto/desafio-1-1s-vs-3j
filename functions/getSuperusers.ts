import type { UserModel } from "../UserModel"

export default function getSuperusers(users: UserModel[]) {
  return {superusers: users.filter((user) => {
    if (user.score >= 900 && user.ativo === true) {
      return user
    }
  })}
}