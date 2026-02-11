import { routes } from "../../consts/routes";

async function updateUserProfilePicture(image?: File | null) {
  if (!image) return;
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch(routes.user.updateProfilePicture, {
    method: "POST",

    credentials: "include",
    body: formData,
  });

  const json = await response.json();

  console.log(json);

  return json.data;
}

export { updateUserProfilePicture };
