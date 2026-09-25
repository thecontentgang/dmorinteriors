import React from "react";
import { motion } from "framer-motion";

interface SliceTransitionProps {
    children: React.ReactNode;
}

const SliceTransition: React.FC<SliceTransitionProps> = ({ children }) => {
    // The number of slices to divide the screen into (Matches the Codrops demo)
    const columns = 10;

    return (
        <>
            {children}

            {/* 
        THE SLICE OVERLAY
        This sits on top of your content with z-[9999]. 
        It ignores pointer events so it doesn't block clicks when hidden.
      */}
            <div className="fixed inset-0 pointer-events-none z-[9999] flex w-full h-screen">
                {Array.from({ length: columns }).map((_, i) => (
                    <motion.div
                        key={i}
                        // We use your brand's dark navy color for the transition
                        // The subtle right border gives it the physical "sliced" look from the demo
                        className="flex-1 h-full bg-navy border-r border-white/5 last:border-r-0"

                        // 1. Initial State (When page first mounts, slices cover the screen)
                        initial={{ scaleY: 1, transformOrigin: "bottom" }}

                        // 2. Animate State (Slices shrink towards the bottom to reveal the new page)
                        animate={{ scaleY: 0, transformOrigin: "bottom" }}

                        // 3. Exit State (When leaving the page, slices grow from the top to cover it)
                        exit={{ scaleY: 1, transformOrigin: "top" }}

                        transition={{
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1], // A highly cinematic Expo InOut easing
                            delay: i * 0.05,          // Staggers the slices from left to right
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default SliceTransition;