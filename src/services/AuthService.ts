import axios, { AxiosResponse } from 'axios'
import { AsyncStorage } from 'react-native';

export default class AuthService {
  // Initializing important variables
  constructor() {
    this.login = this.login.bind(this)
  }

  public login(username: string, pass: string): Promise<string>{
    return new Promise((resolve, rejected) =>
      axios.post("https://readtome.herokuapp.com/api/login", { user: { username: username, password: pass } })
      .then( (response: AxiosResponse) => {
        this.setToken(response.data.data.token)
        return resolve(response.data.data.token)
      })
      .catch( error => {
        return rejected(error)
      })
    )
  }

  public me(): Promise<User> {
    return new Promise((resolve, rejected) =>
      this.getToken()
      .then( (token) => {
        axios.get("https://readtome.herokuapp.com/api/me",
        { headers: { 'Authorization': `Bearer ${token}` }})
        .then( (response: AxiosResponse) => resolve(response.data))
        .catch( (error: any) => rejected(error))
      })
      .catch((error:any) => rejected(error))
    )
  }

  setToken = (token: string) => {
    // Saves user token to localStorage
    AsyncStorage.setItem('userToken', token)
  }

  getToken(): Promise<String|null> {
    return new Promise((resolve, rejected) =>
      AsyncStorage.getItem('userToken')
      .then( value => resolve(value))
      .catch( error => rejected(error) )
    )
  }
}
