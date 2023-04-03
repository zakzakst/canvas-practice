const { createApp, ref, computed, onMounted } = Vue;

const categoryItemsData = [
  {
    id: "economy",
    label: "経済",
  },
  {
    id: "entertainment",
    label: "エンタメ",
  },
  {
    id: "sports",
    label: "スポーツ",
  },
  {
    id: "technology",
    label: "テクノロジー",
  },
];

const mediaItemsData = [
  {
    id: 0,
    thumbnail: "https://picsum.photos/id/237/800/450",
    title: "経済タイトル1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "John Smith",
    categories: ["economy"],
  },
  {
    id: 1,
    thumbnail: "https://picsum.photos/id/238/800/450",
    title: "エンタメタイトル1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "John Smith",
    categories: ["entertainment"],
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/id/239/800/450",
    title: "スポーツタイトル1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "John Smith",
    categories: ["sports"],
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/id/240/800/450",
    title: "テクノロジータイトル1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "John Smith",
    categories: ["technology"],
  },
  {
    id: 4,
    thumbnail: "https://picsum.photos/id/241/800/450",
    title: "経済タイトル2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "John Smith",
    categories: ["economy"],
  },
  {
    id: 5,
    thumbnail: "https://picsum.photos/id/242/800/450",
    title: "経済タイトル3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "John Smith",
    categories: ["economy"],
  },
  {
    id: 6,
    thumbnail: "https://picsum.photos/id/243/800/450",
    title: "経済タイトル4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "John Smith",
    categories: ["economy"],
  },
];

const app = createApp({
  setup() {
    const categories = categoryItemsData.map((category) => {
      return category.id;
    });
    const mediaItemsWrapperClass = ref("");

    // カテゴリータブ関連
    const categoryItems = ref(categoryItemsData);
    const currentCategoryId = ref(categoryItemsData[0].id);
    const onClickCategory = (id) => {
      const currentCategoryIndex = categories.indexOf(currentCategoryId.value);
      const nextCategoryIndex = categories.indexOf(id);
      mediaItemsWrapperClass.value =
        currentCategoryIndex < nextCategoryIndex ? "left" : "right";
      document.startViewTransition(() => {
        currentCategoryId.value = id;
      });
    };

    // メディア関連
    const mediaItemsCategorize = computed(() => {
      const result = {};
      categories.forEach((category) => {
        const items = mediaItemsData.filter((item) => {
          return item.categories.includes(category);
        });
        result[category] = { items, category };
      });
      return result;
    });

    // モーダル関連
    const isOpenModal = ref(false);
    const openModal = () => {
      mediaItemsWrapperClass.value = "";
      document.startViewTransition(() => {
        isOpenModal.value = true;
      });
    };
    const closeModal = () => {
      document.startViewTransition(() => {
        isOpenModal.value = false;
      });
    };

    return {
      categoryItems,
      currentCategoryId,
      onClickCategory,
      mediaItemsCategorize,
      mediaItemsWrapperClass,
      isOpenModal,
      openModal,
      closeModal,
    };
  },
});

const mediaTemplate = `
<article class="media">
  <figure class="media-left">
    <p class="image is-16by9">
      <img v-if="showThumbnail" :src="thumbnail" :class="'image-item-' + id" />
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <p><small>{{ author }}</small></p>
    </div>
  </div>
</article>
`;

app.component("media", {
  props: ["id", "thumbnail", "title", "description", "author", "showThumbnail"],
  template: mediaTemplate,
});

app.mount("#app");
