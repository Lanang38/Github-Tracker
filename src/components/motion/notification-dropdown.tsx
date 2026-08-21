'use client';

import { motion, AnimatePresence } from 'motion/react';

interface NotificationDropdownProps {
  open: boolean;
  title: string;
  message: string;
}

export function NotificationDropdown({
  open,
  title,
  message,
}: NotificationDropdownProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: -8,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -6,
            scale: 0.98,
          }}
          transition={{
            duration: 0.18,
            ease: 'easeOut',
          }}
          className="
            absolute right-0 top-full z-50 mt-2
            w-72 origin-top-right
            rounded-xl
            border border-neutral-200
            bg-white
            p-4
            shadow-lg
            dark:border-neutral-800
            dark:bg-neutral-900
          "
        >
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            {title}
          </p>

          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
