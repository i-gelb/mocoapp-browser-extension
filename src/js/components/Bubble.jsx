import React from "react"
import PropTypes from "prop-types"
import browser from "webextension-polyfill"
import mocoLogo from "images/i-gelb-32x32.png"
import mocoLogoBig from "images/i-gelb-159x159.png"
import { parseISO } from "date-fns"
import { formatDuration } from "utils"
import Timer from "./shared/Timer"

const Bubble = ({ 
  bookedSeconds = 0, 
  timedActivity, 
  settingTimeTrackingHHMM = false 
}) => {
  const logo = mocoLogoBig
  const logoSize = timedActivity || bookedSeconds > 0 ? "30px" : "50px"

  return (
    <div className="moco-bx-bubble-inner">
      <img className="moco-bx-logo" style={{ width: logoSize, height: logoSize }} src={browser.runtime.getURL(logo)} />
      
      {!timedActivity && bookedSeconds > 0 && (
        <span className="moco-bx-booked-hours">
          {formatDuration(bookedSeconds, { settingTimeTrackingHHMM, showSeconds: false })}
        </span>
      )}
      {timedActivity && (
        <Timer
          className="text-red"
          startedAt={parseISO(timedActivity.timer_started_at)}
          offset={timedActivity.seconds}
          style={{ marginBottom: "3px", fontSize: "12px" }}
        />
      )}
    </div>
  )
}

Bubble.propTypes = {
  bookedSeconds: PropTypes.number,
  timedActivity: PropTypes.shape({
    timer_started_at: PropTypes.string.isRequired,
    seconds: PropTypes.number.isRequired,
  }),
  settingTimeTrackingHHMM: PropTypes.bool,
}

export default Bubble
