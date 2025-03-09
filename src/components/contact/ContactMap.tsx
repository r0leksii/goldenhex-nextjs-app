import React from "react";

const ContactMap = () => {
  return (
    <div className="bd-google__map-area pb-125">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-10 col-xl-11">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.6403122583984!2d-78.8119837234299!3d35.784210872554226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf258b72ab083%3A0xb93ac2cfde3d4f6e!2s1200%20NW%20Maynard%20Rd%2C%20Cary%2C%20NC%2027513%2C%20USA!5e0!3m2!1sen!2sbg!4v1741553761796!5m2!1sen!2sbg"
              width="600"
              height="450"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
