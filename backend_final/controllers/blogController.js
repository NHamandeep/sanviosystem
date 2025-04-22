import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const imageUrl = req.file?.path || '';

    const newBlog = new Blog({
      title,
      description,
      category,
      imageUrl,
    });

    await newBlog.save();

    res.status(201).json({ message: 'Blog created!', blog: newBlog });
  } catch (error) {
    console.error('❌ Error creating blog:', error);
    res.status(500).json({ error: 'Blog creation failed' });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};
