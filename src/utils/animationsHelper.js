import gsap from "gsap";

export const animationsHelper = {
  menuOrder: {
    show: () =>
      gsap.to(".menu-orders-popup", { opacity: 1, visibility: "visible" }),
    hide: () =>
      gsap.to(".menu-orders-popup", { opacity: 0, visibility: "hidden" }),
  },

  menuOrderPoultry: {
    show: () =>
      gsap.to(".menu-modal-orers-poultry", {
        opacity: 1,
        visibility: "visible",
      }),
    hide: () =>
      gsap.to(".menu-modal-orers-poultry", {
        opacity: 0,
        visibility: "hidden",
      }),
  },

  clientModal: {
    show: () => gsap.to(".client-modal-form", { left: 0 }),
    hide: () => gsap.to(".client-modal-form", { left: "-100%" }),
  },

  productModal: {
    show: () => gsap.to(".product-modal", { left: 0 }),
    hide: () => gsap.to(".product-modal", { left: "-100%" }),

    itemOverlay: {
      show: (id) => {
        gsap.to(`#${id}`, {
          height: "100%",
          backgroundColor: "rgba(255, 235, 140, 0.7)",
        });
      },
      hide: (id) => {
        gsap.to(`#${id}`, {
          height: "auto",
          backgroundColor: "rgba(255,255,255,0.7)",
        });
      },
    },
  },

  errorModal: {
    show: () => {
      gsap.to(".modal-failed", { top: "50%" });
    },
    hide: () => gsap.to(".modal-failed", { top: "-100%" }),
  },

  orderModal: {
    buttonsGroup: {
      show: (id) => gsap.to(`#${id}`, { right: 0 }),
      hide: (id) => gsap.to(`#${id}`, { right: "-100%" }),
    },
    infoGroup: {
      show: (id) => gsap.to(`#${id}`, { left: 0 }),
      hide: (id) => gsap.to(`#${id}`, { left: "-100%" }),

      mark: {
        show: (id) => gsap.to(`#${id}`, { top: 0, opacity: 1 }),
        hide: (id) => gsap.to(`#${id}`, { top: "-100%", opacity: 0 }),
      },
    },
  },

  summary: {
    show: () => gsap.to(`.form__summary`, { opacity: 1 }),
    hide: () => gsap.to(`.form__summary`, { opacity: 0 }),
  },

  loader: {
    show: () =>
      gsap.to(".loader-wrapper", {
        opacity: 1,
        visibility: "visible",
        backdropFilter: "blur(10px)",
      }),
    hide: () =>
      gsap.to(".loader-wrapper", {
        opacity: 0,
        backdropFilter: "unset",
        visibility: "hidden",
      }),
  },

  editClient: {
    show: () =>
      gsap.to(".update-client-backdrop", {
        bottom: 0,
      }),
    hide: () =>
      gsap.to(".update-client-backdrop", {
        bottom: "-100%",
      }),
  },

  dialogModal: {
    show: () =>
      gsap.to(".dialog-modal__backdrop", {
        bottom: 0,
      }),
    hide: () =>
      gsap.to(".dialog-modal__backdrop", {
        bottom: "-100%",
      }),
  },

  modalRoutes: {
    show: () => gsap.to(".modal-backdrop", { right: 0 }),
    hide: () => gsap.to(".modal-backdrop", { right: "-100%" }),
  },

  stats: {
    show: () => gsap.to(".stats-payload", { translateY: "-84%" }),
    hide: () => gsap.to(".stats-payload", { translateY: 0 }),
  },

  mainMark: {
    show: () => gsap.to("#main-mark", { top: 0, opacity: 1 }),
    hide: () => gsap.to("#main-mark", { top: "-100%", opacity: 0 }),
  },

  currentUserMark: {
    show: () => gsap.to("#current-user-mark", { top: 0, opacity: 1 }),
    hide: () => gsap.to("#current-user-mark", { top: "-100%", opacity: 0 }),
  },

  orderInfo: {
    show: () =>
      gsap.to(".order-info-modal-backdrop", {
        opacity: 1,
        visibility: "visible",
      }),
    hide: () =>
      gsap.to(".order-info-modal-backdrop", {
        opacity: 0,
        visibility: "hidden",
      }),
  },
};
