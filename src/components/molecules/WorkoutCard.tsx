import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { Clock, BarChart2, Play } from "lucide-react";
import { motion } from "framer-motion";

export interface Workout {
  title: string;
  duration: string;
  difficulty: string;
  type: string;
  image: string;
}

export interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const { title, duration, difficulty, type, image } = workout;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass-panel rounded-xl overflow-hidden flex flex-row h-32 group cursor-pointer border border-white/5 hover:border-purple-500/50 transition-colors"
    >
      <div className="w-32 h-full relative shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="text-white fill-white w-8 h-8 drop-shadow-lg" />
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow bg-gradient-to-r from-transparent to-slate-900/50">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-white leading-tight group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <Badge
            variant="outline"
            className="text-[10px] bg-white/5 border-white/10 backdrop-blur-md"
          >
            {type}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-xs mt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-purple-400" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart2 className="w-3 h-3 text-pink-400" />
            <span>{difficulty}</span>
          </div>
        </div>

        <div className="mt-auto flex justify-end">
          <Button
            size="sm"
            variant="ghost"
            className="text-purple-400 p-0 h-auto hover:bg-transparent hover:text-purple-300 group-hover:translate-x-1 transition-transform"
          >
            Start Now &rarr;
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export { WorkoutCard };
