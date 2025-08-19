"use client";
import { Typography } from "@/components/UI/Typography";
import React from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-4xl animate-bounce">😭</div>
      <Typography variant="h1">{error.message}</Typography>
      <button onClick={reset} className="cursor-pointer">
        홈 화면으로 돌아가기
      </button>
    </div>
  );
};

export default Error;
