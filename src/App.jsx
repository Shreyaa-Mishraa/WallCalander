"use client";

import { useEffect, useState } from "react";
import CalendarBoard from "./components/CalendarBoard.jsx";
import MonthHero from "./components/MonthHero.jsx";
import NotesPanel from "./components/NotesPanel.jsx";
import { useCalendar } from "./hooks/useCalendar";

export default function App() {
  const calendar = useCalendar();
  const [wallView, setWallView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) setWallView(false);
  }, [isMobile]);

  return (
    <main className={`app-page ${wallView ? "wall-mode" : ""}`}>
      {!isMobile && (
        <button
          type="button"
          className="wall-view-toggle"
          onClick={() => setWallView((prev) => !prev)}
        >
          {wallView ? "Exit wall view" : "Wall view"}
        </button>
      )}

      <div className="wall-stage">
        <div className="app-shell">
          <section className="calendar-layout">
            <MonthHero
              month={calendar.currentMonth}
              year={calendar.currentYear}
              animDirection={calendar.animDirection}
            />
            <CalendarBoard
              currentYear={calendar.currentYear}
              currentMonth={calendar.currentMonth}
              wallView={wallView}
              monthNotes={calendar.getMonthNotes()}
              selectionStart={calendar.selectionStart}
              selectionEnd={calendar.selectionEnd}
              confirmedEnd={calendar.confirmedEnd}
              animDirection={calendar.animDirection}
              prevMonth={calendar.prevMonth}
              nextMonth={calendar.nextMonth}
              goToToday={calendar.goToToday}
              handleDayClick={calendar.handleDayClick}
              handleDayHover={calendar.handleDayHover}
              setHoverDate={calendar.setHoverDate}
            />
          </section>
          <div className="notes-drawer-stage">
            <NotesPanel
              selectionStart={calendar.selectionStart}
              confirmedEnd={calendar.confirmedEnd}
              currentMonth={calendar.currentMonth}
              currentYear={calendar.currentYear}
              getNoteForSelection={calendar.getNoteForSelection}
              saveNote={calendar.saveNote}
              deleteNoteByKey={calendar.deleteNoteByKey}
              getMonthNotes={calendar.getMonthNotes}
              clearSelection={calendar.clearSelection}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
