"use client";

import GetStarted from "@/components/layouts/getStarted/getstarted";
import Homepage from "@/components/layouts/homepage/homepage";
import { TokenDetails } from "@/utils/tokendetails/tokeDetails";
import { useEffect, useState } from "react";

export default function page() {
  const [hasToken, setToken] = useState(Boolean);

  useEffect(() => {
    setToken(() => TokenDetails.hasToken());
  }, []);

  return hasToken ? <Homepage /> : <GetStarted />;
}
