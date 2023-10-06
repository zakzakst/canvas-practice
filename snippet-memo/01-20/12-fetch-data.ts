// 【参考】
//

// 【内容：非同期関数】

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

fetchData("https://jsonplaceholder.typicode.com/posts");
