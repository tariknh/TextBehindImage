"use client";

import CreateFinishedImage from "@/hooks/CreateImage";

import { removeBackground } from "@imgly/background-removal";
import { useEffect, useState } from "react";
type imagesrc = ImageData | ArrayBuffer | Uint8Array | Blob | URL | string;

type TextBehindPhotoTypes = {
  file: File[] | null;
  text: string;
};

export function TextBehindPhoto({ file, text }: TextBehindPhotoTypes) {
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [noBackgroundUrl, setNoBackgroundUrl] = useState<string>("");
  const [withBackgroundUrl, setwithBackgroundUrl] = useState<string>("");
  const [canvasRef, setCanvasRef] = useState(null);

  useEffect(() => {
    handleFileChange(file);
  }, [file]);

  const handleFileChange = async (inputFile: File[] | null) => {
    setIsLoading(true);
    if (!inputFile) return console.log("No inputfile");
    const file = inputFile[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      console.log(reader, "SEGMENTED IMAGE");

      const imageBlob = await removeBackground(file as imagesrc);
      const fgURL = await URL.createObjectURL(imageBlob);
      const bgURL = await URL.createObjectURL(file);
      setIsLoading(false);
      setNoBackgroundUrl(fgURL);
      setwithBackgroundUrl(bgURL);
    } else {
      setPreview("");
    }
  };

  // const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
  //   setIsLoading(true);
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);

  //     console.log(reader, "SEGMENTED IMAGE");

  //     const imageBlob = await removeBackground(file as imagesrc);
  //     const fgURL = await URL.createObjectURL(imageBlob);
  //     const bgURL = await URL.createObjectURL(file);
  //     setIsLoading(false);
  //     setNoBackgroundUrl(fgURL);
  //     setwithBackgroundUrl(bgURL);
  //   } else {
  //     setPreview("");
  //   }
  // };

  return (
    <div className="h-full gap-4 overflow-hidden">
      {/* <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        accept="image/*"
        className=" rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-background text-neutral-700 font-medium gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] cursor-pointer text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onChange={handleFileChange}
      /> */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-4 flex flex-col  h-full">
          {/* <Image
            src={preview || "/placeholder.svg"}
            alt="Preview"
            width={2000}
            height={2000}
            className="rounded-md object-cover "
          /> */}
          {withBackgroundUrl && noBackgroundUrl ? (
            <CreateFinishedImage
              mainImage={withBackgroundUrl}
              text={text}
              fgImgUrl={noBackgroundUrl}
            />
          ) : (
            <div>No image</div>
          )}
        </div>
      )}
    </div>
  );
}
