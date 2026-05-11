import { Suspense } from "react";
import SignupForm from "./SignupForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Create Account — SINTRICS" };

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
