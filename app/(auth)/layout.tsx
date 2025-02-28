"use client";
import React from "react";
import { ComponentProps } from "@/src/types";
import { redirect } from "next/navigation";

const layout = (props: ComponentProps) => {
  const getAccessToken = localStorage.getItem("access_token");
  if (getAccessToken) redirect("/");
  return props.children;
};

export default layout;
