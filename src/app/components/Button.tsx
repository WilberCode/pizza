
type Props = {
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    size?:'sm' |'md' | 'lg' | 'xl';
    outline?: boolean;
}

export default function Button({ className = '', disabled, children, size, outline, ...props }:Props) {
    let size_class = '';
    switch (size) {
        case "sm":
            size_class = 'px-2 py-[4px] text-sm ';
            break;
        case 'md':
            size_class = 'px-3 py-[6px] text-md ';
            break;
        case 'lg':
            size_class = 'px-3 sm:px-4 py-2 sm:py-3  text-lg';
            break; 
        case 'xl':
            size_class = ' px-5 sm:px-6 py-3 sm:py-4  text-lg sm:text-xl';
            break; 
        default:
            size_class = 'px-4 py-2 text-md ';
            break;
    }

    if (outline) {
        size_class = size_class +' border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white';
    }
    else {
        size_class = size_class +' bg-orange-600 text-white hover:bg-orange-700 border border-transparent  focus:bg-orange-700 active:bg-orange-600 focus:text-white active:text-white ';
    }
  
    return (
        <button
            {...props}
            className={
                `inline-flex items-center ${size_class} rounded-full text-center font-semibold text-base   tracking-wide  active:scale-105  transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}

        >
            {children}
        </button>
    );
}
