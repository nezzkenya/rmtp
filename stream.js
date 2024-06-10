import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

// Function to stream video to RTMP server
function streamToRTMP(localFilePath, rtmpUrl) {
  const command = ffmpeg(localFilePath)
    .outputOptions("-c:v copy") // Copy video codec
    .outputOptions("-c:a aac") // AAC audio codec
    .outputOptions("-b:a 128k") // Audio bitrate
    .output(rtmpUrl);

  command.on("start", (commandLine) => {
    console.log("FFmpeg process started:", commandLine);
  });

  command.on("error", (err, stdout, stderr) => {
    console.error("FFmpeg error:", err.message);
    console.error("FFmpeg stderr:", stderr);
  });

  command.on("end", () => {
    console.log("FFmpeg process ended");
  });

  command.run();
}

// Example usage
const localFilePath = "./file_2.mp4"; // Path to your local video file
const rtmpUrl = "rtmp://a.rtmp.youtube.com/live2/dvfd-x6k4-kyke-hbpd-ebgbn/"; // RTMP URL with stream key

// Check if the video file exists
if (fs.existsSync(localFilePath)) {
  // Start streaming to RTMP server
  streamToRTMP(localFilePath, rtmpUrl);
} else {
  console.error("Video file not found:", localFilePath);
}
