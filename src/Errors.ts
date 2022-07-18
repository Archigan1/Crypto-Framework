/**
* Creates a new CustomError, `BlockError`. This error will be more widely used in the future, when I can understand my spaghetti mess and find more uses for it.
* @since v1.2.0
*/
export class BlockError extends Error {
  message: string;

  /**
  * Cosntructs the `BlockError`.
  * @param message - The message to be sent to the console.
  * @since v1.2.0
  */
  constructor(message: string) {
    super(message);
    this.name = "BlockError";
    this.message = message;
  }
}


/**
* Creates a new CustomError, `ValidationError`. This will be apended to every method that verifies or validates something, and will throw an error if it's not valid.
* @since v1.2.0
* @version v1.1.0
*/
export class ValidationError extends Error {
  object: string;

  /**
  * Constructs the `ValidationError`.
  * @param object - The object that is not valid.
  * @since v1.2.0
  * @since v1.1.0
  */
  constructor(object: string) {
    super(`${object} has been returned as not valid`);
    this.object = object;
  }
}