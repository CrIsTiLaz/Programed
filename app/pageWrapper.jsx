import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const PageWrapper = ({ children }) => {
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ delay: 0.2 }}>
                    {children}
                </motion.div>
            </AnimatePresence >
        </>
    )
}

export default PageWrapper