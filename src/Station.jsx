import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";

function Station() {
  const [radio, setRadio] = useState([]);
  const url = "https://api.sr.se/api/v2/channels?format=json&size=100";

  useEffect(() => {
    axios.get(url).then((data) => {
      console.log(data);

      setRadio(data.data.channels);
    });
  }, []);

  // Conditional rendering
  if (radio.length === 0) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {radio.map((channel, i) => {
        return (
          <div
            key={i}
            className={`border-4 border-black flex w-4/5`}
            style={{ backgroundColor: `#${channel.color}` }}
          >
            <img src={`${channel.image}`} alt="radio logo" className="w-1/5" />
            <div className="flex flex-col m-6">
              <h3 className="text-4xl font-bold">{channel.name}</h3>
              <audio controls className="m-3 p-3">
                <source src={`${channel.liveaudio.url}`} />
              </audio>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Station;
