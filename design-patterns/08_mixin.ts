// https://zenn.dev/morinokami/books/learning-patterns-1/viewer/mixin-pattern
// 上手くいかない。一旦後回し

class PetDog {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

const animalFunctionality = {
  walk: () => console.log('Walking!'),
  sleep: () => console.log('Sleeping!'),
}

const dogFunctionality = {
  bark: () => console.log('Woof!'),
  wagTail: () => console.log('Wagging my tail!'),
  play: () => console.log('Playing!'),
  walk() {
    super.walk()
  },
  sleep() {
    super.sleep()
  },
}

Object.assign(dogFunctionality, animalFunctionality)
Object.assign(PetDog.prototype, dogFunctionality)

const pet = new PetDog('Daisy')
console.log(pet)
pet.name
pet.bark()
pet.walk()
