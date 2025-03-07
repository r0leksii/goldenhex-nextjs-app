// Declare the WOW type on the global Window interface
declare global {
  interface Window {
    WOW: any;
  }
}

export const animationCreate = () => {
  if (typeof window !== "undefined" && typeof window.WOW === "function") {
    // Use the globally available WOW constructor from the CDN
    const wow = new window.WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: false, // disables sync requirement
    });

    wow.init();
  }
};
