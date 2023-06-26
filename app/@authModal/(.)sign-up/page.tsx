"use client";
import { FC, useEffect } from "react";

import { usePathname } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";
const page: FC = () => {
  const pathname = usePathname();
  const registerModal = useRegisterModal();

  useEffect(() => {
    if (pathname == "/sign-up" && !registerModal.isOpen) {
      registerModal.onOpen();
    }
    return () => registerModal.onClose();
  }, [pathname]);

  return null;
};

export default page;
