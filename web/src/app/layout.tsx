import { MainLayout } from "@/layouts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <MainLayout>{children}</MainLayout>
  );
}
