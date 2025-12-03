import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*  const isContactFormValid = () => {
        return contactInfo.email &&
            contactInfo.telephone &&
            contactInfo.surname &&
            contactInfo.zipCode &&
            contactInfo.street &&
            contactInfo.residence
    } */

export const isContactFormValid = (contactInfo: {
  email: string;
  telephone: string;
  surname: string;
  zipCode: string;
  street: string;
  residence: string;
}) => {
  return (
    contactInfo.email.includes("@") &&
    /^\d{1,10}$/.test(contactInfo.telephone) &&
    /^\d{4}\s?[a-zA-Z]{2}$/.test(contactInfo.zipCode) &&
    contactInfo.street.trim() !== "" &&
    contactInfo.residence.trim() !== ""
    && !/\d/.test(contactInfo.surname)

  );
};