export interface Lattice {
  color?: string
  state: number
}

export type Board = Lattice[][]

export type BlockType = 'I' | 'O' | 'L' | 'J' | 'T' | 'S' | 'Z'
export type BlockIndex = number
export type BlockState = number[][]
export interface Block {
  type: BlockType | null
  index: BlockIndex
  color: string
}

export enum GameState {
  Init,
  FallStart,
  Falling,
  FallEnd,
  Eliminate
}

export enum BlockMovement {
  Rotate,
  Down,
  Left,
  Right
}

export type RefCod = [number, number]
