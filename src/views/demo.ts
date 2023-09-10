// interface Abc {
//   name: string
//   age: number
// }

// const a: Abc = {
//   name: 'aaa',
//   age: 88
// }

// function add(a: number, b: number): number {
//   return a + b
// }
// console.log(add(1, 2))

// function add(a: number = 1, b: number = 2): number {
//   return a + b
// }

interface User {
  name: string
  age: number
}
function add(user: User): User {
  return user
}
console.log(add({ name: 'addd', age: 12 }))
