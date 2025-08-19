interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({
  children,
}: BackgroundWrapperProps) {
  return (
    <div className="min-h-screen lg:px-[360px] md:px-6 px-4 bg-gray-50">
      {children}
    </div>
  );
}
