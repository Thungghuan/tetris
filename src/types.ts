export interface Lattice {
  color?: string
  state: number
}

export type Board = Lattice[][]

export type BlockType = 'I' | 'O' | 'L' | 'J' | 'T' | 'S' | 'Z'
export type BlockIndex = `${BlockType}-${number}`
export type SingleBlock = number[][]
export type Block = [BlockIndex | null, SingleBlock, string]

export enum GameState {
  Init,
  FallStart,
  Falling,
  FallEnd,
  Eliminate
}
