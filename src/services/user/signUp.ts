import api from "services/api";

interface SignUp {
  email: string;
  password: string;
}

const SignUpService = async ({ email, password }: SignUp) => {
  try {
    const response = await api.post("/auth/sign-up", {
      email,
      password,
    });
    if (!response) return false;
    return response.data;
  } catch {
    return false;
  }
};

export default SignUpService;
