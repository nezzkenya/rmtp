const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");

// Set the path to the precompiled ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegPath);

// Replace this with your YouTube stream URL
const youtubeStreamUrl =
  "rtmp://a.rtmp.youtube.com/live2/dvfd-x6k4-kyke-hbpd-ebgb";

// URL of a sample video stream (replace this with your video URL if needed)
const videoUrl =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

ffmpeg(videoUrl)
  .outputOptions([
    "-c:v libx264", // Video codec
    "-c:a aac", // Audio codec
    "-strict -2", // Needed for some ffmpeg builds
    "-f flv", // Output format
  ])
  .on("start", function (commandLine) {
    console.log("Spawned FFmpeg with command: " + commandLine);
  })
  .on("error", function (err, stdout, stderr) {
    console.error("Error: " + err.message);
    console.error("ffmpeg stderr: " + stderr);
  })
  .on("end", function () {
    console.log("Streaming finished!");
  })
  .output(youtubeStreamUrl)
  .run();
