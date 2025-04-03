import { Game } from "@/game";
import { createEffect, createSignal, For, onCleanup } from "solid-js";

const SQUARE_SIZE = 64
const BOARD_ROWS = 13;
const BOARD_COLS = 16;
const BOARD_WIDTH = BOARD_COLS * SQUARE_SIZE
const BOARD_HEIGHT = BOARD_ROWS * SQUARE_SIZE

const game_options = {
  board_width : BOARD_WIDTH,
  board_height:BOARD_HEIGHT
}

const [selectedTyle,selecTyle] = createSignal(-1)

export const Edit = ()=>{
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

    game.launch()

  })

  onCleanup(() => {
    if(!game){
      return
    }
    game.clear()
  });


  return (
    <div class="h-full bg-neutral-700 flex gap-2">
      <div class="p-3 flex justify-center items-center">
        <canvas class=" flex-grow-0 flex-shrink p-1 rounded-lg border border-solid border-white" ref={canvas}></canvas>
      </div>
      <div class="p-3 w-full flex justify-center">
        <Panel/>
      </div>

    </div>
  )
}

const Panel = ()=>{
  let i = 0
  const tyles = Array.from({length:100},(idx)=>i++)
  return (
    <div class=" flex flex-col gap-2 max-w-[444px] rounded-lg border border-solid justify-between border-white h-full w-full p-2 overflow-hidden">
      <div class=" flex flex-wrap items-start gap-2 justify-start overflow-y-scroll scrollbar-hidden" >
        <For each={tyles} fallback={<div>Loading...</div>}>
          {
            (item) => <TyleDisplay item={item}/>
          }
        </For>
      </div>
      <div class=" flex[0_0_0] h-20 w-full rounded-lg border border-solid border-white">
      </div>
    </div>
  )
}

interface TyleProps {
  item:number
}

const TyleDisplay = (props:TyleProps)=>{
  let tyle:HTMLDivElement|null = null

  createEffect(()=>{
    if(!tyle){
      return
    }
    if(selectedTyle() == props.item){
      tyle.classList.add("active-tyle")
    }else {
      tyle.classList.remove("active-tyle")
    }
  })

  function onclick(){
    if(!tyle){
      return
    }
    if(selectedTyle() == props.item){
      selecTyle(-1)
    }else {
      selecTyle(props.item)
    }


  }

  return (
    <div ref={tyle} onclick={onclick} class=" select-none cursor-pointer flex justify-center items-center h-16 w-16 rounded-lg border border-solid border-white">
      <span>{props.item}</span>
    </div>
  )
}
