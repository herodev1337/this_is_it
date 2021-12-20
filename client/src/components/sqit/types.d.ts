import p5 from 'p5';

interface Editor {
  setter1: string;
  setter2: string;
  getter: (val: string) => void;
}

interface P5Extend1 extends p5 {
  anim?: boolean;
  interval?: number;
}

interface P5Extend2 extends p5 {
  isBreakerActive?: boolean;
}

interface P5Extend3 extends p5 {
  isObjectActive?: boolean;
}

interface P5Extend4 extends p5 {
  fields__?: number[];
  yourTurn?:boolean;
  win?:boolean|number;
  hardMode?:boolean;
  playerWin?: boolean;
  KI_Mode_?:string;
  set_win?:(win?:boolean, playerWin?:boolean)=>void;
  customResize?:()=>void
}

interface P5Extend5 extends p5 {
  score?:number;
  rotten_?:boolean;
}

type Vec3 = [number, number, number];

type Active = {
  walk: boolean;
  jump: boolean;
  left: boolean;

};

export { Editor, Vec3, Active, P5Extend1, P5Extend2, P5Extend3, P5Extend4, P5Extend5 };
