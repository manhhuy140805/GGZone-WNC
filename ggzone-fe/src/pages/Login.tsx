import React, { useState } from "react";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with auth service
    console.log("login", { email, password, remember });
    alert("Logged in (mock)");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

          <div className="space-y-3 mb-4">
            <Button className="w-full" variant="primary" size="md">
              Log In With Discord
            </Button>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              variant="primary"
              size="md"
            >
              Log In With Twitch
            </Button>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600"
              variant="primary"
              size="md"
            >
              Log In With Facebook
            </Button>
          </div>

          <div className="text-center text-sm text-gray-300 my-3">Or</div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4"
                />
                Remember me
              </label>

              <a className="text-sm text-orange-400 hover:underline" href="#">
                Forgot your password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              variant="primary"
              size="md"
            >
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
