"use client";

import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegisterReturn;
}

const Input: React.FC<InputProps> = ({ id, label, type = "text", disabled, formatPrice, register, required, errors }) => {
  return (
    <div className="relative w-auto">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            absolute
            top-5
            left-2
            text-slate-400
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          rounded-md
          border-2 
          bg-white
          p-2 
          pt-4 
          font-light
          text-slate-800
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
          text-md
          absolute 
          top-5
          z-10 
          origin-[0] 
          -translate-y-3 
          transform 
          text-slate-400 
          duration-150 
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:scale-100 
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
