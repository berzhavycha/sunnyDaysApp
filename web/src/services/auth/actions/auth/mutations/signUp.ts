export const signUpMutation = `
  mutation SignUp($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      email
    }
  }
`;
