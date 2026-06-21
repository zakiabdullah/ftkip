import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import CustomDateRangePicker from "@/Components/custom-date-range-picker";
import { Button } from "@/Components/ui/button";
import { Download, LogOut } from "lucide-react";

import {
  ChatWidget,
  ExerciseMinutes,
  LatestPayments,
  PaymentMethodCard,
  SubscriptionsCard,
  TeamMembersCard,
  TotalRevenueCard
} from "@/Components/Dashboard";

export default function DashboardDefault() {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Demo Dashboard
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Symmetrical layout and preview elements cloned from Shadcn UI Kit.
            </p>
          </div>
        </div>
      }
    >
      <Head title="Demo Dashboard" />

      <div className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl space-y-4">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight lg:text-2xl text-zinc-900 dark:text-zinc-50">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <CustomDateRangePicker />
            <Button>
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Download</span>
            </Button>
            <Button variant="destructive" asChild>
              <Link href={route('logout')} method="post" as="button" className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Log Out</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="gap-4 space-y-4 lg:grid lg:grid-cols-3 lg:space-y-0">
          <TeamMembersCard />
          <SubscriptionsCard />
          <TotalRevenueCard />
          <ChatWidget />
          <div className="lg:col-span-2">
            <ExerciseMinutes />
          </div>
          <div className="lg:col-span-2">
            <LatestPayments />
          </div>
          <PaymentMethodCard />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
