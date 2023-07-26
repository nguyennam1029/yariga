import React from "react";

type HeadingProps = {
  text?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

const Heading: React.FC<HeadingProps> = ({
  text = "Property",
  level = "h1",
  className,
}) => {
  const HeadingTag = level;

  return (
    <HeadingTag
      className={`font-bold text-[25px] text-primaryText ${className}`}
    >
      {text}
    </HeadingTag>
  );
};

export default Heading;
