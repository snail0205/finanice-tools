import { ToolsPageStructuredData } from "@/components/tools-page-structured-data";

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ToolsPageStructuredData />
      {children}
    </>
  );
}
