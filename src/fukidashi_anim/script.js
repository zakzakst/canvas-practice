const svgPathEl = document.querySelector(".svg path");
const path1 =
  "M24.134,271.117L314.506,50.834L788.19,191.784L668.806,578.434L143.517,557.638L24.134,271.117Z";
const path2 =
  "M84.211,130.167L81.13,533.761L741.977,556.868L755.841,121.694L419.255,46.213L84.211,130.167Z";

let currentPath = null;

const setPath = () => {
  currentPath = currentPath === path1 ? path2 : path1;
  svgPathEl.setAttribute("d", currentPath);
};

setInterval(() => {
  setPath();
}, 1000);
