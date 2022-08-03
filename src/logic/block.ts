import type { BlockType, BlockState, Block, BlockIndex } from '@/types'

// prettier-ignore
export const BlockStates: Map<BlockType, BlockState[]> = new Map([
  [
    'I',
    [
      [ [1, 1, 1, 1] ],
      [
        [1],
        [1],
        [1],
        [1]
      ]
    ]
  ],

  [
    'O',
    [
      [
        [1, 1],
        [1, 1]
      ]
    ]
  ],

  [
    'L',
    [
      [
        [1, 0],
        [1, 0],
        [1, 1]
      ],
      [
        [1, 1, 1],
        [1, 0, 0]
      ],
      [
        [1, 1],
        [0, 1],
        [0, 1]
      ],
      [
        [0, 0, 1],
        [1, 1, 1]
      ]
    ]
  ],
  [
    'J',
    [
      [
        [0, 1],
        [0, 1],
        [1, 1]
      ],
      [
        [1, 0, 0],
        [1, 1, 1]
      ],
      [
        [1, 1],
        [1, 0],
        [1, 0]
      ],
      [
        [1, 1, 1],
        [0, 0, 1]
      ]
    ]
  ],
  [
    'T',
    [
      [
        [1, 1, 1],
        [0, 1, 0]
      ],
      [
        [0, 1],
        [1, 1],
        [0, 1]
      ],
      [
        [0, 1, 0],
        [1, 1, 1]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 0]
      ]
    ]
  ],
  [
    'S',
    [
      [
        [0, 1, 1],
        [1, 1, 0]
      ],
      [
        [1, 0],
        [1, 1],
        [0, 1]
      ]
    ]
  ],

  [
    'Z',
    [
      [
        [1, 1, 0],
        [0, 1, 1]
      ],
      [
        [0, 1],
        [1, 1],
        [1, 0]
      ]
    ]
  ]
])

//// prettier-ignore
// const blockSize: Record<BlockType, [number, number][]> = {
//   I: [ [4, 1], [1, 4] ],
//   L: [ [2, 3], [3, 2] ],
//   J: [ [2, 3], [3, 2] ],
//   O: [ [2, 2] ],
//   T: [ [3, 2], [2, 3] ],
//   S: [ [3, 2], [2, 3] ],
//   Z: [ [3, 2], [2, 3] ]
// }

export function getBlockSize(block: Block) {
  const state = getBlockState(block)
  return [state.length, state[0].length]
}

export function getBlockState(block: Block) {
  const { type, index } = block
  return BlockStates.get(type!)![index]
}
