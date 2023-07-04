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
            left-2
            top-5
            text-foreground
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
          bg-background
          p-2 
          pt-4 
          font-light
         text-foreground
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : ""}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-accent"}
        `}
      />
      <label
        className={`
          text-md
          z-5 
          absolute
          top-5
          origin-[0] 
          -translate-y-3 
          transform 
          text-muted-foreground
          duration-150 
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:scale-100 
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${errors[id] ? "text-rose-500" : ""}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
