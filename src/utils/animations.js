import gsap from "gsap";

export class Animations {
  constructor(ref) {
    this.ref = ref;
  }

  modal = {
    show: () => gsap.to(this.ref.modal, { left: 0 }),
    hide: () => gsap.to(this.ref.modal, { left: "-100%" }),

    footer: {
      show: () =>
        gsap.to(this.ref.footer, {
          bottom: 0,
          onComplete: () => gsap.to(this.ref.list, { paddingBottom: 50 }),
        }),
      hide: () =>
        gsap.to(this.ref.footer, {
          bottom: "-100%",
          onStart: () => gsap.to(this.ref.list, { paddingBottom: 0 }),
        }),
    },

    item: {
      overlay: {
        show: (id) => {
          gsap.to(this.ref.current[id], {
            height: "100%",
            backgroundColor: "rgba(135, 255, 175, 0.7)",
          });
        },
        hide: (id) => {
          gsap.to(this.ref.current[id], {
            height: "auto",
            backgroundColor: "rgba(255,255,255,0.7)",
          });
        },
      },
    },
  };
  summary = {
    show: () => gsap.to(this.ref.wrapper, { left: 0 }),
    hide: () => gsap.to(this.ref.wrapper, { left: "calc(-100% - 20px)" }),
  };

  historyButtons = {
    show: () => gsap.to(this.ref.wrapper, { bottom: 0, opacity: 1 }),
    hide: () => gsap.to(this.ref.wrapper, { bottom: "-100%", opacity: 0 }),

    order: {
      show: () => gsap.to(this.ref.order, { bottom: 0, opacity: 1 }),
      hide: () => gsap.to(this.ref.order, { bottom: "-100%", opacity: 0 }),
    },
  };

  client = {
    modal: {
      show: () => gsap.to(".client-modal-form", { left: 0 }),
      hide: () => gsap.to(".client-modal-form", { left: "-100%" }),
    },
  };

  menu = {
    popup: {
      show: () =>
        gsap.to(".menu-backdrop", { opacity: 1, visibility: "visible" }),
      hide: () =>
        gsap.to(".menu-backdrop", { opacity: 0, visibility: "hidden" }),
    },
  };

  loader = {
    show: () =>
      gsap.to(this.ref, {
        opacity: 1,
        visibility: "visible",
        backdropFilter: "blur(10px)",
      }),
    hide: () =>
      gsap.to(this.ref, {
        opacity: 0,
        backdropFilter: "unset",
        visibility: "hidden",
      }),
  };

  errorModal = {
    show: () => {
      gsap.to(this.ref, { top: "50%" });
    },
    hide: () => gsap.to(this.ref, { top: "-100%" }),
  };
}
