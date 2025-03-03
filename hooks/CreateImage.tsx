import NextImage from "next/image";
import { JSX } from "react";

type imageOptions = {
  font: string;
  fillStyle: string;
  textX: number;
  textY: number;
  fontWeight?: string;
  rotation?: number;
  tiltX?: number;
  tiltY?: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  opacity?: number;
};
type finishedImageTypes = {
  options?: imageOptions;
  mainImage: string;
  text: string;
  fgImgUrl: string;
};

export default function CreateFinishedImage({
  options,
  mainImage,
  text,
  fgImgUrl,
}: finishedImageTypes): JSX.Element {
  //main image is background
  //bgImage
  const {
    fontSize = "120",
    fillStyle = "white",
    textX = 0,
    textY = -5,
    fontWeight = 600,
  } = options || {};
  const bgImg = new Image();

  bgImg.crossOrigin = "anonymous";
  const canvas = document.createElement("canvas");
  canvas.width = bgImg.width;
  canvas.height = bgImg.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return <div>Error creating context</div>;

  bgImg.src = mainImage;
  // 2. Draw the original image (background)
  ctx.drawImage(bgImg, 0, 0);

  // 3. Draw text on top of the background

  ctx.fillStyle = fillStyle;
  ctx.fillText(text, textX, textY);

  // 4. Create a second canvas for the foreground
  const fgImg = new Image();
  const fgCanvas = document.createElement("canvas");
  fgCanvas.width = fgImg.width;
  fgCanvas.height = fgImg.height;
  const fgCtx = fgCanvas.getContext("2d");
  if (!fgCtx) return <div>Error creating FGcontext</div>;

  // 5. Draw the original image on the foreground canvas
  fgCtx.drawImage(fgImg, 0, 0);

  // 6. Read pixel data from the foreground canvas
  //const imageData = fgCtx.getImageData(0, 0, fgCanvas.width, fgCanvas.height);
  //const data = imageData.data; // RGBA array

  // 7. Put updated pixel data back into the foreground canvas
  //fgCtx.putImageData(imageData, 0, 0);
  fgImg.src = fgImgUrl;

  // 8. Draw the masked foreground on top of the main canvas
  //ctx.drawImage(fgCanvas, 0, 0);

  // Now `canvas` has the final composited image
  return (
    <div className="min-h-[300px] h-full w-[80%] p-4   rounded-lg relative overflow-hidden flex">
      <NextImage
        src={mainImage}
        alt="background"
        fill
        objectFit="contain"
        objectPosition="center"
        className=" rounded-lg"
      />

      <div
        style={{
          position: "absolute",
          top: `${50 + (textY ?? 50)}%`,
          left: `${50 - (textX ?? 50)}%`,
          transform: `
        translate(-50%, -50%) 
        rotate(${options?.rotation ?? 0}deg)
        perspective(1000px)
        rotateX(${options?.tiltX ?? 0}deg)
        rotateY(${options?.tiltY ?? 0}deg)
        `,
          color: options?.color ?? "inherit",
          textAlign: "center",

          fontSize: fontSize ? `${fontSize}px` : 70,
          fontWeight: fontWeight,
          fontFamily: options?.fontFamily,
          opacity: options?.opacity,
          transformStyle: "preserve-3d",
        }}
        className="z-10  w-full"
      >
        {text ? text : "Mahad"}
      </div>

      <NextImage
        src={fgImgUrl}
        alt="background"
        fill
        objectFit="contain"
        className="!absolute z-20  w-full min-h-full rounded-lg overflow-hidden"
        objectPosition="center"
      />
    </div>
  );
}
