import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";
import { Pause, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthCarousel from "../../hooks/useAuthCarousel";

function AuthCarousel({ isTyping }: { isTyping: boolean }) {
  const navigate = useNavigate();
  const {
    currentIndex,
    handleScrollPreference,
    images,
    isHovering,
    setIsHovering,
    autoScrollPreference,
    setCurrentIndex,
  } = useAuthCarousel(isTyping);
  return (
    <div
      className="relative w-[600px] lg:block select-none  hidden  "
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence key={currentIndex}>
        <motion.div
          className="w-full h-full absolute pointer-events-none bg-black/80 top-0  z-20 left-0"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
          }}
          exit={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: "easeIn",
          }}
        />

        <motion.img
          draggable={false}
          key={images[currentIndex].alt}
          onClick={handleScrollPreference}
          className=" h-full   border-neutral-800 rounded-2xl shadow-2xl border min-h-full absolute object-cover object-center"
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
        />
      </AnimatePresence>

      <img
        draggable={false}
        onClick={() => navigate("/")}
        src="/logo.png"
        className="w-fit absolute top-2 z-40 left-2 h-fit"
      />
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button
              onClick={handleScrollPreference}
              key={autoScrollPreference}
              title={`${
                autoScrollPreference === "paused"
                  ? "Habilitar auto scroll"
                  : "Desabilitar auto scroll"
              }`}
              className="absolute z-20 right-2 top-2"
              size="sm"
              roundedValue="full"
              icon={
                autoScrollPreference === "paused" ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 absolute bottom-2 z-20 shadow-2xl w-full justify-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-xl w-15 h-1.5 cursor-pointer transition
              ${currentIndex === index ? "bg-neutral-700" : "bg-neutral-900"}
            `}
          />
        ))}
      </div>
    </div>
  );
}

export default AuthCarousel;
