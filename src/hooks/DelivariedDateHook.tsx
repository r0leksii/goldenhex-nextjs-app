import React, { useEffect, useState } from "react";
import moment from "moment";

interface DeliveredDateHookProps {
  inputDate: string;
}

const DeliveredDateHook = ({ inputDate }: DeliveredDateHookProps) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Parse the input date string using Moment.js
    const parsedDate = moment(inputDate, "MM/DD/YY h:mm A");

    // Add three days to the parsed date
    const futureDate = parsedDate.add(3, "days");

    // Format the date as "DD MMM h.mm A"
    const formattedDateString = futureDate.format("DD MMM h.mm A");

    // Set the formatted date in the state
    setFormattedDate(formattedDateString);
  }, [inputDate]);

  return <> {formattedDate}</>;
};

export default DeliveredDateHook;
