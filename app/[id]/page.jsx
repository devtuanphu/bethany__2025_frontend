import React from "react";
import dynamic from "next/dynamic";

const ArticlePage = dynamic(() => import("@/components/articlePage"), {
  ssr: false,
});

export default function PageDetail() {
  return (
    <div>
      <ArticlePage />
    </div>
  );
}
