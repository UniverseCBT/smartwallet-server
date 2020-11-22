import 'dotenv/config';

interface AuthTypes {
  secret: string;
}

export const auth = {
  secret: process.env.JWT_SECRET,
} as AuthTypes;
