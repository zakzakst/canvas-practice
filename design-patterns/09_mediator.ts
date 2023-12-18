// https://zenn.dev/morinokami/books/learning-patterns-1/viewer/mediator-pattern

// メディエータパターン (mediator pattern) は、中央にあるメディエータという存在を通してコンポーネントどうしがやり取りすることを可能にします。コンポーネントどうしが直接対話するのではなく、メディエータがリクエストを受け取り、それを転送します。

// https://typescriptbook.jp/reference/object-oriented/class#クラスの型注釈
// TypeScriptでは、クラスを定義するとクラス名と同じ名前の型が同時に定義されます。インスタンスを代入する変数に型注釈するには、クラス名を使います。

class ChatRoom {
  logMessage(user: User, message: string) {
    const sender = user.getName()
    console.log(`${new Date().toLocaleString()} [${sender}]: ${message}`)
  }
}

class User {
  name: string
  chatroom: ChatRoom
  constructor(name, chatroom) {
    this.name = name
    this.chatroom = chatroom
  }

  getName() {
    return this.name
  }

  send(message: string) {
    this.chatroom.logMessage(this, message)
  }
}

const chatroom = new ChatRoom()
const user1 = new User('John Doe', chatroom)
const user2 = new User('Jane Doe', chatroom)

user1.send('Hi there!')
user2.send('Hey!')
