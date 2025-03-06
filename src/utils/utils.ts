import { WOW } from "wowjs";

declare global {
  interface Window {
    wow: InstanceType<typeof WOW>;
  }
}

export const animationCreate = () => {
  if (typeof window !== "undefined") {
    const WOW = require("wowjs");

    window.wow = new WOW.WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: false,
    });

    window.wow.init();
  }
};
