"use client";

import CheckList from "@/components/UI/CheckList/CheckList";
import React, { useState } from "react";

const page = () => {
  const [isCompleted, setIsCompleted] = useState(true);
  const handleClick = () => {
    setIsCompleted(!isCompleted);
  };
  return (
    <div className="w-100">
      <CheckList
        name="할 일 제목가가가가가가가가가가각가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가"
        isCompleted={isCompleted}
        onClick={handleClick}
      />
    </div>
  );
};

export default page;
