// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  paypal:{
    clientId: "AaLifL9xZQYOxIeqUVxYTrGIm_bWY1m9KWPKaRt_4PptuQLNZm74V9jLC8ZlKFS53wvP-_7VZm8hm1zz"
  },
  apiUrl: "http://localhost:5000/api",
  methods: {
    createUser: "/user",
    login: "/user/login",
    saveSolution: "/v1/solution",
    uploadFile: "/v1/solution/uploadfile",
    findSolution: "/solution/find",
    getSolutionByID: "/solution",
    findComments: "/comment/find",
    postComment: "/v1/comment"
  }
};