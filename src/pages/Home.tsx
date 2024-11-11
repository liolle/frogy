import {PlayerOptions} from "@types"
import {Player} from "@/player"
import { Game } from "@/game";
import { createEffect, onCleanup } from "solid-js";

const SQUARE_SIZE = 64
const BOARD_ROWS = 13;
const BOARD_COLS = 16;
const BOARD_WIDTH = BOARD_COLS * SQUARE_SIZE
const BOARD_HEIGHT = BOARD_ROWS * SQUARE_SIZE

const game_options = {
  board_width : BOARD_WIDTH,
  board_height:BOARD_HEIGHT
}

const player_options:PlayerOptions = {
  id: "default",
  width:64,
  height:64,
  size:1,
  initial_position:{
    x:(BOARD_WIDTH)/2 -64 ,
    y:(BOARD_HEIGHT)/2 -64 
  } ,
  base_speed: 10,
  tyle_set: {
    src:"fullsheet.png",
    rows:45,
    cols:13,
    up: {idx:8,frames:9},
    left:{idx:9,frames:9},
    down: {idx:10,frames:9},
    right: {idx:11,frames:9},
  }

}

export const Home = ()=>{
  let canvas:HTMLCanvasElement|null = null;
  const game:Game|null = null

  createEffect(()=>{
    if (!canvas) {
      return
    }

    canvas.width = BOARD_WIDTH 
    canvas.height = BOARD_HEIGHT
    const context = canvas.getContext("2d")

    const game = new Game(context,game_options)
    const player = new Player(context,player_options)
    
    game.addPlayer(player)
    game.launch()

  })

  onCleanup(() => {
    if(!game){
        return
    }
    game.clear()
  });

  return (
    <div class="h-full flex justify-center items-center">
      <canvas class=" p-1 rounded-lg border border-solid border-white" ref={canvas}></canvas>
    </div>
  )
}
