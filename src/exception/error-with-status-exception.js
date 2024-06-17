export class ErrorWithStatus extends Error {
  constructor(message, status) {
    super("An error occurred");
    this.status = status
  }
}

