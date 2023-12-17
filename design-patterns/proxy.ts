// https://zenn.dev/morinokami/books/learning-patterns-1/viewer/proxy-pattern

// 一般に、プロキシは誰かの代役を意味します。ある人に直接話しかける代わりに、その人を代理するプロキシに話しかけるという具合です。これは JavaScript でも同じです。つまり、ターゲットとなるオブジェクトを直接操作する代わりに、プロキシオブジェクトとやり取りするのです。

// プロキシは、バリデーションを追加する際に便利です。ユーザーが person の年齢を文字列に変更したり、名前を空にしたりできてはいけません。あるいは、ユーザーがオブジェクト上の存在しないプロパティにアクセスしようとした場合、ユーザーにそれを知らせるべきです。

// 以前は、プロキシ内のターゲットオブジェクトのプロパティを変更・取得するには、ブラケット記法により直接的に値を取得・設定していました。その代わりとして使用できるのが Reflect オブジェクトです。Reflect オブジェクトのメソッドは、handler オブジェクトのメソッドと同じ名前をもっています。
// obj[prop] によってプロパティへとアクセスし、obj[prop] = value によってプロパティを設定する代わりに、 Reflect.get() と Reflect.set() によってターゲットオブジェクトのプロパティの取得や変更ができます。これらのメソッドは、ハンドラオブジェクトのメソッドと同じ引数を受け取ります。

const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American',
}

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${String(prop)} is ${Reflect.get(obj, prop)}`)
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${String(prop)} from ${obj[prop]} to ${value}`)
    return Reflect.set(obj, prop, value)
  },
})

personProxy.name
personProxy.age = 43
personProxy.name = 'Jane Doe'
