import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";
import { motion } from "framer-motion";

const MotivationHero = () => {
  return (
    <section className="relative bg-slate-950 text-white py-20 md:py-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent z-10"></div>
        {/* Animated blobs */}
        <div className="absolute right-0 top-0 h-[600px] w-[600px] bg-purple-600/20 rounded-full blur-[100px] animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute right-20 bottom-0 h-[400px] w-[400px] bg-pink-600/20 rounded-full blur-[80px] animate-[float_10s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-purple-500/50 text-purple-300 bg-purple-500/10 backdrop-blur-md"
            >
              New Challenge Available
            </Badge>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
            Build Your{" "}
            <span className="text-gradient drop-shadow-lg">Legacy</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-400 mb-8 max-w-lg"
          >
            Plan your workouts, track your progress, and crush your goals with
            our advanced fitness planner powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <Button
              size="lg"
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 shadow-lg shadow-purple-900/40"
            >
              Start Your Plan
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-white backdrop-blur-sm"
            >
              View Routine
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { MotivationHero };
