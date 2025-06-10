import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        relative flex my-5 items-center justify-center
        bg-[#fee6e3] border-2 border-[#111] rounded-lg
        text-[#111] font-[Inter,sans-serif] text-[16px] leading-[24px]
        h-[48px]
        max-w-full
        select-none
        cursor-pointer
        outline-none
        active:bg-[#ffdeda]
        px-[25px]
        md:px-[40px]
        transition-colors duration-200
      "
    >
      {children}

      {/* Shadow offset layer */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute top-[-2px] left-0 w-full h-[48px]
          bg-[#111] rounded-lg
          translate-x-[4px] translate-y-[4px]
          transition-transform duration-200 ease-out
          z-[-1]
          group-hover:translate-x-0 group-hover:translate-y-0
        "
      />
    </button>
  );
};

export default Button;
