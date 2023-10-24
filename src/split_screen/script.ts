const detailButtonEls = document.querySelectorAll(".js-detail-button");
const modalEl = document.getElementById("js-modal");
const closeEls = document.querySelectorAll(".js-close");
const campaignEl = document.getElementById("js-campaign");
const campaignCloseEl = document.querySelector(".js-campaign-close");
const MODAL_ACTIVE_CLASS = "is-active";
const CAMPAIGN_HIDE_CLASS = "is-hidden";

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

  campaignCloseEl.addEventListener("click", () => {
    campaignEl.classList.add(CAMPAIGN_HIDE_CLASS);
  });
};

init();
