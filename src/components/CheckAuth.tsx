"use client";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/src/components/Loading";
import {
  queryGetCurrentUser,
} from "@/src/utils/graphql-queries";
import { useCurrentUser } from "@/src/utils/hooks";
import { Role } from "../types/enum";

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
      const callBackUrl = localStorage.getItem("callBackUrl");
      if (!access_token) redirect("/introduction");
      if (!currentUser.data?.getCurrentUser) {
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
              if (dataSuccess.getCurrentUser.role === Role.shop) {
                if (callBackUrl && callBackUrl.includes("/shop-management")) {
                  router.push(callBackUrl);
                } else router.push("/shop-management");
              } else {
                if (dataSuccess.getCurrentUser.role === Role.admin) {
                  if (callBackUrl && callBackUrl.includes("/admin")) {
                    router.push(callBackUrl);
                  } else router.push("/admin");
                }
              }
            }
          }
        );
      }
    }
  }, [isClient, currentUser.data]);
  return <Loading isScreen />;
}
