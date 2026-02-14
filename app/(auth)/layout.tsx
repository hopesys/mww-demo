export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-wellness-green via-wellness-dark to-wellness-footer p-4">
      {children}
    </div>
  );
}
