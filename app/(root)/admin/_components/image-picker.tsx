import React, { ChangeEvent, useState } from 'react';
import { ImageUp } from "lucide-react";
import Image from "next/image";

interface ImagePickerProps {
  images: { id: string; src: string }[]; // Bilder ska ha både id och src
  setSelectedImages: (files: File[]) => void; // Hantering av valda bilder
  setImageSrcs: (srcs: string[]) => void; // Hantering av bildens src-strängar
}

export const ImagePicker = ({ images, setSelectedImages, setImageSrcs }: ImagePickerProps): JSX.Element => {
  const [previewImages, setPreviewImages] = useState<{ id: string; src: string }[]>(images);

  const setImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const filesArray = Array.from(e.target.files);
    const newPreviewImages: { id: string; src: string }[] = [];
    const newSelectedImages: File[] = [];
    const fileReaders: Promise<void>[] = [];

    filesArray.forEach((file, index) => {
      const reader = new FileReader();
      const readerPromise = new Promise<void>((resolve) => {
        reader.onload = (x) => {
          if (x.target && x.target.result) {
            // Skapa ett nytt objekt med både id och src för förhandsvisning
            newPreviewImages.push({ id: `${file.name}-${index}`, src: x.target.result as string });
          }
          resolve();
        };
      });
      reader.readAsDataURL(file); // Läs filen som en Data URL (base64)
      fileReaders.push(readerPromise);
      newSelectedImages.push(file); // Lägg till den nya filen i listan
    });

    Promise.all(fileReaders).then(() => {
      // Uppdatera preview-bilder och den nya listan
      const updatedPreviewImages = [...previewImages, ...newPreviewImages];
      setPreviewImages(updatedPreviewImages);

      // Uppdatera src-listan för bilder
      const updatedImageSrcs = [...newPreviewImages.map((image) => image.src)];
      setImageSrcs(updatedImageSrcs);

      // Uppdatera valda filer
      setSelectedImages([...newSelectedImages]);
    });
  };

  return (
    <>
      {previewImages.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {previewImages.map((image) => (
            <div key={image.id} className="border rounded aspect-square max-w-[200px] mx-auto overflow-hidden">
              <Image
                alt={`image ${image.id}`}
                src={image.src} // Se till att vi använder src
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
          <button className="mt-4">
            <label htmlFor="image">Lägg till bild</label>
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center border-2 border-dashed rounded hover:bg-slate-50/10 cursor-pointer">
          <label htmlFor="image">
            <ImageUp className="size-20 text-muted-foreground" />
            <p>Ladda upp bilder</p>
          </label>
        </div>
      )}
      <input type="file" id="image" className="hidden" onChange={setImages} multiple />
    </>
  );
};
