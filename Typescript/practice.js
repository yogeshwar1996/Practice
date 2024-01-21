function identity(arg) {
    return arg;
}
var result = identity(42);
var value = identity("Hello, TypeScript").toUpperCase();
console.log("result", result);
console.log("value", value);
