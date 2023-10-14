// 【参考】
//

// 【内容：】
type Greeting = `Hello, ${string}!`;

const createGreeting = (name: string): Greeting => {
  return `Hello, ${name}!` as Greeting;
};

// 使用例
const greeting: Greeting = createGreeting("Alice");

console.log(greeting);
