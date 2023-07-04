"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { Button } from "../ui/Button";
import { ImagePlus, Trash } from "lucide-react";

declare global {
  var cloudinary: any;
}

const uploadPreset = "wnzax6of";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;

  value: string[] | string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, disabled, onRemove }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {typeof value === "string" ? (
          <div key={value} className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
            <div className="absolute right-2 top-2 z-10">
              <Button type="button" onClick={() => onRemove(value)} variant="destructive" size="sm">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={value} />
          </div>
        ) : (
          value.map((url) => (
            <div key={url} className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
              <div className="absolute right-2 top-2 z-10">
                <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image fill className="object-cover" alt="Image" src={url} />
            </div>
          ))
        )}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset={uploadPreset}>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
