import { LoginForm } from "@/components/login";
import { SignupForm } from "@/components/signup";
export default function Home() {
  return (
    <div className="flex flex-col bg-gray-100 items-center justify-center h-screen">
      {/* <LoginForm /> */}
      <SignupForm />
    </div>
  );
}
