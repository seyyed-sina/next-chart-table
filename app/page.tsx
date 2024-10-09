'use client';
import { BarChart } from '@/components/chart/components/BarChart';

export default function Home() {
  return (
    <>
      <h1 className="text-center text-xl text-primary-100 font-bold mb-8">
        Monthly Sales and Expenses Overview
      </h1>
      <div className="container mx-auto">
        <BarChart />
      </div>
    </>
  );
}
