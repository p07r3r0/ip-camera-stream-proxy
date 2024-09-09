
# IP Camera Stream Proxy

This project creates a proxy server that captures video from an IP camera and allows multiple web clients to view the stream.

## Features

- Connects to an RTSP stream from an IP camera
- Converts the RTSP stream to a WebSocket stream
- Supports up to 30 simultaneous web client connections
- Displays the video stream in a web browser using HTML5 and JavaScript

## Prerequisites

- Node.js (v12 or higher recommended)
- npm (Node Package Manager)
- ffmpeg installed on your system

## Installation

1. Clone this repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the required dependencies:

   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

   ```
   RTSP_URL=rtsp://username:password@ip_address:port/stream_path
   WS_PORT=9999
   FRAME_RATE=30
   ```

   Replace the values with your specific camera settings:
   - `RTSP_URL`: Your IP camera's RTSP URL
   - `WS_PORT`: The WebSocket port (default is 9999)
   - `FRAME_RATE`: The desired frame rate (default is 30)

3. The `server.js` file will automatically use these environment variables:

   ```javascript
   const stream = new Stream({
     name: 'ip_camera_stream',
     streamUrl: process.env.RTSP_URL,
     wsPort: parseInt(process.env.WS_PORT),
     ffmpegOptions: {
       '-stats': '',
       '-r': process.env.FRAME_RATE
     }
   });
   ```

## Usage

1. Start the server by running:

   ```
   node server.js
   ```

2. Open a web browser and navigate to `http://ipaddress:3000`.

3. You should see the video stream from your IP camera displayed in the browser.

## Files

- `server.js`: The main server file that sets up the RTSP stream and serves the web page.
- `index.html`: The HTML file that displays the video stream in the browser.

## Dependencies

- [node-rtsp-stream](https://www.npmjs.com/package/node-rtsp-stream): For handling the RTSP stream
- [express](https://www.npmjs.com/package/express): Web server framework
- [jsmpeg](https://github.com/phoboslab/jsmpeg): JavaScript MPEG1 Video Decoder (client-side)

## Notes

- Ensure your server has sufficient resources to handle video transcoding and multiple client connections.
- The frame rate from the camera should be at least 15fps for proper MPEG1 encoding.

## License

This project is open-source and available under the MIT License.
