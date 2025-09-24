export const metadata = { title: "mystic-api" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: 16 }}>
        {children}
      </body>
    </html>
  );
}
