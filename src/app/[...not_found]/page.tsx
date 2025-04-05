export const runtime = "edge";

import ErrorMain from "@/components/error-page/ErrorMain";
import React from "react";

const ErrorPage = () => {
  return (
    <>
      <main>
        <ErrorMain />
      </main>
    </>
  );
};

export default ErrorPage;
