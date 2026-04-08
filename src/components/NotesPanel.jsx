import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MONTH_NAMES, daysBetween, formatDateRange } from "../utils/calendarUtils";
import styles from "./NotesPanel.module.css";

export default function NotesPanel({
  selectionStart,
  confirmedEnd,
  currentMonth,
  currentYear,
  getNoteForSelection,
  saveNote,
  deleteNoteByKey,
  getMonthNotes,
  clearSelection,
}) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef(null);
  const selectionKey = selectionStart
    ? `${selectionStart.year}-${selectionStart.month}-${selectionStart.day}__${confirmedEnd ? `${confirmedEnd.year}-${confirmedEnd.month}-${confirmedEnd.day}` : ""}`
    : null;

  useEffect(() => {
    if (selectionStart) {
      setText(getNoteForSelection());
      setSaved(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [selectionKey, selectionStart, getNoteForSelection]);

  const handleSave = () => {
    saveNote(text);
    setSaved(true);
    setText("");
    clearSelection();
    setTimeout(() => setSaved(false), 1600);
  };

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault();
      handleSave();
    }
  };

  const monthNotes = getMonthNotes();
  const days = daysBetween(selectionStart, confirmedEnd);
  const rangeDisplay = formatDateRange(selectionStart, confirmedEnd);

  return (
    <motion.div
      className={styles.panel}
      initial={{ opacity: 0, x: 26, rotateY: -13, scale: 0.985 }}
      animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
    >
      <div className={styles.panelHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>✦</span>
          <h3 className={styles.panelTitle}>Notes</h3>
        </div>
        <span className={styles.monthTag}>
          {MONTH_NAMES[currentMonth].slice(0, 3)} {currentYear}
        </span>
      </div>

      <div className={styles.noteArea}>
        <AnimatePresence mode="wait">
          {selectionStart ? (
            <motion.div
              key="note-editor"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.selectionBadge}>
              <div className={styles.badgeLeft}>
                <span className={styles.rangeIcon}>◈</span>
                <span className={styles.rangeText}>{rangeDisplay}</span>
              </div>
              <div className={styles.badgeRight}>
                {days > 0 && (
                  <span className={styles.dayCount}>
                    {days} day{days !== 1 ? "s" : ""}
                  </span>
                )}
                <button className={styles.clearBtn} onClick={clearSelection} title="Clear selection">
                  ×
                </button>
              </div>
              </div>

              <div className={styles.textareaWrap}>
                <textarea
                  ref={textareaRef}
                  className={styles.textarea}
                  value={text}
                  onChange={(event) => {
                    setText(event.target.value);
                    setSaved(false);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={confirmedEnd ? `Notes for ${rangeDisplay}...` : `Notes for ${MONTH_NAMES[selectionStart.month]} ${selectionStart.day}...`}
                  rows={4}
                />
                <div className={styles.textareaFooter}>
                  <span className={styles.hint}>Ctrl+S to save</span>
                  <div className={styles.actions}>
                    {text && (
                      <button className={styles.clearTextBtn} onClick={() => { setText(""); }}>
                        Clear
                      </button>
                    )}
                    <motion.button
                      className={`${styles.saveBtn} ${saved ? styles.saved : ""}`}
                      onClick={handleSave}
                      whileTap={{ scale: 0.96 }}
                      animate={saved ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      {saved ? "Saved" : "Save note"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-note"
              className={styles.emptyState}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className={styles.emptyTitle}>Select a date range</p>
              <p className={styles.emptySubtitle}>Click a start date, then an end date to create notes for that period.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {monthNotes.length > 0 && (
        <div className={styles.savedNotes}>
          <div className={styles.savedHeader}>
            <span className={styles.savedTitle}>This month</span>
            <span className={styles.savedCount}>{monthNotes.length}</span>
          </div>
          <motion.div className={styles.notesList} layout>
            {monthNotes.map(({ key, text: noteText }) => {
              const parts = key.split("__");
              const startParts = parts[0].split("-");
              const endParts = parts[1]?.split("-");
              const startDay = startParts[2];
              const endDay = endParts?.[2];
              const label = endDay
                ? `${MONTH_NAMES[currentMonth].slice(0, 3)} ${startDay}-${endDay}`
                : `${MONTH_NAMES[currentMonth].slice(0, 3)} ${startDay}`;
              return (
                <motion.div
                  key={key}
                  className={styles.noteItem}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <div className={styles.noteTop}>
                    <div className={styles.noteDate}>{label}</div>
                    <button
                      type="button"
                      className={styles.deleteNoteBtn}
                      onClick={() => deleteNoteByKey(key)}
                      title="Delete note"
                    >
                      Delete
                    </button>
                  </div>
                  <p className={styles.noteText}>{noteText}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}

      <div className={styles.tape} />
    </motion.div>
  );
}
