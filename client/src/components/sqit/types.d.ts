import p5 from "p5";

interface Editor {
  setter1: string;
  setter2: string;
  getter: (val: string) => void;
}

interface P5Extend extends p5 {
  anim?: boolean,
  interval?:number
}

type Vec3 = [number, number, number]



export {Editor, P5Extend, Vec3}