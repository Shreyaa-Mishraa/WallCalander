# Wall Calander
Interactive wall-calendar UI built with Next.js, inspired by a physical wall calendar with a hero image panel, date range selection, and integrated notes.
## Features
- Start/end date range selection with clear visual states
- Notes for selected date/range
- Manual save notes (`Save note` or `Ctrl+S`)
- Note indicators directly on date cells
- Holiday markers
- Desktop wall-view mode
- Responsive desktop + mobile layouts
## Tech Stack
- Next.js 14
- React 18
- Framer Motion
- date-fns
- lucide-react
- CSS Modules + global CSS
## Run Locally
```bash
npm install
npm run dev
```
Open: [http://localhost:3000](http://localhost:3000)
## 🖼️ Hero Images

Add monthly hero images inside:

`public/heroes/`

Use either `.jpg` or `.png` with month-based names:

- `january.jpg` / `january.png`
- `february.jpg` / `february.png`
- `march.jpg` / `march.png`
- `april.jpg` / `april.png`
- `may.jpg` / `may.png`
- `june.jpg` / `june.png`
- `july.jpg` / `july.png`
- `august.jpg` / `august.png`
- `september.jpg` / `september.png`
- `october.jpg` / `october.png`
- `november.jpg` / `november.png`
- `december.jpg` / `december.png`

### Fallback behavior

If a month image is missing, the app automatically falls back to built-in default visuals, so the UI still works without custom assets.
## Build for Production
```bash
npm run build
npm run start
```
