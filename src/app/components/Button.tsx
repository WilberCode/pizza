
type Props = {
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    size?:'sm' |'md' | 'lg' | 'xl';
    outline?: boolean; 
    onClick?:(e: React.MouseEvent<HTMLButtonElement>) => void 

}

export default function Button({ type="button", className = '',  disabled, children, size, outline, onClick, ...props }:Props) {
    let size_class = '';
    switch (size) {
        case "sm":
            size_class = 'px-2 py-[4px] text-sm rounded-md';
            break;
        case 'md':
            size_class = 'px-3 py-[6px] text-md rounded-lg';
            break;
        case 'lg':
            size_class = 'px-3 sm:px-4 py-2 sm:py-3  text-lg rounded-lg';
            break; 
        case 'xl':
            size_class = ' px-5 sm:px-6 py-3 sm:py-4  text-lg sm:text-xl rounded-xl';
            break; 
        default:
            size_class = 'px-4 py-2 text-md rounded-xl';
            break;
    }

    if (outline) {
        size_class = size_class +' border border-gray-300 text-gray-600 bg-white hover:bg-orange-600 hover:text-white hover:border-orange-600 focus:bg-orange-600 focus:text-white active:bg-orange-600 active:text-white ';
    }
    else {
        size_class = size_class +' bg-orange-600 text-white hover:bg-orange-700 border border-transparent  focus:bg-orange-700 active:bg-orange-600 focus:text-white active:text-white ';
    }
  
    return (
        <button
            type={type}
            {...props}
            className={
                `inline-flex items-center justify-center ${size_class}  text-center font-semibold text-base   tracking-wide  active:scale-105  transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
