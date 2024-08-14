"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Contact() {
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleContactInfo = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("api/contact/new", {
        method: "POST",
        body: JSON.stringify({
          sender: session?.user.id,
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        }),
      });
      if (response.ok) alert("Message sent...");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setContactForm({
        name: "",
        email: "",
        message: ""
      })
    }
  };
  const handleClear = (e) => {
    e.preventDefault();
    setContactForm({
      name: "",
      email: "",
      message: "",
    });
  };
  const eventHandler = (event) => {
    if (event.key === "Enter") handleContactInfo();
  };
  return (
    <div>
      <div className="sm:mx-20 lg:w-2/3 xl:w-1/2 xl:mx-auto">
        <h1 className="text-center text-2xl font-extrabold">Contact</h1>
        <p className="text-center mx-10 mt-5 xl:w-2/3 xl:mx-auto ">
          We’d love to hear from you! Whether you have a question, need
          assistance, or want to share your feedback, our team is here to help.
        </p>
        <div className="form xl:w-2/3 xl:mx-auto">
          <form
            onSubmit={handleContactInfo}
            action=""
            className="flex flex-col gap-3 mt-5 p-4"
          >
            <input
              type="text"
              placeholder="Name*"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm({ ...contactForm, name: e.target.value })
              }
              className="w-full py-2 px-2 transition-all focus:border-b focus:border-transparent focus:outline-none"
              style={{ outline: "none" }}
            />
            <input
              type="text"
              placeholder="Email*"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
              className="w-full py-2 px-2 transition-all focus:border-b focus:border-transparent focus:outline-none"
              style={{ outline: "none" }}
            />
            <textarea
              placeholder="Message*"
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
              className="w-full py-2 px-2 transition-all focus:border-b focus:border-transparent focus:outline-none h-60 resize-none"
              style={{ height: "200px" }}
            ></textarea>
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleClear}
                className="border border-red-500 rounded-full text-lg text-red-500 px-4 py-1 transition-all hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={eventHandler}
                type="submit"
                className="border border-blue-500 rounded-full text-lg text-blue-500 px-4 py-1 transition-all hover:bg-blue-500 hover:text-white "
              >
                {submitting ? "Submiting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
        <p className="text-center mx-10 mt-5 xl:w-2/3 xl:mx-auto">
          Thank you for reaching out to us. Our team will do our best and reach
          out to as soon as possible
        </p>
      </div>
    </div>
  );
}
