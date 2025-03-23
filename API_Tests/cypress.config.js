const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://restful-booker.herokuapp.com",
    setupNodeEvents(on, config) {
      require("cypress-terminal-report/src/installLogsPrinter")(on, {
        printLogsToConsole: "always",
      });
    },
  },
  env: {
    paths: {
      booking: "/booking",
      bookingById: "/booking/{id}",
      auth: "/auth",
      getBookingIds: "/booking",
      updateBooking: "/booking/{id}",
      deleteBooking: "/booking/{id}",
    },
  },
});
