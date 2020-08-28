import React from "react";
import ReactDOM from "react-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

import "./styles.css";

// This form is made using react-hook-form package (https://react-hook-form.com/)
export default function App() {
  const { register, errors, handleSubmit, reset } = useForm({
    criteriaMode: "all"
  });
  // What to do onSubmit. We send the data to the Backend to get it inside the DB.
  // Request returns HTTP Response. Managed in BundleController @ Backend.
  const onSubmit = data => {
        fetch('http://localhost:8000/api/bundle/store', {
            method: 'POST',
            mode: 'no-cors', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }); 
        // Show a successfully sent message
        document.getElementById("successfully").style.display = "block";
        // Reset the form inputs. This function comes from react-hook-form api https://react-hook-form.com/api#reset
        reset();
        // Hide the successful message for 5 seconds then hide it again.
        setTimeout(function(){
            document.getElementById("successfully").style.display = "none";
        }, 5000);
    }


  // Return the form. Form building.
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <h1 id="title"> Name and Bundle Form </h1>

      {/* First input, name. A valid name must be at least 4 chars, 
      ,only contain letters, numbers, spaces or - or _ and at least 2 numbers or letters. */}
      <input
        name="name"
        placeholder="Name"
        ref={register({
          required: "This input is required.", //error message for required
          minLength: {
            value: 4, // Min Length of data
            message: "This input must exceed 4 characters" // Error message
          },pattern: {
            value: /^[a-zA-Z0-9 \-_]*([a-zA-Z0-9]{2})[a-zA-Z0-9 \-_]*$/, // REGEX pattern used to validate data.
            message: "This is not a valid name." // Error message
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
        placeholder="Bundle"
        ref={register({
          required: "This input is required.", //error message for required
          pattern: {
            value: /^(([a-z0-9_])*(\.))+[a-z]+[a-z0-9]*$/, // REGEX pattern used to validate data
            message: "This is not a valid bundle name." // Error message
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
      <p id="successfully"> Form submitted successfully! </p>
      <input type="submit" value="Submit Bundle" /> 
    </form>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
