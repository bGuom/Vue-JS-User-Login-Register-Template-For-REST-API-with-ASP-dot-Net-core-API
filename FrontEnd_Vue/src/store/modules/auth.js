import requestModule from '../../shared/requestModule';

const API_URL ="http://localhost:25803"
const state ={
  token: localStorage.getItem("access_token") || null,
};
const getters = {
  loggedIn(state){
    return state.token!= null
  }
};
const actions ={

  retrieveToken(context,credentials){
    return new Promise((resolve,reject) =>
    {
      requestModule().post(API_URL + '/api/auth/GetToken', {
        Email: credentials.email,
        Password: credentials.password
      }).then(res => {
          console.log('GetToken',res.data);
          if (res.data.status != "error") {
            const token = res.data.token;
            localStorage.setItem("access_token", token)
            context.commit("retrieveToken", token)
            resolve(res.data)
          }
        }
      ).catch(err => {
        console.log('GetToken Error : ',err.response.data);
        reject(err.response.data)
      })
    })
  },

  register(context,data){
    return new Promise((resolve,reject) => {
      requestModule().post(API_URL + '/api/auth/register', {
        "userName": data.userName,
        "displayName": data.displayName,
        "email": data.email,
        "role":"registerduser",
        "password": data.password
      }).then(res => {
        console.log(res);
        if(res.data.status!="Error"){
          resolve(res.data)

        }else{
          reject(res.data)
        }

      }).catch(err => {
        console.log(err.response.data);
        reject(res.response.data)
      })
    })
  },

  logout(context){
    if(context.getters.loggedIn()){
      localStorage.removeItem("access_token")
      context.commit("destroyToken")
    }
  }

};
const mutations ={
  retrieveToken(state,token){
    state.token=token
  },
  destroyToken(state){
    state.token=null
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}

