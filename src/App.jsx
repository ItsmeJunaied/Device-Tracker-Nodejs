import axios from "axios";
import "./App.css";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState(null);

  console.log(userData);
  // get data of user screenshot

  useEffect(() => {
    const fetchScreenShotData = async () => {
      try {
        const getData = await axios.get("https://screenshot-server-jade.vercel.app/screenshotData");
        setUserData(getData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchScreenShotData();

    // Set up polling to fetch data every 5 seconds
    const intervalId = setInterval(fetchScreenShotData, 20000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  //start taking screenshot
  const statScreenshot = async () => {
    try {
      const response = await axios.post("https://screenshot-server-jade.vercel.app/start");

      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  //stop taking screenshot
  const stopScreenshot = async () => {
    try {
      const response = await axios.post("https://screenshot-server-jade.vercel.app/stop");

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

      <div className=" grid grid-cols-3 mt-10 gap-10">
        total: {userData?.length}
        {userData?.map((items) => (
          <div key={items?._id}>
            <div className=" border-4 rounded-xl border-cyan-500">
              <img className=" rounded-lg" src={items?.url} alt="" />
            </div>
            <p>{items?.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
