const postsApiUrl = "https://s-ishizaki.sakura.ne.jp/sample-site-01/wp-json/wp/v2/posts";
const categoriesApiUrl = "https://s-ishizaki.sakura.ne.jp/sample-site-01/wp-json/wp/v2/categories";
const perPage = 2;

new Vue({
  el: '#app',
  data: {
    posts: [],
    categories: [],
    currentPage: 0,
    currentCategory: null,
    totalPages: 0,
    initialized: false,
    order: 'desc', // desc, asc
    orderby: 'date',
  },
  methods: {
    async postsInit() {
      const categoryParam = this.currentCategory ? `&categories=${this.currentCategory}` : ''
      const response = await fetch(`${postsApiUrl}?per_page=${perPage}&offset=${this.currentPage * perPage}&order=${this.order}&orderby=${this.orderby}${categoryParam}`);
      const postsRes = await response.json();
      const totalPagesRes = await response.headers.get('x-wp-totalpages');
      this.posts = postsRes;
      this.totalPages = totalPagesRes;
      this.initialized = true;
    },
    async categoriesInit() {
      const response = await fetch(categoriesApiUrl);
      const categoriesRes = await response.json();
      this.categories = categoriesRes;
      // console.log(this.categories);
    },
    movePage(page) {
      if (this.currentPage === page) return
      if (page < 0 || page > this.totalPages - 1) return
      this.currentPage = page
      this.postsInit()
    },
    changeSort() {
      if (this.order === 'desc') {
        this.order = 'asc'
        this.postsInit()
      } else if (this.order === 'asc') {
        this.order = 'desc'
        this.postsInit()
      }
    },
    changeCategory(id) {
      this.currentCategory = id;
      this.postsInit();
      // console.log('changeCategory', id);
    },
  },
})

// 必要な値のみに絞ったAPIのレスポンスを取得する
// カテゴリー複数選択
// 検索時に条件をURLに反映する
// 読み込み時に検索条件をURLから取得する