import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={
        twMerge(`
          w-full 
          rounded-full 
          bg-green-500
          border
          border-transparent
          px-3 
          py-3 
          disabled:cursor-not-allowed 
          disabled:opacity-50
          text-black
          font-bold
          hover:opacity-75
          transition
        `,
        className
      )
      }
      {...props}
    >
      {children}
    </button>
  );
}
 
export default Button;