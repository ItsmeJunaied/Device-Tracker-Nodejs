import axios from "axios";
import "./App.css";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState(null);
  const [timer, setTimer] = useState(5);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    let interval;
    if (isStart) {
      interval = setInterval(() => {
        setTimer((prev) => (prev === 0 ? 5 : prev - 1));
      }, 1000);
    } else {
      setTimer(5); // Reset the timer when stopped
    }

    return () => clearInterval(interval);
  }, [isStart]);

  useEffect(() => {
    const fetchScreenShotData = async () => {
      try {
        const getData = await axios.get(
          "https://screenshot-server-jade.vercel.app/screenshotData"
        );
        setUserData(getData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchScreenShotData();

  }, []);

  //start taking screenshot
  const statScreenshot = async () => {
    try {
      setIsStart(true);
      const response = await axios.post(
        "https://screenshot-server-jade.vercel.app/start"
      );

      console.log(response.data.message);

      const intervalId = setInterval(fetchScreenShotData, 5000);
    
      // Store interval ID to clear it later when stopping
      setIntervalId(intervalId);
    } catch (error) {
      console.error(error);
    }
  };

  //stop taking screenshot
  const stopScreenshot = async () => {
    try {
      setIsStart(false);
      const response = await axios.post(
        "https://screenshot-server-jade.vercel.app/stop"
      );

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
          className=" w-fit px-12 "
          variant="destructive"
        >
          {isStart ? `Processing... Wait ${timer}s` : "Start"}
        </Button>
        <Button onClick={stopScreenshot} className=" w-fit px-12 " variant="">
          Stop
        </Button>
      </div>

      <div>
        <p className=" scroll-m-20 text-xl font-extrabold tracking-tight lg:text-xl my-6">
          <span className=" text-orange-400">Total:- </span>{userData?.length}
        </p>
      </div>
      <div className=" grid grid-cols-3 mt-10 gap-10">
        {userData?.map((items) => (
          <div key={items?._id}>
            <div className=" border-4 rounded-xl border-cyan-500">
              <img className=" rounded-lg" src={items?.url} alt="" />
            </div>
            <p className=" font-normal text-base text-red-600">
              {new Date(items?.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
