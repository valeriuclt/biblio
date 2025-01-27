"use client";

import {
  IKImage,
  IKUpload,
  IKVideo,
  ImageKitContext,
  ImageKitProvider,
} from "imagekitio-next";
import config from "@/lib/config";
import ImageKit from "imagekit";
import { useRef,useState } from "react";
import Image from "next/image";
// import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const ImageUpload = (
  // {
//   type,
//   accept,
//   placeholder,
//   folder,
//   variant,
//   onFileChange,
//   value,
// }: Props
) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath:  null,
  });
  const [progress, setProgress] = useState(0);

//   const styles = {
//     button:
//       variant === "dark"
//         ? "bg-dark-300"
//         : "bg-light-600 border-gray-100 border",
//     placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
//     text: variant === "dark" ? "text-light-100" : "text-dark-400",
//   };


  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
    <IKUpload  ref={ikUploadRef} />
    
    </ImageKitProvider>
  );
};
export default ImageUpload;
