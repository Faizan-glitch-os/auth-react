import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData();
  const navigation = useNavigation();

  const state = navigation.state === "submitting";

  const isLogin = searchParams.get("mode") === "login";
  return (
    <>
      <Form method="post" className={classes.form}>
        {actionData && actionData.errors && (
          <ul>
            {Object.values(actionData.errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        {actionData && actionData.message && <p>{actionData.message}</p>}
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={state}>{state ? "Submitting..." : "Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
