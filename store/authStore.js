import { decorate, observable, action, computed } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
class AuthStore {
  constructor() {
    (this.user = null), (this.isAuthenticated = false);
  }

  loginUser(userData, navigation) {
    axios
      .post("http://coffee.q8fawazo.me/api/login/", userData)
      .then(res => res.data)
      .then(user => {
        this.user = jwt_decode(user.token);
        this.setAuthToken(user.token);
        this.isAuthenticated = true;
        navigation.replace("CoffeeList");
      })
      .catch(err => console.error(err));
  }

  registerUser(userData, navigation) {
    axios
      .post(" http://coffee.q8fawazo.me/api/register/", userData)
      .then(res => res.data)
      .then(user => {
        this.loginUser(userData, navigation);
      })
      .catch(err => console.error(err));
  }

  setCurrentUser(userData) {
    this.user = userData;
  }

  setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
      AsyncStorage.setItem("token", token);
      this.isAuthenticated = true;
    } else {
      delete axios.defaults.headers.common.Authorization;
      AsyncStorage.removeItem("token");
      this.isAuthenticated = false;
    }
  }

  checkForToken() {
    AsyncStorage.getItem("token")
      .then(value => {
        if (value) {
          this.setCurrentUser(jwt_decode(value));
          this.setAuthToken(value);
        } else {
          this.logoutUser();
        }
      })
      .catch(err => console.error(err));
  }

  logoutUser() {
    this.user = null;
    this.isAuthenticated = false;
    this.setAuthToken();
  }
}
decorate(AuthStore, {
  user: observable,
  isAuthenticated: observable
});

let authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
