import { Link, useParams } from "react-router-dom";
import { usePermissions } from "../../hooks/usePermissions";
import { authClient } from "../../libs/auth/auth";
import { ProfileAboutSectionSkeleton } from "./ProfileAboutSectionSkeleton";

interface ProfileAboutSectionProps {
  description?: string;
  followCount: {
    followers: number;
    following: number;
  };
  loadingProfile?: boolean;
}

export function ProfileAboutSection({
  description,
  followCount,
  loadingProfile,
}: ProfileAboutSectionProps) {
  const { userId } = useParams();
  const authenticatedUserId = authClient.useSession().data?.user.id;
  const { isOwner, loading } = usePermissions(authenticatedUserId);

  const isProfileOwner = isOwner(userId);

  if (loadingProfile || loading) return <ProfileAboutSectionSkeleton />;

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
    <div className="p-4 bg-neutral-950 border flex-1  border-neutral-800 shadow-md rounded-2xl">
      <div className="flex flex-col justify-between">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between">
            <h1 className="text-main text-2xl md:text-3xl">Sobre</h1>

            <div className="flex gap-4 items-center">
              <div className="flex flex-col text-center">
                <h1 className="text-main text-2xl">{followCount.followers}</h1>
                <Link
                  to={`/profile/${userId}/followers`}
                  className="text-opacity text-sm"
                >
                  {followCount.followers > 1
                    ? "seguidores"
                    : followCount.followers === 0
                      ? "seguidores"
                      : "seguidor"}
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
          <p className="text-opacity  text-wrap wrap-break-word  h-[140px] truncate">
            {handleDescription()}
          </p>
        </div>
      </div>
    </div>
  );
}
