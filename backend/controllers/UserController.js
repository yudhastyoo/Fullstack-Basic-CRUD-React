import User from "../models/UserModel.js";
import multer from "multer";
import path from "path";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  const { name, email, gender } = req.body;
  const picture = req.file ? req.file.filename : null;

  if (!name) {
    return res.status(400).json({ msg: "Name is required" });
  }
  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }
  if (!gender) {
    return res.status(400).json({ msg: "Gender is required" });
  }

  try {
    // await User.create(req.body);
    await User.create({ name, email, gender, picture });
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  const { name, email, gender } = req.body;
  const picture = req.file ? req.file.filename : null;

  if (!name) {
    return res.status(400).json({ msg: "Name is required" });
  }
  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }
  if (!gender) {
    return res.status(400).json({ msg: "Gender is required" });
  }

  try {
    await User.update(
      // req.body,
      { name, email, gender, picture },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb(new Error("Images only!"));
    }
  },
});
