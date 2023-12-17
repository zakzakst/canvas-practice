// https://zenn.dev/morinokami/books/learning-patterns-1/viewer/singleton-pattern

let instance

class Counter {
  count: number

  constructor() {
    // Counter のコンストラクタで新しいインスタンスが作成されるときに、instance にそのインスタンスへの参照をセットするのです。変数 instance にすでに値がセットされているかどうかをチェックすることで、新しいインスタンスが作られないようにすることができます。もし値がセットされていれば、すでにインスタンスが存在するということです。
    if (instance) {
      throw new Error('You can only create one instance!')
    }
    this.count = 0
    instance = this
  }

  getInstance() {
    return this
  }

  getCount() {
    return this.count
  }

  increment() {
    return ++this.count
  }

  decrement() {
    return --this.count
  }
}

// Object.freeze メソッドは、利用者側であるコードからシングルトンを変更できないようにします。凍結したインスタンスのプロパティに対して追加や変更ができないため、誤ってシングルトンの値を上書きしてしまう危険性が低くなります。
const singletonCounter = Object.freeze(new Counter())
export default singletonCounter
