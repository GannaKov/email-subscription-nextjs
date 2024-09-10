'use server';
type error = { message?: string };

export async function sendEmail(formData: FormData) {
  try {
    console.log('formData', formData);
    const email = formData.get('email');
    const fullName = formData.get('fullName');
    console.log('data', email, fullName);
  } catch (e: unknown) {
    // throw new Error(e.message);
  }
}
