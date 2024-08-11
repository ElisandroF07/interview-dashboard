import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import DashbaordNav from "@/components/dashboard/dashboardNav";
import api from "@/services/api";

interface IHomeProps {
  children: React.ReactNode
}

export default async function DashbaordLayout({ children }: IHomeProps) {

  const session = await getServerSession()
  api.defaults.headers.common.Authorization = `Bearer ${session?.user?.name}`

  if (!session) redirect('/auth/login')

  return (
    <main className="w-full h-full bg-[rgb(var(--background))] text-[0.8rem] flex items-start justify-start">
      <DashbaordNav/>
      <section className="flex-[1] h-full" >
        <div className="w-full h-[40px] bg-[rgb(var(--background))] rounded-br-[18px]"></div>
        <div className="flex-[1] rounded-tl-[18px] bg-[#f1f3f6]" style={{ height: 'calc(100vh - 40px' }}>{children}</div>
      </section>
    </main>
  );
}
