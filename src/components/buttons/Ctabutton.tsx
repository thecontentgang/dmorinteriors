import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

interface CtaButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: 'navy' | 'brand' | 'cream';
  size?: 'sm' | 'md' | 'lg'; // Added size property
  type?: 'button' | 'submit' | 'reset';
}

const CtaButton: React.FC<CtaButtonProps> = ({ 
  text, 
  onClick, 
  className = "", 
  variant = 'navy', 
  size = 'md', // Default remains your exact original size
  type = 'button' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Recreating the 'jello-vertical' CSS keyframes in Framer Motion
  const jelloVariants: Variants = {
    rest: { scaleX: 1, scaleY: 1 },
    hover: {
      scaleX: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
      scaleY: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
      transition: {
        duration: 0.9,
        ease: "easeInOut",
        times: [0, 0.3, 0.4, 0.5, 0.65, 0.75, 1]
      }
    }
  };

  // Theming classes mapped directly to your Global Design System
  const getThemeClasses = () => {
    switch (variant) {
      case 'brand':
        return 'bg-brand border-brand-light text-navy hover:bg-brand-dark hover:border-white';
      case 'cream':
        return 'bg-cream border-brand text-navy hover:bg-white hover:border-brand-dark';
      case 'navy':
      default:
        return 'bg-navy border-brand-light text-cream hover:bg-black hover:border-brand';
    }
  };

  // Sizing dictionary to scale the button structure, text, and SVG icon seamlessly
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          button: 'gap-2 px-5 py-2.5 border-[4px]',
          text: 'text-lg lg:text-xl',
          svg: 'w-7 h-4 lg:w-8 lg:h-5'
        };
      case 'lg':
        return {
          button: 'gap-4 px-10 py-5 border-[8px]',
          text: 'text-4xl lg:text-5xl',
          svg: 'w-12 h-7 lg:w-14 lg:h-9'
        };
      case 'md':
      default:
        // These are your EXACT original classes to ensure nothing changes by default
        return {
          button: 'gap-3 px-8 py-4 border-[6px]',
          text: 'text-2xl lg:text-3xl',
          svg: 'w-10 h-6 lg:w-12 lg:h-7'
        };
    }
  };

  const sizes = getSizeClasses();

  return (
    <motion.button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      // Combining structural styling with your design system variables and sizes
      className={`
        relative flex items-center justify-center rounded-full cursor-pointer 
        transition-colors duration-300 shadow-sm hover:shadow-lg
        ${getThemeClasses()}
        ${sizes.button}
        ${className}
      `}
    >
      {/* Text using your Dream Orphans primary font */}
      <span className={`font-primary tracking-wide pt-1 ${sizes.text}`}>
        {text}
      </span>

      {/* Animated SVG wrapper */}
      <motion.span
        className="flex items-center h-full w-fit pt-1 origin-left"
        variants={jelloVariants}
        animate={isHovered ? "hover" : "rest"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="20"
          viewBox="0 0 38 15"
          fill="none"
          className={sizes.svg}
        >
          <path
            fill="currentColor"
            d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
          ></path>
        </svg>
      </motion.span>
    </motion.button>
  );
};

export default CtaButton;