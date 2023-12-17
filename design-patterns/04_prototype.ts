// prototype は、コンストラクタの prototype プロパティ、またはインスタンスの __proto__ プロパティにアクセスすることで直接確認することができます。

// 同じプロパティにアクセスできるはずのオブジェクトを扱うときに、プロトタイプパターンはとても強力です。すべてのインスタンスはプロトタイプオブジェクトにアクセスできるため、プロパティの複製を毎回作成する代わりに、プロパティをプロトタイプに追加するだけでよいのです。
// すべてのインスタンスはプロトタイプにアクセスできるため、インスタンスの作成後であっても、プロトタイプにプロパティを追加することが簡単にできます。
// たとえば私たちの犬を、吠える以外に遊べるようにもしたいとしましょう。これは、プロトタイプに play プロパティを追加することで可能となります。

// プロトタイプチェーンという言葉は、一つ以上の段階があることを示しています。そうなんです！ここまでは、__proto__ が参照をもつ最初のオブジェクトから直接利用可能なプロパティにアクセスする方法について見てきました。ところが、プロトタイプ自身も __proto__ オブジェクトをもっているのです！
// 別のタイプの犬、スーパードッグを作りましょう。この犬は普通の Dog からすべてを継承しますが、さらに空を飛ぶことができます。スーパードッグは、Dog クラスを継承して fly メソッドを追加することにより作ることができます。

class Dog {
  name: string

  constructor(name) {
    this.name = name
  }

  bark() {
    console.log('Woof!')
  }
}

class SuperDog extends Dog {
  constructor(name) {
    super(name)
  }

  fly() {
    console.log('Flying!')
  }
}

const dog1 = new SuperDog('Daisy')
dog1.bark()
dog1.fly()

// Object.create メソッドにより、新しいオブジェクトを作成し、そのオブジェクトに明示的にプロトタイプの値を渡すことができます。

const dog = {
  bark() {
    return 'Woof!'
  }
}

const pet1 = Object.create(dog)
pet1.bark()
console.log('Direct properties on pet1: ', Object.keys(pet1))
console.log('Properties on pet1\'s prototype: ', Object.keys(pet1.__proto__))
