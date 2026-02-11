import { Link, useParams } from "react-router-dom";
import { usePermissions } from "../../hooks/usePermissions";

interface ProfileAboutSectionProps {
  description?: string;
  followCount: {
    followers: number;
    following: number;
  };
}

export function ProfileAboutSection({
  description,
  followCount,
}: ProfileAboutSectionProps) {
  const { isOwner } = usePermissions();

  const { userId } = useParams();

  const isProfileOwner = isOwner(userId);

  const handleDescription = () => {
    if (isProfileOwner && !description) {
      return "Essa seção parece meio vazia, clique em seu perfil e adicione uma descrição";
    }
    if (!isProfileOwner && !description) {
      return "Esse usuário ainda não adicionou uma descrição em seu perfil.";
    }

    return description;
  };

  return (
    <div className="p-4 bg-neutral-950 border flex-1 border-neutral-800 shadow-md rounded-2xl">
      <div className="flex flex-col justify-between">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between">
            <h1 className="text-main text-3xl">Sobre</h1>

            <div className="flex gap-4 items-center">
              <div className="flex flex-col text-center">
                <h1 className="text-main text-2xl">{followCount.followers}</h1>
                <Link
                  to={`/profile/${userId}/followers`}
                  className="text-opacity text-sm"
                >
                  seguidores
                </Link>
              </div>
              <div className="flex flex-col text-center">
                <h1 className="text-main text-2xl">{followCount.following}</h1>
                <Link
                  to={`/profile/${userId}/following`}
                  className="text-opacity text-sm"
                >
                  seguindo
                </Link>
              </div>
            </div>
          </div>
          <p className="text-opacity  text-wrap wrap-break-word  truncate">
            {handleDescription()}
          </p>
        </div>
      </div>
    </div>
  );
}
