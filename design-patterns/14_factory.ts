// https://zenn.dev/morinokami/books/learning-patterns-1/viewer/factory-pattern

// ファクトリパターン (factory pattern) では、新しいオブジェクトを作成するためにファクトリ関数 (factory function) を使用します。関数が new キーワードを使わずに新しいオブジェクトを返すとき、その関数はファクトリ関数であるといえます。

// ファクトリパターンは、比較的複雑で、設定により変更可能なオブジェクトを作成する場合に有効です。
// しかし、毎回新しいオブジェクトを作成するよりも、新しいインスタンスを作成する方が、メモリ効率が良い場合が多いです。

type UserData = {
  firstName: string,
  lastName: string,
  email: string,
}

const createUser = (user: UserData) => ({
  ...user,
  fullName() {
    return `${this.firstName} ${this.lastName}`
  },
})

const user_1 = createUser({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
})

const user_2 = createUser({
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@doe.com'
})

console.log(user_1)
console.log(user_2)
