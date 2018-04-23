import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (err) {
      console.log(err)
      return null
    }
  }

  constructor ({mail, admin, apps}) {
    this.mail = mail
    this.admin = admin
    this.apps = apps
  }

  get isAdmin () {
    return this.admin.length
  }
}
