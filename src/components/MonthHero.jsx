import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MONTH_NAMES, MONTH_THEMES } from "../utils/calendarUtils";
import styles from "./MonthHero.module.css";

const SimpleIllustration = ({ gradient }) => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={gradient[0]} />
        <stop offset="100%" stopColor={gradient[1]} />
      </linearGradient>
    </defs>
    <rect width="400" height="220" fill="url(#g)" />
    <circle cx="320" cy="48" r="28" fill="rgba(255,255,255,0.45)" />
    <path d="M0 165 Q100 130 200 150 Q300 130 400 148 L400 220 L0 220Z" fill="rgba(0,0,0,0.25)" />
    <path d="M0 190 Q80 178 160 182 Q280 170 400 180 L400 220 L0 220Z" fill="rgba(0,0,0,0.35)" />
  </svg>
);

export default function MonthHero({ month, year, animDirection }) {
  const theme = MONTH_THEMES[month];
  const [visible, setVisible] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [sourceExt, setSourceExt] = useState("jpg");

  useEffect(() => {
    setVisible(false);
    setImageFailed(false);
    setSourceExt("jpg");
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [month]);

  const colors = [theme.palette.primary, theme.palette.secondary];
  const monthName = MONTH_NAMES[month];
  const heroSrc = `/heroes/${monthName.toLowerCase()}.${sourceExt}`;
  const monthKey = `${year}-${month}`;
  const direction = animDirection === "left" ? 1 : animDirection === "right" ? -1 : 0;

  const heroVariants = {
    initial: (dir) => ({
      opacity: 0.88,
      y: dir > 0 ? 24 : -24,
      rotateX: dir > 0 ? -12 : 12,
      scale: 0.986,
      transformOrigin: dir > 0 ? "center top" : "center bottom",
    }),
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transformOrigin: "center center",
    },
    exit: (dir) => ({
      opacity: 0.88,
      y: dir > 0 ? -18 : 18,
      rotateX: dir > 0 ? 8 : -8,
      scale: 0.99,
      transformOrigin: dir > 0 ? "center top" : "center bottom",
    }),
  };

  return (
    <div className={styles.heroStage}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={monthKey}
          className={styles.hero}
          variants={heroVariants}
          custom={direction}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.48, ease: [0.25, 0.9, 0.3, 1] }}
        >
          <motion.div
            className={`${styles.illustration} ${visible ? styles.visible : ""}`}
            initial={{ scale: 1.04, opacity: 0.35 }}
            animate={{ scale: 1, opacity: visible ? 1 : 0.35 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            {!imageFailed ? (
              <img
                src={heroSrc}
                alt={`${monthName} hero artwork`}
                className={styles.heroImage}
                onError={() => {
                  if (sourceExt === "jpg") {
                    setSourceExt("png");
                    return;
                  }
                  setImageFailed(true);
                }}
              />
            ) : (
              <SimpleIllustration gradient={colors} />
            )}
          </motion.div>
          <motion.div
            className={styles.overlay}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.06, duration: 0.38 }}
          >
            <h2 className={styles.sideMonth}>{monthName.toUpperCase()}</h2>
            <div className={styles.mood}>
              <span className={styles.moodEmoji}>{theme.emoji}</span>
              <span className={styles.moodText}>{theme.palette.mood}</span>
            </div>
            <p className={styles.description}>{year} · {theme.description}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
