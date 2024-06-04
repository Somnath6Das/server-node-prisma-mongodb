import prisma from "../config/db.config.js";

export const index = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      select: {
        name: true,
      },
    });
    return res.status(200).json({ movies });
  } catch (err) {}
};

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({ message: "Name is empty" });
    }
    const findMovie = await prisma.movie.findUnique({
      where: {
        name,
      },
    });
    if (findMovie) {
      return res.status(401).json({ message: "Movie Already exists" });
    }
    if (!findMovie) {
      const movie = await prisma.movie.create({
        data: { name },
      });
      return res
        .status(201)
        .json({ message: "Movie added successfully", movie });
    }
  } catch (err) {}
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({ message: "Name is empty" });
    }
    await prisma.movie.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Movie updated successfully" });
  } catch (err) {}
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.movie.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Movie deleted" });
  } catch (err) {}
};
