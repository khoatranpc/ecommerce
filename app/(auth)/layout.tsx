"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";

const Layout = (props: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useLayoutEffect(() => {
    if (isClient) {
      const getAccessToken = localStorage.getItem("access_token");
      if (getAccessToken) redirect("/");
    }
  }, [isClient]);
  return props.children;
};

export default Layout;
