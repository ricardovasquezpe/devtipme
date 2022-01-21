export const environment = {
  production: false,
  paypal:{
    clientId: "AaLifL9xZQYOxIeqUVxYTrGIm_bWY1m9KWPKaRt_4PptuQLNZm74V9jLC8ZlKFS53wvP-_7VZm8hm1zz",
    clientIdProd: "ASPNa5ySH4WMvDFaCW19CqCyuKXMOxkMSG7sZWmcSyirX8aNuqkC9dFRMC-IPmTfEWZbnZxwFqhSSV_F"
  },
  apiUrl: "http://localhost:5000",
  methods: {
    createUser: "/user",
    login: "/user/login",
    saveSolution: "/v1/solution",
    uploadFile: "/v1/solution/uploadfile",
    findSolution: "/solution/find",
    findMySolution: "/v1/solution/my",
    amountMyTips: "/v1/tip/my/total",
    listTrending: "/topic/trending",
    getSolutionByID: "/solution",
    findComments: "/comment/find",
    verifyme: "/user/verifyme",
    postComment: "/v1/comment",
    insertTip: "/v1/tip",
    authorizePayment: "/v1/paypal/authorize"
  }
};