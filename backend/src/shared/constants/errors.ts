export const zodErrorMessages = {
  invalid: (name: string) => `Invalid ${name}, provide a valid ${name}`,
  required: (name: string) => `${name} is required`,
  notEmpty: (name: string) => `${name} cannot be empty`,
  invalidUrl: (name: string) => `Invalid ${name} URL`,
  atLeastOne: (name: string) => `At least one ${name} is required`,
  atLeastOneFieldForUpdate: "At least one field must be provided for update",
  invalidVisibility: "Invalid visibility, must be either PUBLIC or PRIVATE",
  genreNameRequired: "Genre name cannot be empty",

};

export const Errors = {
    FILE_REQUIRED: (fileName: string) => `${fileName} is required`,
};

