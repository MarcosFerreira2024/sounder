import { useNavigate } from "react-router-dom";

interface ProfileDisplayCardProps {
  id: string;
  name: string;
  image: string;
  className?: string;
}

export function ProfileDisplayCard({
  id,
  name,
  image,
  className,
}: ProfileDisplayCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/profile/${id}`)}
      className="cursor-pointer  flex flex-col max-w-[300px]  text-center h-full   gap-2 group "
    >
      <img
        src={image}
        alt={name}
        className={`${className} object-cover   group-hover:opacity-80  bg-neutral-900 border-neutral-800 border rounded-2xl  `}
      />
      <h2 className=" text-opacity text-lg">{name}</h2>
    </div>
  );
}
