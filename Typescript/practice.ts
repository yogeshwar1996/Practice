function identity<T>(arg: T): T {
  return arg;
}
let result: number = identity<number>(42);
let value: string = identity<string>("Hello, TypeScript").toUpperCase();
console.log("result", result);
console.log("value", value);
