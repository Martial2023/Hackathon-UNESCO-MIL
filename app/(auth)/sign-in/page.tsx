import LoginForm from "../_components/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}