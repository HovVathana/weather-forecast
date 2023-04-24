"use client";

import { formatToLocalTime } from "@/util";
import React, { useEffect, useState } from "react";

type Props = {
  sunrise: number;
  sunset: number;
  timezone: string;
  current: number;
};

function SunMoon({ sunrise, sunset, timezone, current }: Props) {
  const [percentage, setPercentage] = useState("");

  function totalSeconds(time: any) {
    var parts = time.split(":");
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  useEffect(() => {
    var sunrise_time = formatToLocalTime(sunrise, timezone, "TT");
    var sunset_time = formatToLocalTime(sunset, timezone, "TT");
    var current_time = formatToLocalTime(current, timezone, "TT");

    var difference_sunset =
      totalSeconds(sunset_time) - totalSeconds(sunrise_time);
    var difference_sunset_time = formatToLocalTime(
      difference_sunset,
      timezone,
      "TT"
    );

    var difference_current =
      totalSeconds(current_time) - totalSeconds(sunrise_time);
    var difference_current_time = formatToLocalTime(
      difference_current,
      timezone,
      "TT"
    );

    var pct = ((100 * difference_current) / difference_sunset).toFixed(2);

    setPercentage(pct);
  }, [sunrise, sunset, current, timezone]);

  return (
    <>
      <div className="sunmoon">
        <div className="sun-times">
          <div className="sun-path">
            <div
              className="sun-animation"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          {/* <div
            className="sun-symbol-path"
            style={
              {
                //   WebkitTransform: `rotateZ(${parseInt(percentage) * 75}deg)`,
                //   WebkitTransform: "rotateZ(180deg)",
              }
            }
          >
            <span className="symbol">☀</span>
          </div> */}
        </div>
        <div className="legend">
          <div className="sunrise">
            {formatToLocalTime(sunrise, timezone, "hh:mm")} AM
          </div>
          <div className="sunset">
            {formatToLocalTime(sunset, timezone, "hh:mm")} PM
          </div>
        </div>
        <div className="clear">&nbsp;</div>
      </div>
    </>
  );
}

export default SunMoon;
