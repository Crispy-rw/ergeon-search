import React, { useState, useCallback, FC } from "react";
import { Person } from "./types";

export const LoginForm: FC = () => {
  // Store the username so we can reference it in a submit handler
  const [searchString, setUsearchString] = useState<string>("");

  // Create a state for the user data we are going to receive
  // from the API call upon form submit.
  const [userData, setUserData] = useState<Person[]>([]);

  // Check for Erros
  const [error, setError] = useState<boolean>(false);

  // Whenever we change our username input's value
  // update the corresponding state's value.
  const handleUsernameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsearchString(event.target.value);
    },
    []
  );

  // Handle a submit event of the form
  const handleFormSubmit = useCallback(
    (event: React.FormEvent<EventTarget>) => {
      // Prevent the default behavior, as we don't want
      // for our page to reload upon submit.
      event.preventDefault();

      // Perform a POST /login request and send the username
      fetch("/search", {
        method: "POST",
        body: JSON.stringify({
          search: searchString
        }),
        headers: {
          // Adding this header is important so that "req.body"
          // is parsed into an object in your request handler.
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        // Update the state with the received response
        .then(({ data }) => {
          if (data.length > 0) {
            setUserData(data);
            setError(false);
          } else setError(true);
        });
    },
    [searchString]
  );

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Take Home Test from Ergeon </h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="search">Search:</label>
          <input
            required
            id="search"
            name="search"
            value={searchString}
            onChange={handleUsernameChange}
          />
          <button type="submit">Search</button>
        </div>

        <div>{userData?.length > 0 && JSON.stringify(userData)}</div>
        <div>{error && <span> No data Found </span>}</div>
      </form>
    </div>
  );
};
