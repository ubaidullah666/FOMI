import './globals.css';

export const metadata = {
  title: 'Fomi Studio — Create without limits',
  description: 'A calm, powerful workspace for creating visual stories with AI.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
