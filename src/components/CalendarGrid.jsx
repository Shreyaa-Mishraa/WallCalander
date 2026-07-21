import { format } from "date-fns";
import { weekdayShortLabels } from "../utils/calendar";

export default function CalendarGrid({
  monthLabel,
  days,
  dayInfo,
  onDaySelect,
  onPrevMonth,
  onNextMonth,
  onJumpToday,
}) {
  return (
    <section className="calendar-paper">
      <header className="calendar-toolbar">
        <div>
          <p className="eyebrow">Wall Calendar</p>
          <h1>{monthLabel}</h1>
        </div>
        <div className="toolbar-buttons">
          <button type="button" onClick={onPrevMonth} aria-label="Previous month">
            &#8592;
          </button>
          <button type="button" onClick={onJumpToday}>
            Today
          </button>
          <button type="button" onClick={onNextMonth} aria-label="Next month">
            &#8594;
          </button>
        </div>
      </header>

      <div className="calendar-grid weekday-row">
        {weekdayShortLabels().map((day) => (
          <div key={day} className="weekday-cell">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((date) => {
          const info = dayInfo(date);
          const classes = [
            "day-cell",
            info.inMonth ? "in-month" : "out-month",
            info.isInRange ? "in-range" : "",
            info.isStart ? "range-start" : "",
            info.isEnd ? "range-end" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={date.toISOString()}
              type="button"
              className={classes}
              onClick={() => onDaySelect(date)}
              title={format(date, "PPP")}
            >
              <span>{format(date, "d")}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
