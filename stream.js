import ffmpeg from "fluent-ffmpeg";

// Function to stream video to RTMP server
function streamToRTMP(localFilePath, rtmpUrl) {
  // Create a new ffmpeg command
  const command = ffmpeg();

  // Set input file
  command.input(localFilePath);

  // Set output format and RTMP URL
  command.outputOptions("-c:v copy"); // Copy video codec
  command.outputOptions("-c:a aac"); // AAC audio codec
  command.outputOptions("-b:a 128k"); // Audio bitrate
  command.outputOptions("-f flv"); // Set output format to flv
  command.output(rtmpUrl);

  // Event listeners
  command.on("start", function (commandLine) {
    console.log("FFmpeg process started:", commandLine);
  });

  command.on("error", function (err, stdout, stderr) {
    console.error("FFmpeg error:", err.message);
    console.error("FFmpeg stderr:", stderr);
  });

  command.on("end", function () {
    console.log("FFmpeg process ended");
  });

  // Start the ffmpeg command
  command.run();
}

// Example usage
const localFilePath = "./file_2.mp4"; // Path to your local video file
const rtmpUrl = "rtmp://a.rtmp.youtube.com/live2/dvfd-x6k4-kyke-hbpd-ebgbn"; // RTMP URL with stream key

// Start streaming to RTMP server
streamToRTMP(localFilePath, rtmpUrl);
