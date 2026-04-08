import { DAY_NAMES, MONTH_THEMES, buildCalendarGrid, dateToNum, getDaysInMonth, getHoliday, isInRange, isSameDay, isToday, isWeekend } from "../utils/calendarUtils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function CalendarBoard({
  currentYear,
  currentMonth,
  wallView,
  monthNotes,
  selectionStart,
  selectionEnd,
  confirmedEnd,
  animDirection,
  prevMonth,
  nextMonth,
  goToToday,
  handleDayClick,
  handleDayHover,
  setHoverDate,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const cells = buildCalendarGrid(currentYear, currentMonth);
  const theme = MONTH_THEMES[currentMonth];
  const monthKey = `${currentYear}-${currentMonth}`;
  const direction = animDirection === "left" ? 1 : animDirection === "right" ? -1 : 0;
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const notedDays = useMemo(() => {
    const marked = new Set();

    for (const { key } of monthNotes || []) {
      const [startRaw, endRaw] = key.split("__");
      const startParts = startRaw.split("-").map(Number);
      const start = { year: startParts[0], month: startParts[1], day: startParts[2] };

      if (!endRaw) {
        if (start.year === currentYear && start.month === currentMonth) {
          marked.add(start.day);
        }
        continue;
      }

      const endParts = endRaw.split("-").map(Number);
      const end = { year: endParts[0], month: endParts[1], day: endParts[2] };
      const low = Math.min(dateToNum(start), dateToNum(end));
      const high = Math.max(dateToNum(start), dateToNum(end));

      for (let day = 1; day <= daysInMonth; day += 1) {
        const probe = dateToNum({ year: currentYear, month: currentMonth, day });
        if (probe >= low && probe <= high) marked.add(day);
      }
    }

    return marked;
  }, [monthNotes, currentYear, currentMonth, daysInMonth]);

  const pageVariants = {
    initial: (dir) => {
      return {
        opacity: 0.9,
        y: isMobile ? (dir > 0 ? 22 : -22) : 0,
        rotateX: dir > 0 ? -14 : 14,
        scale: 0.985,
        transformOrigin: dir > 0 ? "center top" : "center bottom",
      };
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      transformOrigin: "center center",
    },
    exit: (dir) => {
      return {
        opacity: 0.9,
        y: isMobile ? (dir > 0 ? -18 : 18) : 0,
        rotateX: dir > 0 ? 9 : -9,
        scale: 0.988,
        transformOrigin: dir > 0 ? "center top" : "center bottom",
      };
    },
  };

  return (
    <div className="calendar-flip-stage">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={monthKey}
          className="calendar-paper"
          style={{ "--theme-primary": theme.palette.primary }}
          variants={pageVariants}
          custom={direction}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.25, 0.9, 0.3, 1] }}
        >
        {direction !== 0 && (
          <motion.div
            className={`calendar-page-curl ${direction > 0 ? "curl-top" : "curl-bottom"}`}
            initial={{ opacity: 0, scaleY: 0.35 }}
            animate={{ opacity: [0, 0.4, 0], scaleY: [0.35, 1, 0.2] }}
            transition={{ duration: 0.5, times: [0, 0.45, 1], ease: "easeInOut" }}
          />
        )}
        <header className="calendar-toolbar">
          <h1>
            {theme.emoji} {currentMonth + 1}/{currentYear}
          </h1>
          <div className="toolbar-buttons">
            <button onClick={prevMonth} type="button">Prev</button>
            <button onClick={goToToday} type="button">Today</button>
            <button onClick={nextMonth} type="button">Next</button>
          </div>
        </header>
        <div className="calendar-grid weekday-row">
          {DAY_NAMES.map((d) => (
            <div key={d} className="weekday-cell">
              {d}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {cells.map((cell, index) => {
            const date = { year: currentYear, month: currentMonth, day: cell.day };
            const holiday = cell.isCurrentMonth ? getHoliday(currentMonth, cell.day) : null;
            const dayOfWeek = index % 7;
            const weekend = isWeekend(dayOfWeek);
            const start = isSameDay(date, selectionStart);
            const end = isSameDay(date, selectionEnd);
            const inRange = isInRange(date, selectionStart, selectionEnd);
            const today = isToday(date);
            const hasNote = cell.isCurrentMonth && notedDays.has(cell.day);
            return (
              <motion.button
                key={`${cell.day}-${index}`}
                type="button"
                onClick={() => handleDayClick(cell)}
                onMouseEnter={() => handleDayHover(cell)}
                onMouseLeave={() => setHoverDate(null)}
                className={[
                  "day-cell",
                  cell.isCurrentMonth ? "in-month" : "out-month",
                  weekend && cell.isCurrentMonth ? "weekend" : "",
                  start ? "range-start" : "",
                  end && confirmedEnd ? "range-end" : "",
                  inRange ? "in-range" : "",
                  today && cell.isCurrentMonth ? "today" : "",
                  hasNote ? "has-note" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                whileHover={cell.isCurrentMonth ? { y: -2, scale: 1.03 } : undefined}
                whileTap={cell.isCurrentMonth ? { scale: 0.95 } : undefined}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
              >
                <span>{cell.day}</span>
                {hasNote ? <i className="note-dot" aria-hidden /> : null}
                {holiday ? <small title={holiday.name}>{holiday.emoji}</small> : null}
              </motion.button>
            );
          })}
        </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
