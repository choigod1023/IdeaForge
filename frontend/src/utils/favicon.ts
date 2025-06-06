export const setFavicon = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 그라데이션 배경
  const gradient = ctx.createLinearGradient(0, 0, 32, 32);
  gradient.addColorStop(0, "#4f46e5"); // indigo-600
  gradient.addColorStop(1, "#6366f1"); // indigo-500
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  // 텍스트
  ctx.fillStyle = "white";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("IF", 16, 16);

  // 파비콘 설정
  const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (link) {
    link.href = canvas.toDataURL();
  } else {
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.href = canvas.toDataURL();
    document.head.appendChild(newLink);
  }
};
