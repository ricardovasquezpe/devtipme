export interface Theme {
    name: string;
    properties: any;
  }
  
  export const light: Theme = {
    name: "light",
    properties: {
        "--primary-color": "white",
        "--background-color": "white",
        "--text-color": "black",
        "--card-background-color": "white"
    }
  };
  
  export const dark: Theme = {
    name: "dark",
    properties: {
        "--primary-color": "black",
        "--background-color": "black",
        "--text-color": "white",
        "--card-background-color": "#414040"
    }
  };