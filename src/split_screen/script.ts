const detailButtonEls = document.querySelectorAll(".js-detail-button");
const modalEl = document.getElementById("js-modal");
const closeEls = document.querySelectorAll(".js-close");
const MODAL_ACTIVE_CLASS = "is-active";

const openModal = () => {
  modalEl.classList.add(MODAL_ACTIVE_CLASS);
};

const closeModal = () => {
  modalEl.classList.remove(MODAL_ACTIVE_CLASS);
};

const init = () => {
  [...detailButtonEls].forEach((el) => {
    el.addEventListener("click", () => {
      openModal();
    });
  });

  [...closeEls].forEach((el) => {
    el.addEventListener("click", () => {
      closeModal();
    });
  });
};

init();
