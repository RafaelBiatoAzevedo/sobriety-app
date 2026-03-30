import "styled-components/native";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      text: string;
      danger: string;
      card: string;
    };
  }
}
