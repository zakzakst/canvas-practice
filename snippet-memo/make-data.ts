// 【内容】
// 指定の数の配列データを作成する

type ItemData = {
  id: number;
  name: string;
};

const total = 20;

const items: ItemData[] = [...new Array(total)].map((_, index) => ({
  id: index,
  name: `name-${index}`,
}));
