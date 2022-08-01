export interface Lattice {
  color?: string
  state: number
}

export type Board = Lattice[][]

export type BlockType = 'I' | 'O' | 'L' | 'J' | 'T' | 'S' | 'Z'
export type SingleBlock = number[][]
export type Block = [BlockType, SingleBlock, string]
