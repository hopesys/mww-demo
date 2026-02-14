export default function ApplyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">{children}</div>
  );
}
