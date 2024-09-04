'use server';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

export async function createUser(formData: FormData) {
  //   const { email, fullName } = formSchema.parse({
  const validatedFields = formSchema.safeParse({
    email: formData.get('email'),
    fullName: formData.get('fullName'),
  }); //{ success: true, data: { fullName: 'aaa', email: 'aaa5@aaa.com' } }

  //console.log(email, fullName);
  console.log(validatedFields?.data?.email);
}
