# moon_active_proj
exc for moon active
assumptions:
1. the server gets the date and content in json or url encoded (uses body parser).
   the content fromat is a simple string and the date is the number of milliseconds since midnight January 1, 1970
   which can be achieved with d = new date; d.getTime()
2. The server prints messages to the console but does not keep on saving them at the database after they were printed to the console.
