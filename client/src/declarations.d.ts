declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
// declare module "*.svg";

declare module "*.svg" {
    const content: any;
    export default content;
  }