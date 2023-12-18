// https://zenn.dev/morinokami/books/learning-patterns-1/viewer/flyweight-pattern

// フライウェイトパターン (flyweight[1] pattern) は、類似のオブジェクトを大量に作るときに、メモリを節約するための便利な方法です。
// アプリケーションで、ユーザーが本を追加できるようにしたいとします。すべての本は、title、author、そして isbn 番号をもちます。しかし、図書館には通常、ある本が 1 冊だけあるわけではなく、同じ本が複数冊あります。
// まったく同じ本が複数ある場合、毎回新しい本のインスタンスを作成するのはあまり意味がありません。その代わり、1 冊の本を表わす Book コンストラクタのインスタンスを複数作成するようにします。

// JavaScript ではプロトタイプ継承によって、この問題を簡単に解決することができます。現在では、ハードウェアは GB 単位の RAM をもっているため、フライウェイトパターンの重要性は低くなっています。

type IsbnNumber = string

class Book {
  title: string
  author: string
  isbn: IsbnNumber
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

const isbnNumbers = new Set<IsbnNumber>()
const bookList: Book[] = []

const createBook = (title: string, author: string, isbn: IsbnNumber) => {
  // const book = isbnNumbers.has(isbn)
  const book = bookList.find((book) => book.isbn === isbn)
  if (book) {
    return book
  } else {
    const book = new Book(title, author, isbn)
    isbnNumbers.add(isbn)
    return book
  }
}

const addBook = (title: string, author: string, isbn: IsbnNumber, availability: boolean, sales: number) => {
  // const book = {
  //   ...createBook(title, author, isbn),
  //   sales,
  //   availability,
  //   isbn,
  // }
  // bookList.push(book)
  const book = createBook(title, author, isbn)
  bookList.push(book)
  return book
}

addBook('Harry Potter', 'JK Rowling', 'AB123', false, 100)
addBook('Harry Potter', 'JK Rowling', 'AB123', true, 50)
addBook('To Kill a Mockingbird', 'Harper Lee', 'CD345', true, 10)
addBook('To Kill a Mockingbird', 'Harper Lee', 'CD345', false, 20)
addBook('The Great Gatsby', 'F. Scott Fitzgerald', 'EF567', false, 20)

console.log('Total amount of copies: ', bookList.length)
console.log('Total amount of books: ', isbnNumbers.size)
