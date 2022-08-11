const useAuth = () => {
  const auth = { user: "test", signin: (callback: () => void) => callback() };

  return auth;
};

export default useAuth;
