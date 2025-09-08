export class InvalidDateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidDateError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
