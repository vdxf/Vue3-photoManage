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

// interface User {
//   name: string
//   age: number
// }
// function add(user: User): User {
//   return user
// }
// console.log(add({ name: 'addd', age: 12 }))

// interface Options {
//   el: string | HTMLElement
// }

// interface VueClass {
//   options: Options
//   init(): void
// }

// interface Vnode {
//   tag: string
//   text?: string
//   children?: Vnode[]
// }

// class Dom {
//   //创建节点
//   createElement(el: string) {
//     return document.createElement(el)
//   }
//   //填充文本的方法
//   setText(el: HTMLElement, text: string | null) {
//     el.textContent = text
//   }
//   //渲染函数
//   render(data: Vnode) {
//     const root = this.createElement(data.tag)
//     if (data.children && Array.isArray(data.children)) {
//       data.children.forEach((item) => {
//         const child = this.render(item)
//         root.appendChild(child)
//       })
//     } else {
//       this.setText(root, data.text)
//     }
//     return root
//   }
// }

// class Vue extends Dom implements VueClass {
//   options: Options
//   constructor(options: Options) {
//     super()
//     this.options = options
//     this.init()
//   }
//   init(): void {
//     const data: Vnode = {
//       tag: 'div',
//       children: [
//         {
//           tag: 'section',
//           text: '1'
//         },
//         {
//           tag: 'section',
//           text: '2',
//           children: []
//         }
//       ]
//     }
//     let app = typeof this.options.el === 'string' ? document.querySelector(this.options.el)
//     app.appendChild(this.render(data))
//   }
// }

// new Vue({
//   el: '#app'
// })

// const arr: readonly [number, boolean] = [1, false]

// arr[0] = 2

// const arr: readonly [x: number, Y?: boolean] = [1]

// const excel: [string, string, number][] = [
//   ['张三', '男', 18],
//   ['张三', '男', 18],
//   ['张三', '男', 18],
//   ['张三', '男', 18]
// ]
