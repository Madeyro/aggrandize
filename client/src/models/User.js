import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (err) {
      return null
    }
  }

  constructor ({ mail, admin}) {
    this.mail = mail
    this.admin = admin
  }

  get isAdmin () {
    return this.admin
  }
}
