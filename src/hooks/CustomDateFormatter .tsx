import React, { useEffect, useState } from "react";
import moment from "moment";

interface CustomDateFormatterProps {
  inputDate: string;
}

const CustomDateFormatter = ({ inputDate }: CustomDateFormatterProps) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Parse the input date string using Moment.js
    const parsedDate = moment(inputDate, "MM/DD/YY h:mm A");

    // Format the date as "DD MMM h.mm A"
    const formattedDateString = parsedDate.format("DD MMM h.mm A");

    // Set the formatted date in the state
    setFormattedDate(formattedDateString);
  }, [inputDate]);

  return <> {formattedDate}</>;
};

export default CustomDateFormatter;
