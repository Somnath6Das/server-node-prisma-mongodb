import prisma from "../config/db.config.js";

export const index = async (req, res) => {
  try {

    // * pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 1;
    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0 || limit > 100) {
      limit = 1;
    }
    const skip = (page - 1) * limit;

    const movies = await prisma.movie.findMany({
      take: limit,
      skip: skip,
      include: {
        cast: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });
    const totalMovies = await prisma.movie.count();
    const totalPages = Math.ceil(totalMovies / limit);
    return res.status(200).json({ movies, metadata: {
      totalPages, currentPage: page, currentLimit: limit
    } });
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

export const search = async (req,res)=>{
  const query = req.query.q
  const movies = await prisma.movie.findMany({
    where: {
      name:{
        startsWith: query,
        mode: "insensitive", 
        //contains: query
        //equals: query
      }
    }
  })
  return res.status(200).json({ movies });
}
