"use client";
import Loading from "@/src/components/Loading";
import dynamic from "next/dynamic";
const CheckAuth = dynamic(() => import("@/src/components/CheckAuth"), {
  ssr: false,
  loading: () => <Loading isScreen />,
});
export default function Home() {
  return <CheckAuth />;
}
