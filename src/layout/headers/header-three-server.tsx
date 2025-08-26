import React from "react";
import HeaderThree from "./header-three"; // The client component
import { getCategories } from "@/lib/actions/category.actions";

// This is an async Server Component
const HeaderThreeServer = async () => {
  // Fetch categories on the server
  const categories = await getCategories();



  // Render the client component and pass the fetched data as props
  return <HeaderThree categories={categories} />;
};

export default HeaderThreeServer;
