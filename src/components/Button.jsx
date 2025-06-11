import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <div className="relative inline-flex group">
      {/* Shadow Offset Layer outside button */}
      <span
        aria-hidden="true"
        className="
          absolute top-[-2px] left-0 w-full h-[48px]
          bg-[#111] rounded-lg
          transition-transform duration-200 ease-out
          group-hover:translate-x-0 group-hover:translate-y-0
        "
        style={{
          transform: 'translate(4px, 4px)',
          zIndex: -1,
        }}
      />

      <button
        type="button"
        onClick={onClick}
        className="
          relative flex items-center justify-center
          bg-[#FE7743] border-2 border-[#111] rounded-lg
          text-[#111] font-[Inter,sans-serif] text-[16px] leading-[24px]
          h-[48px] px-[25px] md:px-[40px]
          select-none cursor-pointer outline-none
          active:bg-[#ffdeda] transition-colors duration-200
        "
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
