import config from "../config.js";
import Fetcher from "../utils/Fetcher.js";

export class ApiNet {
  static url = config.apisNetUrl
  static headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + config.tokenApisNet
  }

  static getDNI(dni) {
    const endpoint =`/reniec/dni?numero=${dni}`
    return Fetcher.get(this.url + endpoint, this.headers)
  }
  
  static getRUC(ruc) {
    const endpoint =`/sunat/ruc?numero=${ruc}`
    return Fetcher.get(this.url + endpoint, this.headers)
  }
}