'use client';

import { useState } from "react";
import Link from "next/link";
import { regexpValidation, ROUTE_CONSTANTS } from "@/utilis/constants";
import { handleRegister } from "@/features/auth/auth.api";
import { useRouter } from "next/navigation";
import { buttonStyles, formStyles, inputStyles, linkStyles } from "@/styles/constants";
import { Register } from "@/types/auth";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const values: Register = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      collabId: formData.get("collabId") as string | undefined,
    };
    handleRegister({ values, setLoading, push });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h1 className="gradient-text">SIGN UP</h1>

      <div className="mb-6">
        <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First name"
          required
          style={inputStyles}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last name"
          required
          style={inputStyles}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          style={inputStyles}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          pattern={regexpValidation.source}
          style={inputStyles}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="confirm" className="block text-sm font-medium">Confirm Password</label>
        <input
          type="password"
          id="confirm"
          name="confirm"
          placeholder="Confirm Password"
          required
          style={inputStyles}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="collabId" className="block text-sm font-medium">Collaboration ID (if you have it)</label>
        <input
          type="text"
          id="collabId"
          name="collabId"
          placeholder="Collaboration ID"
          style={inputStyles}
        />
      </div>

      <div className="flex items-center justify-between space-x-4">
        <button
          type="submit"
          disabled={loading}
          style={buttonStyles}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <Link href={ROUTE_CONSTANTS.LOGIN} style={linkStyles}>
          <h1 className="gradient-text">Login to account</h1>
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
