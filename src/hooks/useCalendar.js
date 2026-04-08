import { useCallback, useEffect, useState } from "react";
import { dateToNum } from "../utils/calendarUtils";

const STORAGE_KEY = "wall-calendar-data";

function loadStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage write errors.
  }
}

export function useCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [hoverDate, setHoverDate] = useState(null);
  const [notes, setNotes] = useState(() => loadStorage());
  const [animDirection, setAnimDirection] = useState("none");

  useEffect(() => {
    saveStorage(notes);
  }, [notes]);

  const prevMonth = useCallback(() => {
    setAnimDirection("right");
    setTimeout(() => setAnimDirection("none"), 400);
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
    setSelectionStart(null);
    setSelectionEnd(null);
    setIsSelecting(false);
  }, []);

  const nextMonth = useCallback(() => {
    setAnimDirection("left");
    setTimeout(() => setAnimDirection("none"), 400);
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
    setSelectionStart(null);
    setSelectionEnd(null);
    setIsSelecting(false);
  }, []);

  const goToToday = useCallback(() => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectionStart(null);
    setSelectionEnd(null);
    setIsSelecting(false);
  }, [today]);

  const getRangeKey = useCallback(
    (date) => {
      if (!selectionStart) return null;
      const end = date || selectionEnd;
      if (!end) return `${selectionStart.year}-${selectionStart.month}-${selectionStart.day}`;
      if (dateToNum(selectionStart) <= dateToNum(end)) {
        return `${selectionStart.year}-${selectionStart.month}-${selectionStart.day}__${end.year}-${end.month}-${end.day}`;
      }
      return `${end.year}-${end.month}-${end.day}__${selectionStart.year}-${selectionStart.month}-${selectionStart.day}`;
    },
    [selectionStart, selectionEnd]
  );

  const handleDayClick = useCallback(
    (dateObj) => {
      if (!dateObj.isCurrentMonth) return;
      const date = { year: currentYear, month: currentMonth, day: dateObj.day };
      if (!isSelecting || selectionEnd) {
        setSelectionStart(date);
        setSelectionEnd(null);
        setIsSelecting(true);
        return;
      }
      if (dateToNum(date) < dateToNum(selectionStart)) {
        setSelectionEnd(selectionStart);
        setSelectionStart(date);
      } else {
        setSelectionEnd(date);
      }
      setIsSelecting(false);
    },
    [isSelecting, selectionEnd, selectionStart, currentYear, currentMonth]
  );

  const handleDayHover = useCallback(
    (dateObj) => {
      if (!dateObj.isCurrentMonth) return;
      setHoverDate({ year: currentYear, month: currentMonth, day: dateObj.day });
    },
    [currentYear, currentMonth]
  );

  const getNoteForSelection = useCallback(() => {
    if (!selectionStart) return "";
    const key = getRangeKey();
    return notes[key] || "";
  }, [selectionStart, notes, getRangeKey]);

  const saveNote = useCallback(
    (text) => {
      if (!selectionStart) return;
      const key = getRangeKey();
      if (!key) return;
      setNotes((prev) => {
        if (!text.trim()) {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        return { ...prev, [key]: text };
      });
    },
    [selectionStart, getRangeKey]
  );

  const clearSelection = useCallback(() => {
    setSelectionStart(null);
    setSelectionEnd(null);
    setIsSelecting(false);
    setHoverDate(null);
  }, []);

  const getMonthNotes = useCallback(() => {
    const monthPrefix = `${currentYear}-${currentMonth}-`;
    return Object.entries(notes)
      .filter(([key]) => key.startsWith(monthPrefix) || key.includes(`__${currentYear}-${currentMonth}-`))
      .map(([key, text]) => ({ key, text }));
  }, [notes, currentYear, currentMonth]);

  const deleteNoteByKey = useCallback((key) => {
    if (!key) return;
    setNotes((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const effectiveEnd = selectionEnd || (isSelecting && hoverDate ? hoverDate : null);

  return {
    currentYear,
    currentMonth,
    selectionStart,
    selectionEnd: effectiveEnd,
    confirmedEnd: selectionEnd,
    isSelecting,
    hoverDate,
    animDirection,
    prevMonth,
    nextMonth,
    goToToday,
    handleDayClick,
    handleDayHover,
    setHoverDate,
    getNoteForSelection,
    saveNote,
    deleteNoteByKey,
    clearSelection,
    getMonthNotes,
  };
}
