export type Position = {
	x:number,
	y:number
}

export enum Direction {
	up,
	down,
	left,
	right,
}

export type PlayerOptions = {
  /** Unique identifier for the player */
  id:string,
  width?: number ,
  height?: number ,
  size?:number,
  position?: Position,
  base_speed?:number,
  tyle_set:TyleSet 
}

export type AnimationInfo = {
  idx:number,
  frames:number
}

export type TyleSet = {
  src:string,
  rows:number,
  cols:number,
  up?: AnimationInfo,
  down?: AnimationInfo ,
  left?: AnimationInfo ,
  right?: AnimationInfo,
}

export type GameOptions = {
  board_width:number,
  board_height:number
}

