import Logo from "@/components/global/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-b from-red-600  to-black animate-gradient-shift">
      <div className="border-b border-b-gray-700 p-10 ">
        <div className=" w-9/12 mx-auto">
          <Logo
            variant="default"
            animated={true}
            showBackground={false}
            backgroundColor="transparent"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
