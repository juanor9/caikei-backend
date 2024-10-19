
declare module "mongo-sanitize" {
  function sanitize<T>(input: T): T;
  export default sanitize;
}
