import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TimerMode = "pomodoro" | "short_break" | "long_break";

const MODES: Record<TimerMode, { label: string; minutes: number }> = {
  pomodoro: { label: "Pomodoro", minutes: 25 },
  short_break: { label: "Short Break", minutes: 5 },
  long_break: { label: "Long Break", minutes: 15 },
};

function App() {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(MODES.pomodoro.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (mode === "pomodoro") {
        setSessions((prev) => prev + 1);
      }
      // Optional: Play sound or notification here
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[mode].minutes * 60);
  };

  const handleModeChange = (value: string) => {
    const newMode = value as TimerMode;
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(MODES[newMode].minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <main data-tauri-drag-region className="min-h-screen bg-transparent flex items-center justify-center p-4 font-sans text-white">
      <Card className="w-full max-w-md bg-transparent border-white/10 text-white shadow-none">
        <CardHeader data-tauri-drag-region className="text-center space-y-2 cursor-default select-none">
          <CardTitle className="text-2xl font-bold tracking-tight pointer-events-none">Pomodoro Timer</CardTitle>
          <CardDescription className="text-gray-400 font-medium tracking-widest uppercase text-xs pointer-events-none">
            {mode === "pomodoro" ? "Focus Time" : mode === "short_break" ? "Short Break" : "Long Break"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-8">
          <div className="text-8xl font-bold tracking-tighter tabular-nums">
            {formatTime(timeLeft)}
          </div>

          <div className="flex gap-4 w-full justify-center">
            <Button 
              onClick={toggleTimer} 
              className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-6 text-lg min-w-[120px] cursor-pointer"
            >
              {isActive ? "Pause" : "Start"}
            </Button>
            <Button 
              onClick={resetTimer} 
              variant="outline" 
              className="border-gray-700 text-white hover:bg-gray-800 hover:text-white font-semibold px-8 py-6 text-lg min-w-[120px] cursor-pointer"
            >
              Reset
            </Button>
          </div>

          <Tabs value={mode} onValueChange={handleModeChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/20 text-gray-400">
              <TabsTrigger 
                value="pomodoro" 
                className="data-[state=active]:bg-white data-[state=active]:text-black cursor-pointer"
              >
                Pomodoro
              </TabsTrigger>
              <TabsTrigger 
                value="short_break"
                className="data-[state=active]:bg-white data-[state=active]:text-black cursor-pointer"
              >
                Short Break
              </TabsTrigger>
              <TabsTrigger 
                value="long_break"
                className="data-[state=active]:bg-white data-[state=active]:text-black cursor-pointer"
              >
                Long Break
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center text-gray-500 text-sm">
          Sessions completed: {sessions}
        </CardFooter>
      </Card>
    </main>
  );
}

export default App;
