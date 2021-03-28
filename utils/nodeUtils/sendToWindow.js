/**
 * Checks to see if requested window exists before attempting to send the provided data to the
 * window on the specified ipc channel.
 *
 * @param {BrowserWindow} window - electron window object
 * @param {String} channel - desired ipc channel to send the message
 * @param {*} data - serializable data you want to send
 */
const sendToWindow = (window, channel, data) => {
  if (window) {
    window.webContents.send(channel, data);
  }
};

module.exports = sendToWindow;
