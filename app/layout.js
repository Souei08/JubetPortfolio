// Styles
import "./globals.css";

export const metadata = {
  title: "Jubet Aceberos | Web Developer",
  description: "Web Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
