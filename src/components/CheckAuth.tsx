"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/src/components/Loading";
import { queryGetCurrentUser } from "@/src/utils/graphql-queries";
import { useCurrentUser } from "@/src/utils/hooks";

export default function CheckAuth() {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) redirect("/introduction");
      if (!currentUser.data) {
        currentUser.query(
          {
            query: queryGetCurrentUser,
            variables: {
              input: {
                access_token: access_token,
              },
            },
          },
          (dataSuccess, error) => {
            if (error) {
              toast.error(error.message);
              localStorage.removeItem("access_token");
              router.push("/login");
            }
            if (dataSuccess) {
              // if(dataSuccess.)
              router.push("/admin");
            }
          }
        );
      }
    }
  }, [isClient]);
  return <Loading isScreen />;
}
