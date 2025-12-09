import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div className="backdrop-grid min-h-screen w-full px-4 py-10 sm:px-6 md:py-14">
      <main
        className={`relative z-10 mx-auto flex max-w-6xl flex-col gap-12 text-white ${className ?? ""}`}
      >
        {children}
      </main>
    </div>
  );
}

