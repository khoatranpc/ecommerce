'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
    isScreen?: boolean;
    className?: string;
}
const Loading = (props: Props) => {
    return (
        <div className={`${props.isScreen ? 'fixed bg-white/80' : ''} inset-0  backdrop-blur-sm flex items-center justify-center z-50 ${props.className ?? ''}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -inset-4 bg-blue-100/50 rounded-full blur-xl"
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="relative"
                >
                    <Image
                        src="/static/logo-short.png"
                        alt="Loading"
                        width={60}
                        height={60}
                        className="w-auto h-auto"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Loading;