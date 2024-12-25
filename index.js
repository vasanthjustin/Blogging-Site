import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

const blogs = [];
const feedbacks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { blogs }); // Pass 'blogs' to the EJS template
});

app.get("/blog", (req, res) => {
  res.render("blog", { blogs }); // Pass 'blogs' to the EJS template
});

// Route to handle blog submissions
app.post("/add-blog", (req, res) => {
  const { title, author, description, content } = req.body;
  blogs.push({ title, author, description, content });
  console.log(req.body);
  
  res.redirect("/blog");
});

// Route to handle blog deletions
app.post("/delete-blog/:id", (req, res) => {
  const blogId = parseInt(req.params.id, 10);

  // Ensure the index is valid
  if (blogId >= 0 && blogId < blogs.length) {
    blogs.splice(blogId, 1); // Remove the blog at the specified index
    res.redirect("/blog");
  } else {
    res.status(404).send("Blog not found");
  }
});

// Route to render the feedback page
app.get("/feedback", (req, res) => {
  res.render("feedback", { feedbacks }); // Pass 'feedbacks' to the EJS template
});

// Route to handle feedback submissions
app.post("/add-feedback", (req, res) => {
  const { firstName, lastName, email, number, message } = req.body;
  feedbacks.push({ firstName, lastName, email, number, message });
  console.log(req.body);
  res.redirect("/feedback");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
