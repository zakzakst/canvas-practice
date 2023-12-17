// https://zenn.dev/morinokami/books/learning-patterns-1/viewer/module-pattern

// ファイルの先頭でモジュールをインポートする場合、それらはファイルの残りの部分よりも先にロードされます。ところで、ある条件に基づいてモジュールをインポートする必要があるケースも存在します。ダイナミックインポートを使えば、オンデマンドにモジュールをインポートすることができます。

import('module').then((module) => {
  module.default()
  module.namedExport()
})

// 非同期の場合
(async () => {
  const module = await import('module')
  module.namedExport()
})

// 具体例（ボタンをクリックした場合のみ読み込まれる）
const button = document.getElementById('btn')

button.addEventListener('click', () => {
  import('./math.js').then((module) => {
    console.log('Add: ', module.add(1, 2))
    console.log('Multiply', module.multiply(3, 2))
    button.innerHTML = 'Check the console'
  })
})
