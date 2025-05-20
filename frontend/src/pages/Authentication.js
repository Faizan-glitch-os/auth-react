import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  const userData = await request.formData();
  const userDetails = {
    email: userData.get("email"),
    password: userData.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  });

  /* if (mode !== "login" || mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }

  if (!response.ok) {
    throw json({ message: "Failed to authenticate" }, { status: 500 });
  } */

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  return redirect("/");
}
