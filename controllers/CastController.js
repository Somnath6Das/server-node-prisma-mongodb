import prisma from "../config/db.config.js";

export const index = async (req, res) => {
  try {
    
    const cast = await prisma.cast.findMany({
      include: {
        movie: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.status(200).json({ cast });
  } catch (err) {}
};

export const create = async (req, res) => {
  try {
    const { name, description, movieId } = req.body;
    if (!name || !description || !movieId) {
      return res.status(401).json({ message: "All field required!" });
    }

    const cast = await prisma.cast.create({
      data: { name, description, movieId },
    });
    return res.status(201).json({ message: "cast added successfully", cast });
  } catch (err) {}
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, movieId } = req.body;
    await prisma.cast.update({
      data: {
        name,
        description,
        movieId,
      },
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "cast updated successfully" });
  } catch (err) {}
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cast.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "cast deleted" });
  } catch (err) {}
};
