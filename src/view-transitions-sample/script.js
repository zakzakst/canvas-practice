document.querySelectorAll("a[data-to]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();

    const to = e.currentTarget.dataset.to;

    document.startViewTransition(() => {
      document.querySelectorAll("[data-page]").forEach((page) => {
        page.hidden = to !== page.dataset.page;
      });
    });
  });
});
