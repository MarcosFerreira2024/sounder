import { z } from "zod";
import { errors } from "./errorMessages";




const text = () =>
  z.string().trim()

const password = () =>
  text()
    .min(8, errors.passwordMin)
    .max(32, errors.passwordMax);

const email = () =>
  z.email(errors.email);

const firstName = () =>
  text()
    .min(2, errors.nameMin)
    .max(20, errors.nameMax);

const surname = () =>
  text()
    .min(2, errors.surnameMin)
    .max(80, errors.surnameMax);


export const loginSchema = z.object({
  email: email(),
  password: password(),
});

export const registerSchema = z.object({
  name: firstName(),
  surname: surname(),
  email: email(),
  password: password(),
});
