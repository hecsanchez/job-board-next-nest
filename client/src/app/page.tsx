import Header from "@/components/organisms/Header";
import JobsList from "@/components/organisms/JobsList";

export default async function ListingsPage() {
  return (
      <>
        <Header/>
        <main className="min-h-screen py-16 bg-background">
            <div className="max-w-[756px] m-auto flex flex-col items-center">
                <h1 className="text-2xl sm:text-[28px] font-bold leading-[38px] text-primary font-poppins">We locate promising jobs that provide educational perks. Keep coming back for new additions!</h1>
                <div className="w-full mt-10">
                    <JobsList />
                </div>
            </div>
        </main>
      </>
  )
}

