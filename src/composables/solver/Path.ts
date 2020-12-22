export class DuplicateCoordinateException extends Error {
  constructor(message?: string) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export class Path {
  coords: number[][] = []
  constructor(pCoords: number[][] = []) {
    this.coords = pCoords;
  }

  add(pCoords: number[]): Path {
    const newCoords = this.coords.concat([pCoords])
    for (const coord of this.coords) {
      if (coord[0] === pCoords[0] && coord[1] === pCoords[1]) {
        throw new DuplicateCoordinateException();
      }
    }
    return new Path(newCoords);
  }

  toString(): string {
    return JSON.stringify(this.coords);
  }
}