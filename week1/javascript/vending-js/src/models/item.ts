// Name
// Price
// Position
// Stock

/**
 * The below instructions create a custom type called Position
 * That represents the Union of all of the possible string combinations
 * from A0 - F9
 * Additionally, it includes a function that acts as a "type guard"
 * It can be used to inform TypeScript's compiler
 * that a received input is of this type
 *
 * The implementation makes handy use of Regular Expressions
 * Regular Expressions start and end with a '/' character
 * The '^' character indicates the beginning of a string
 * The '$' character indicates the end of a string
 * Taken altogether, that Regular Expression matches our custom
 * Position type
 */
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type Position = `${Letter}${Digit}`
export function isPosition(value: string): value is Position {
  return /^[A-F][0-9]$/.test(value);
}

export default class Item {
  constructor(
    public name: string = '',
    public price: number = 0,
    public position: Position = 'A0',
    public stock: number = 0,
  ) {}
}
