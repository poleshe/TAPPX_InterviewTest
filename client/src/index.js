import React from "react";
import ReactDOM from "react-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

import "./styles.css";

// This form is made using react-hook-form package (https://react-hook-form.com/)
export default function App() {
  const { register, errors, handleSubmit } = useForm({
    criteriaMode: "all"
  });
  // What to do onSubmit. We send the data to the Backend to get it inside the DB.
  const onSubmit = data => console.log(data);

  // Return the form. Form building.
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <h1> Name and Bundle Form </h1>

      {/* First input, name. A valid name must be at least 4 chars, 
      and only contain letters, numbers, spaces or - or _ */}
      <input
        name="name"
        ref={register({
          required: "This input is required.", //error message for required
          pattern: {
            value: /([a-zA-Z])*\.+([a-zA-Z])+\.+/, // REGEX pattern used to validate data
            message: "This input is number only." // Error message
          },
          minLength: {
            value: 4, // Min Length of data
            message: "This input must exceed 4 characters" // Error message
          }
        })}
      />
      {/* ErrorMessage object, used to display the errors made in
      the validation of the input. For each error, it prints it's error message. */}
      <ErrorMessage
        errors={errors}
        name="name"
        render={({ messages }) => {
          console.log("messages", messages);
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
        <br/>
      {/* Bundle Input. It must have at least two segments, each segments
      starts with a letter and all characters alphanumeric or underscore. */}
      <input
        name="bundle"
        ref={register({
          required: "This input is required.", //error message for required
          pattern: {
            value: /([a-zA-Z])*\.+([a-zA-Z])+\.+/, // REGEX pattern used to validate data
            message: "This input is number only." // Error message
          },
          minLength: {
            value: 11, // Min Length of data
            message: "This input must exceed 10 characters" // Error message
          }
        })}
      />
      {/* ErrorMessage object, used to display the errors made in
      the validation of the input */}
      <ErrorMessage
        errors={errors}
        name="bundle"
        render={({ messages }) => {
          console.log("messages", messages);
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
      {/* Submit button */}
      <input type="submit" value="Submit Bundle" /> 
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
