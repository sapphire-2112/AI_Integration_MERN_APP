const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");


require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   MongoDB Connection
========================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => {
   console.log("MongoDB Connected");
})
.catch((err) => {
   console.log(err);
});

/* =========================
   Complaint Schema
========================= */

const ComplaintSchema = new mongoose.Schema({

   name: {
      type: String,
      required: true
   },

   email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/
   },

   title: {
      type: String,
      required: true
   },

   description: {
      type: String,
      required: true
   },

   category: {
      type: String,
      required: true
   },

   location: {
      type: String,
      required: true
   },

   status: {
      type: String,
      default: "Pending"
   },

   createdAt: {
      type: Date,
      default: Date.now
   }
});

const Complaint = mongoose.model(
   "Complaint",
   ComplaintSchema
);

/* =========================
   User Schema
========================= */

const UserSchema = new mongoose.Schema({

   email: {

      type: String,

      required: true,

      unique: true
   },

   password: {

      type: String,

      required: true
   },

   role: {

      type: String,

      default: "user"
   }
});

const User = mongoose.model(
   "User",
   UserSchema
);

/* =========================
   JWT Middleware
========================= */

function auth(req, res, next) {

   const token = req.headers.authorization;

   if(!token) {

      return res.status(401).json({
         message: "Access Denied"
      });
   }

   try {

      const verified = jwt.verify(
         token,
         process.env.JWT_SECRET
      );

      req.user = verified;

      next();

   } catch(err) {

      res.status(401).json({
         message: "Invalid Token"
      });
   }
}
function adminOnly(req, res, next) {

   if(req.user.role !== "admin") {

      return res.status(403).json({

         message: "Admin Access Only"
      });
   }

   next();
}

/* =========================
   Default Route
========================= */

app.get("/", (req, res) => {

   res.send("Backend Running");
});

/* =========================
   Signup API
========================= */

app.post("/signup", async (req, res) => {

   try {

      const existingUser = await User.findOne({
         email: req.body.email
      });

      if(existingUser) {

         return res.status(400).json({
            message: "User already exists"
         });
      }

      const hashed = await bcrypt.hash(
         req.body.password,
         10
      );

      const user = new User({

         email: req.body.email,

         password: hashed
      });

      await user.save();

      res.json({
         message: "User created successfully"
      });

   } catch(err) {

      res.status(500).json({
         error: err.message
      });
   }
});

/* =========================
   Login API
========================= */

app.post("/login", async (req, res) => {

   try {

      const user = await User.findOne({
         email: req.body.email
      });

      if(!user) {

         return res.status(401).json({
            message: "User not found"
         });
      }

      const valid = await bcrypt.compare(
         req.body.password,
         user.password
      );

      if(!valid) {

         return res.status(401).json({
            message: "Invalid password"
         });
      }

      const token = jwt.sign(

         {
            id: user._id,
            email: user.email,
            role: user.role
         },

         process.env.JWT_SECRET,

         {
            expiresIn: "1h"
         }
      );

      res.json({
         token
      });

   } catch(err) {

      res.status(500).json({
         error: err.message
      });
   }
});

/* =========================
   Protected Route
========================= */

app.get("/profile", auth, (req, res) => {

   res.json({

      message: "Protected Profile Access",

      user: req.user
   });
});

/* =========================
   Add Complaint
========================= */

app.post("/api/complaints", async (req, res) => {

   try {

      const complaint = new Complaint(req.body);

      await complaint.save();

      res.json({
         message: "Complaint Added Successfully"
      });

   } catch(err) {

      res.status(500).json({
         error: err.message
      });
   }
});

/* =========================
   Get All Complaints
========================= */

app.get("/api/complaints", async (req, res) => {

   try {

      const data = await Complaint.find();

      res.json(data);

   } catch(err) {

      res.status(500).json({
         error: err.message
      });
   }
});

/* =========================
   Search Complaints
========================= */

app.get("/api/complaints/search", async (req, res) => {

   try {

      const data = await Complaint.find({

         location: req.query.location
      });

      res.json(data);

   } catch(err) {

      res.status(500).json({
         error: err.message
      });
   }
});

/* =========================
   Update Complaint
========================= */

app.put(

   "/api/complaints/:id",

   auth,

   adminOnly,

   async (req, res) => {

      try {

         await Complaint.findByIdAndUpdate(

            req.params.id,

            req.body
         );

         res.json({

            message:
            "Complaint Updated"
         });

      } catch(err) {

         res.status(500).json({

            error: err.message
         });
      }
   }
);

/* =========================
   Delete Complaint
========================= */

app.delete(

   "/api/complaints/:id",

   auth,

   adminOnly,

   async (req, res) => {

      try {

         await Complaint.findByIdAndDelete(

            req.params.id
         );

         res.json({

            message:
            "Complaint Deleted"
         });

      } catch(err) {

         res.status(500).json({

            error: err.message
         });
      }
   }
);
app.get(

   "/api/complaints/category/:category",

   async (req, res) => {

      try {

         const data =
         await Complaint.find({

            category:
            req.params.category
         });

         res.json(data);

      } catch(err) {

         res.status(500).json({

            error: err.message
         });
      }
   }
);

/* =========================
   AI Complaint Analyzer
========================= */

app.post("/api/ai/analyze", async (req, res) => {

   try {

      const description =
      req.body.description;

      const prompt = `

Analyze this complaint:

"${description}"

Return:

1. Complaint Priority
2. Responsible Department
3. Short Summary
4. Auto-generated Response

`;

      const response = await axios.post(

         "https://openrouter.ai/api/v1/chat/completions",

         {

            model: "openai/gpt-3.5-turbo",

            messages: [

               {
                  role: "user",

                  content: prompt
               }
            ]
         },

         {

            headers: {

               Authorization:
               `Bearer ${process.env.OPENROUTER_API_KEY}`,

               "Content-Type":
               "application/json"
            }
         }
      );

      res.json({

         result:
         response.data.choices[0]
         .message.content
      });

   } catch(err) {

      console.log(err);

      res.status(500).json({

         error: "AI Analysis Failed"
      });
   }
});

/* =========================
   Start Server
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

   console.log(`Server running on port ${PORT}`);
});