interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({
  children,
}: BackgroundWrapperProps) {
  return <div className="min-h-dvh pt-15 flex flex-col">{children}</div>;
}
