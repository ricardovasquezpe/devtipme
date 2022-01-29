export const environment = {
  production: false,
  paypal:{
    clientId: "Adt1BlXctAeZQHHV5aDXiLHNQweW3EDCP7NsGKXXhYnQmmkdNhsiTrmWunRWMLgBHChPtYcgvJIiwDTP",
    clientIdProd: "AfHwHWrR7waKwqYL4GH68sVPqH0cPMKiFd81YOS0dxoyzeqJL_62-4FW77-yzU2xwbe7nhvtoJFDU3jJ"
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