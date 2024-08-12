import axios from "axios";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  const statScreenshot = async () => {
    try {
      const response = await axios.post("http://localhost:3000/start");

      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const stopScreenshot = async () => {
    try {
      const response = await axios.post("http://localhost:3000/stop");

      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" container mx-auto mt-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Time Tracker: <span className=" text-sky-500">Screenshot</span>
      </h1>

      <div className=" mt-5 flex flex-row gap-10 ">
        <Button
          onClick={statScreenshot}
          className=" w-28"
          variant="destructive"
        >
          Start
        </Button>
        <Button onClick={stopScreenshot} className=" w-28" variant="">
          Stop
        </Button>
      </div>
    </div>
  );
}

export default App;
