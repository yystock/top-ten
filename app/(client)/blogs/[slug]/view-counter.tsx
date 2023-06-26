"use client";

import { useEffect } from "react";
import useSWR from "swr";

type ReportViewProps = {
  blogId: string;
};

export const ReportView: React.FC<ReportViewProps> = ({ blogId }) => {
  useEffect(() => {
    fetch(`/api/views/${blogId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId }),
    });
  }, [blogId]);

  return null;
};
