import Model from './Model'

export default class User extends Model {

  get allUsers()
  {
    return `${this.rows[0].value}`
  }

}