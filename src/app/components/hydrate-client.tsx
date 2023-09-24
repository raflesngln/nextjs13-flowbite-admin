"use client";

import React from "react";
import { Hydrate as RQHydrate, HydrateProps } from "@tanstack/react-query";

// For Hydration react query
function HydrateClientData(props: HydrateProps) {
  return <RQHydrate {...props} />;
}

export default HydrateClientData;

