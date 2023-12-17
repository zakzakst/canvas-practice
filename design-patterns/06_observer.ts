// https://zenn.dev/morinokami/books/learning-patterns-1/viewer/observer-pattern

type ObservableFuncArg = string
type ObservableFunc = (arg: ObservableFuncArg) => void

class Observable {
  observers: ObservableFunc[]

  constructor() {
    this.observers = []
  }

  subscribe(f: ObservableFunc) {
    this.observers.push(f)
  }

  unsubscribe(f: ObservableFunc) {
    this.observers = this.observers.filter((subscriber) => subscriber !== f)
  }

  notify(arg: ObservableFuncArg) {
    this.observers.forEach((observer) => observer(arg))
  }
}

const observable = new Observable()
const handleEvent = () => {
  observable.notify('event')
}
const observerFunc = (arg: ObservableFuncArg) => {
  console.log(`${Date.now()} ${arg}`)
}
observable.subscribe(observerFunc)

handleEvent()
