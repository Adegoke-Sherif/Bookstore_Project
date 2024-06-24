import winston from "winston";
// Configuration options for file and console transports
const options = {
  file: {
    level: "info", // Log 'info' level and above to the file
    filename: "./log/app.log", // File path for logs
    handleExceptions: true, // Handle uncaught exceptions
    json: true, // Log in JSON format
    maxsize: 5242880, // 5MB file size limit
    maxFiles: 5, // Maximum number of log files
    colorize: false, // No colorization in log file
  },
  console: {
    level: "debug", // Log 'debug' level and above to the console
    handleExceptions: true, // Handle uncaught exceptions
    json: false, // Log in plain text format
    colorize: true, // Colorize the console output
  },
}

// Create a logger with the specified configuration
const logger = winston.createLogger({
  levels: winston.config.npm.levels, // Use npm logging levels
  transports: [
    new winston.transports.File(options.file), // File transport configuration
    new winston.transports.Console(options.console), // Console transport configuration
  ],
  exitOnError: false // Do not exit on handled exceptions
})

export default logger; // Export the logger for use in other modules
