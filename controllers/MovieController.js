import prisma from "../config/db.config.js";

const store = async (req, res) => {
  const { name } = req.body;
  const findMovie = await prisma.movie.findUnique({
    where: {
      name,
    },
  });
  if (findMovie) {
    return res.status(401).json({ message: "Movie Already exists"});
  }
  if (!findMovie) {
    const movie = await prisma.movie.create({
      data: { name },
    });
    return res.status(201).json({ message: "Movie added successfully", movie });
  }
};
export default store;
