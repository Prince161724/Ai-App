import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import ToReply from './FileUploadWorker.js'
import chatUpload from './chatUploadWorker.js'

dotenv. config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

const map = {};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.originalname.includes('pdf')) {
      cb(null, 'uploads/pdfs');
    } else {
      cb(new Error("Not a PDF file"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + req.params.gmail + '.pdf');
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 20 }
});

// Ask question endpoint
app.post('/askQuestion', async (req, res) => {
  try {
    console.log("Got till Here ");
    const { ques, gmail } = req.body;

    if (!ques || !gmail) {
      return res.status(400).json({ error: "Missing 'ques' or 'gmail'" });
    }
console.log("Got till Here 2");
    if (! map[gmail] || map[gmail].length === 0) {
      return res.status(400).json({ error: "No PDF uploaded for this user" });
    }

    const len = map[gmail].length - 1;
    const toSend = String(map[gmail][len]);

    console.log("Got till Here 3");
    const answer = await chatUpload(ques, toSend);
    return res.json({ answer });
  } catch (error) {
    console.log("Got till Here 4");
    console.error("Error:", error);
    return res.status(500).json({ error: error. message });
  }
});

// Upload PDF endpoint
app.post('/:gmail', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error:  "No file uploaded" });
    }

    const gmail = req. params.gmail;
    const date = Date.now();

    if (!map[gmail]) map[gmail] = [];
    map[gmail].push(date);

    const toSend = String(date);

    await ToReply(req.file.path, toSend);

    return res.json({ success: true, path: req.file.path });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Delete PDF endpoint
app.delete('/delete', async (req, res) => {
  const { path } = req.body;

  if (fs.existsSync(path)) {
    fs.unlink(path, (err) => {
      if (err) {
        return res.json({ status: "Error deleting" });
      }
      return res.json({ status: "Deleted" });
    });
  } else {
    return res. json({ status: "Not found" });
  }
});

app.get('/health',(req,res)=>{
return res.json({status:"ok",uptime:process.uptime()})
})

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});