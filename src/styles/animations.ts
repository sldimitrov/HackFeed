// src/styles/animations.ts

export const postCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export const postCardTransition = {
    duration: 0.3,
    ease: 'easeOut',
};

export const postContainerVariants = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};
