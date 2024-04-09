"use client";

import GetStarted from "@/components/layouts/getStarted/getstarted";
import Homepage from "@/components/layouts/homepage/homepage";
import { TokenDetails } from "@/utils/tokendetails/tokeDetails";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [hasToken, setToken] = useState(Boolean);

  useEffect(() => {
    setToken(() => TokenDetails.hasToken());
  }, []);

  return hasToken ? <Homepage /> : <GetStarted />;
}
