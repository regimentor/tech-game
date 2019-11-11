export default function createCanvas(id: string = "game-screen") {
  const canvas = document.createElement("canvas");
  canvas.width = document.documentElement.clientWidth - 30;
  canvas.height = document.documentElement.clientHeight - 30;
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  canvas.style.margin = "0px";
  canvas.style.padding = "0px";
  canvas.style.border = "3px solid #ddd";
  canvas.id = id;

  window.onresize = () => {
    canvas.width = document.documentElement.clientWidth - 30;
    canvas.height = document.documentElement.clientHeight - 30;
  };

  return canvas;
}
