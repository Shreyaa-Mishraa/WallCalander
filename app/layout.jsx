import "./globals.css";

export const metadata = {
  title: "Wall Calander",
  description: "Interactive wall calendar with range notes and seasonal themes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
