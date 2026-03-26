// lib/gas.ts

export const GAS_URL = "https://script.google.com/macros/s/AKfycbyil_0pg9SiKEUjhfoAO7iPayLsFKslz7tJJYbtD4QPsv9Q253UCrID9wYGjMI4MK_Z/exec";

export const RAZORPAY_KEY_ID = "rzp_test_your_key_here"; // <-- add your real key here

export interface ContactFormData {
  formType: 'contact';
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface VolunteerFormData {
  formType: 'getinvolved';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
}

export interface NewsletterFormData {
  formType: 'newsletter';
  email: string;
}

export type FormData = ContactFormData | VolunteerFormData | NewsletterFormData;

export async function fetchToGAS(data: FormData): Promise<{ success: boolean }> {
  try {
    const params = new URLSearchParams();
    params.append('type', data.formType);
    
    if (data.formType === 'contact') {
      params.append('name', data.name);
      params.append('email', data.email);
      params.append('phone', data.phone);
      params.append('subject', data.subject);
      params.append('message', data.message);
    } else if (data.formType === 'getinvolved') {
      params.append('firstName', data.firstName);
      params.append('lastName', data.lastName);
      params.append('email', data.email);
      params.append('phone', data.phone);
      params.append('interest', data.interest);
    } else if (data.formType === 'newsletter') {
      params.append('email', data.email);
    }

    await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    return { success: true };
    
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw new Error('Failed to submit form. Please check your connection and try again.');
  }
}