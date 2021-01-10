import path from 'path'
import express from 'express'

import newSessionCallback from './newSession'
import getEventsCallback from "./getEvents";
import createEventsCallback from "./createEvents";
import deleteEventCallback from "./deleteEvent";

// Main Router File
export default (app, DIST_DIR) => {
  const HTML_FILE = path.join(DIST_DIR, 'index.html');
	
  app.use(express.static(DIST_DIR));

  // Called when client request new session
  app.post('/newSession', newSessionCallback);
  app.post('/getEvents', getEventsCallback);
  app.post('/createEvents', createEventsCallback);
  app.post('/deleteEvent', deleteEventCallback);

  app.get('*', (req, res) => {
    let client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`[GET] (request) : ${req.originalUrl} from ${client_ip}`);

    res.sendFile(HTML_FILE);
  });
}
