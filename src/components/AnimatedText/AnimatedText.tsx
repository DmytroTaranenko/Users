import { motion } from 'framer-motion'
import css from './AnimatedText.module.css'
import { useState } from 'react'
function AnimatedText() {
    const [startAnimation, setStartAnimation] = useState(false)

    const text = 'Welcome to my PET project :)'

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const letterVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <>
            <motion.h2 variants={containerVariants} initial="hidden" animate="visible" className={css.animated}>
                {text.split('').map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                        {char}
                    </motion.span>
                ))}
            </motion.h2>
        </>
    )
}

export default AnimatedText
