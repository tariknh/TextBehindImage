"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { TextBehindPhoto } from "@/components/custom/imageupload";
import FileUploadDropzone from "@/components/FileUpload";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

export default function Page() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col min-h-0 gap-4 p-4">
              <div className="grid grid-rows-3 h-full max-h-[90vh]  gap-4 md:grid-cols-3">
                <div className="p-4 flex flex-col gap-4 row-span-2">
                  <h1 className=" text-7xl font-medium">Upload photo</h1>
                  <h2 className="text-zinc-500">
                    Upload a photo below and start editing
                  </h2>
                  <FileUploadDropzone value={files} onValueChange={setFiles} />
                  <div className="flex gap-4">
                    <Button className="w-full" onClick={() => setFiles([])}>
                      Download image
                    </Button>
                    <Button
                      className="w-full bg-red-500 text-white"
                      onClick={() => setFiles([])}
                    >
                      Remove image
                    </Button>
                  </div>
                </div>
                <div className="col-span-2 row-span-2 h-full  rounded-xl bg-transparent ">
                  {/* {files?.map((file, i) => (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      height={40}
                      width={40}
                      className="h-full w-full bg-transparent overflow-hidden   rounded-md object-contain"
                      key={i}
                    />
                  ))} */}
                  {files?.length > 0 && <TextBehindPhoto file={files} />}
                </div>
                <div className="p-4 rounded-xl row-start-3   bg-muted/50"></div>
                <div className=" rounded-xl row-start-3  bg-muted/50" />
                <div className=" rounded-xl row-start-3  bg-muted/50" />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
