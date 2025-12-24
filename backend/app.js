import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ToReply from './FileUploadWorker.js'
import chatUpload from './chatUploadWorker.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

const map = {};

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads', 'pdfs');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads/pdfs directory');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check file extension and MIME type
    const fileExt = path.extname(file.originalname).toLowerCase();
    const isValidPDF = fileExt === '.pdf' || file.mimetype === 'application/pdf';
    
    if (isValidPDF) {
      cb(null, uploadsDir);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
  filename: (req, file, cb) => {
    // Sanitize email by replacing @ and . with underscores
    const sanitizedEmail = req.params.gmail.replace(/[@.]/g, '_');
    cb(null, Date.now() + '_' + sanitizedEmail + '.pdf');
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 20 },
  fileFilter: (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (fileExt === '.pdf' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
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
    console.log('Upload request received for:', req.params.gmail);
    
    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    console.log('File uploaded:', req.file.filename, 'Size:', req.file.size);
    
    const gmail = req.params.gmail;
    const date = Date.now();

    if (!map[gmail]) map[gmail] = [];
    map[gmail].push(date);

    const toSend = String(date);

    console.log('Processing file with ToReply...');
    await ToReply(req.file.path, toSend);
    console.log('File processed successfully');

    return res.json({ success: true, path: req.file.path });
  } catch (error) {
    console.error("Upload Error:", error);
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

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, error: 'File too large. Maximum size is 20MB' });
    }
    return res.status(400).json({ success: false, error: err.message });
  }
  if (err) {
    console.error('Error:', err);
    return res.status(400).json({ success: false, error: err.message });
  }
  next();
});

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});