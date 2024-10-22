import React, { ChangeEvent, useState } from 'react';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';

interface ImagePickerProps {
  images?: string[]; // En array av bildkällor (src)
  setSelectedImages: (files: File[]) => void; // Hantering av valda bilder (filer)
  setImageSrcs: (srcs: string[]) => void; // Hantering av bildens src-strängar
}

export const ImagePicker = ({ images = [], setSelectedImages, setImageSrcs }: ImagePickerProps): JSX.Element => {
  const [previewImages, setPreviewImages] = useState<string[]>(images);

  const setImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const filesArray = Array.from(e.target.files); // Omvandla FileList till en array av File-objekt
    const newSelectedImages: File[] = []; // För nya valda bilder
    const newImageSrcs: string[] = []; // För de nya src-strängarna (förhandsgranskning)
    const fileReaders: Promise<void>[] = [];

    // Läs varje fil och skapa förhandsgranskningsbilder
    filesArray.forEach((file, index) => {
      const reader = new FileReader();
      const readerPromise = new Promise<void>((resolve) => {
        reader.onload = (x) => {
          if (x.target && x.target.result) {
            newImageSrcs.push(x.target.result as string); // Lägg till bildens src
          }
          resolve();
        };
      });
      reader.readAsDataURL(file); // Läs filen som en Data URL (base64)
      fileReaders.push(readerPromise);
      newSelectedImages.push(file); // Lägg till filen i listan över valda filer
    });

    Promise.all(fileReaders).then(() => {
      // Kombinera gamla och nya förhandsgranskningsbilder
      const updatedImageSrcs = [...previewImages, ...newImageSrcs];
      setPreviewImages(updatedImageSrcs); // Uppdatera lokalt state för förhandsgranskning

      // Skicka kombinerad lista till props-funktioner
      setImageSrcs([...images, ...newImageSrcs]); // Uppdatera src-strängarna
      setSelectedImages([...newSelectedImages]); // Uppdatera valda filer
    });
  };

  return (
    <>
      {previewImages.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {previewImages.map((src, index) => (
            <div key={index} className="border rounded aspect-square max-w-[200px] mx-auto overflow-hidden">
              <Image
                alt={`image ${index}`}
                src={src} // Visa förhandsgranskningen med src
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
