// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUdvaTB4a04waFBSTmRsRWVYdldYYlVacVd4Y0twZU04OUpOaGhhMnNHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ3pReVdDWmtPcmx6TkgySUdjZzQ2UGxNcmEyL3dEMDlHNTBESzlWN0xYMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSlRpcGJMOXNhb1p1eGVqdW5Ic1JvWVd3WnRZSDNPZWpRd3NvNng0RVdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1d1Y1K0pNUnhlYlFrSVZIZU1lSnB4NTRaTVJaYmJDcExMVmJiVkdDRGlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjROTUNESzlZMmFtdk1oT2Q5YXFVMU8waTZHVVlqZTZPQWNmbUwvNEN4RVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNQajZyL2xCalhObzZya3RzSXE4aGdDVG5WN1A5VUZXTlgvUFdYa1FkMUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0JOR0tCakhtTWxXYlUwYmhNektCTUNoeXZNT05DL0R2R04zNTVRdXNtaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVJtL216UTc0aVptMnhFb2gycHJCMVVwd0J4cmhqa3FrWFJFN1d5T25YVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNhbzJYVTc0M1pTb1Q0RzN0Z2sxbEFzSmN3ZklDd1lrU2c2UUhReHV4Y25pVEhqNHFXTm0xMjB4V2IvaWk3Yjg4UWwxV21weG5scnZVN25yK1Jac2lBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEwLCJhZHZTZWNyZXRLZXkiOiJzUnhzZGpjTHRUNVVXSGUyR0Q4MWVDZ0lLWnR0K2l0Ukd4VitDeTl1aFB3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzbjlBYTh1Y1RyeW1xaEdTaF85enJ3IiwicGhvbmVJZCI6IjAyNGMzODZiLTZkNDUtNGEzMS04OWI4LTJkYThhZTE1ZmYyMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTVU0L3BETUQwMzJkTEZtc082MlJEWThHZ0U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGRXK3VTSU9HWEtlQ09EenF6TktpTWNNYm84PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik41M1IzUzc3IiwibWUiOnsiaWQiOiI5MjM0NDk0MTI2Mzk6MzdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BHQTVZMEhFT2ZubExnR0dBc2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Imh1WkY5b2V2OGZadHJLamwxWXkybXUwL2hGZUxyMDdpd0piVmtFblJpMlU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IllrTGs3bExGbFVFZVc1WWZmMjN6NUNWSldHU1o3YkxTK0NEMHBiRGRBRWJyMzBPUUV2aXBTT0MwcXo0YUZTU1BoNUJaZEFZbDJLMGRHRDAvVUFiVEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrRVE4akF3Kzk5SVhwSDJmOW1rVUZrSjhmdGU2cVpNT08zU3BqWEJGTlVXNmxQTnBQenZGT2JEbTB1WnlULzFmcHgyU2k1SHFVVWhuamhzc1g5Q3poQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzQ0OTQxMjYzOTozN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZYm1SZmFIci9IMmJheW81ZFdNdHBydFA0UlhpNjlPNHNDVzFaQkowWXRsIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4Mzk0MjI4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU41ZSJ9",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "©Baraka Bega",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "255762190568",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
