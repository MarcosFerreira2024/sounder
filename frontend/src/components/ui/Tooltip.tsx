import { useTooltip } from "../../contexts/TooltipContext";
import { motion } from "framer-motion";
function Tooltip() {
  const { tooltip } = useTooltip();

  if (!tooltip.visible) {
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1.1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="absolute z-50 pointer-events-none
                 bg-neutral-900 text-neutral-100 font-inter border border-neutral-800
                 px-2 py-1 rounded text-xs"
      style={{
        top: `${tooltip.y}px`,
        left: `${tooltip.x}px`,
      }}
    >
      {tooltip.text}
    </motion.div>
  );
}

export default Tooltip;
