import React from "react";

const Button = ({ children, onClick, disabled = false }) => {
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
        disabled={disabled}
        className={`
  relative flex items-center justify-center
  border-2 border-[#111] rounded-lg
  font-[Inter,sans-serif] text-[16px] leading-[24px]
  h-[48px] px-[25px] md:px-[40px]
  select-none outline-none
  transition-colors duration-200 mb-2
  ${disabled ? 'bg-gray-400 text-white opacity-50 cursor-not-allowed' : 'bg-[#FE7743] text-[#111] cursor-pointer active:bg-[#ffdeda]'}
`}

      >
        {children}
      </button>
    </div>
  );
};

export default Button;
