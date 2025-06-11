import { motion } from 'framer-motion';
import { Card, type CardProps } from '@mui/material';

export default function MotionCard(props: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card {...props} />
    </motion.div>
  );
}
