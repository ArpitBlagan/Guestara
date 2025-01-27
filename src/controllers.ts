import { Response, Request } from "express";
import { prisma } from "./db";
import * as z from "zod";
// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.json({
//       message: "Need all the required field to perform register action :(",
//       status: 400,
//     });
//     return;
//   }
//   try {
//     const user = await prisma.user.find({ where: { email: email } });
//     if (!user) {
//       res.json({
//         messag: "Incorrect email password combination :(",
//         status: 403,
//       });
//       return;
//     }
//     const comp = await bcrypt.compare(password, user.password);
//     if (comp) {
//       const token = jwt.sign(
//         {
//           user: user,
//         },
//         process.env.SECRET || "asfsda1213f"
//       );
//       res.cookie("token", token, { sameSite: "none", httpOnly: true });
//       res.json({
//         messag: "successfully logged in :)",
//         status: 200,
//       });
//       return;
//     }
//     res.json({
//       messag: "Incorrect email password combination :(",
//       status: 403,
//     });
//   } catch (err) {
//     console.log(err);
//     res.json({ message: "Internal server error :(", status: 500 });
//   }
// };

// export const register = async (req: Request, res: Response) => {
//   const { name, email, image, password } = req.body;
//   if (!name || !email || !image || !password) {
//     res.json({
//       message: "Need all the required field to perform register action :(",
//       status: 400,
//     });
//     return;
//   }
//   try {
//     const user = await prisma.user.find({ where: { email } });
//     if (!user) {
//       res.json({
//         messag: "Email already registered :(",
//         status: 403,
//       });
//       return;
//     }
//     const hash = bcrypt.hash(password, 10);
//     await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hash,
//         image,
//       },
//     });
//     res.json({ message: "Successfully registered :)", status: 202 });
//   } catch (err) {
//     console.log(err);
//     res.json({ message: "Internal server error :(", status: 500 });
//   }
// };
const catBody = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  tax_applicability: z.boolean(),
  tax: z.number().optional(),
  taxType: z.string().optional(),
});
export const createCategory = async (req: Request, res: Response) => {
  const body = catBody.safeParse(req.body);
  if (!body) {
    res.json({ message: "Invalid request body :(", status: 413 });
    return;
  }
  try {
    await prisma.category.create({ data: { ...req.body } });
    res.json({ message: "category created successfully :(", status: 202 });
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server error :(", status: 500 });
  }
};
const subCatBody = z.object({
  name: z.string(),
  image: z.string(),
  tax_applicability: z.boolean(),
  tax: z.number().optional(),
  catId: z.string(),
  base_amount: z.number(),
  discount: z.number(),
  total_amount: z.number(),
});

export const createSubCategory = async (req: Request, res: Response) => {
  const body = subCatBody.safeParse(req.body);
  if (!body) {
    res.json({ message: "Invalid request body :(", status: 413 });
    return;
  }
  try {
    await prisma.subcategory.create({ data: { ...req.body } });
    res.json({ message: "subCategory created successfully :(", status: 202 });
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server error :(", status: 500 });
  }
};
const itemBody = z.object({
  subCat: z.string(),
  name: z.string(),
  image: z.string(),
  tax_applicability: z.boolean(),
  tax: z.number().optional(),
});

export const createItem = async (req: Request, res: Response) => {
  const body = itemBody.safeParse(req.body);
  if (!body) {
    res.json({ message: "Invalid request body :(", status: 413 });
    return;
  }
  try {
    await prisma.item.create({ data: { ...req.body } });
    res.json({ message: "subCategory created successfully :(", status: 202 });
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server error :(", status: 500 });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.json({
      message: "We need category id to for updating its data :(",
      status: 400,
    });
    return;
  }
  try {
    await prisma.category.update({
      where: { id },
      data: { ...req.body },
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server error :(", status: 500 });
  }
};

export const updateSubCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.json({
      message: "We need sub-category id to for updating its data :(",
      status: 400,
    });
    return;
  }
  try {
    await prisma.subcategory.update({
      where: { id },
      data: { ...req.body },
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server error :(", status: 500 });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.json({
      message: "We need item id to for updating its data :(",
      status: 400,
    });
    return;
  }
  try {
    await prisma.item.update({
      where: { id },
      data: { ...req.body },
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server error :(", status: 500 });
  }
};

export const searchItem = async (req: Request, res: Response) => {
  const { name } = req.params;
  if (!name) {
    res.json({ message: "Name field is empty", status: 400 });
    return;
  }
  try {
    const items = await prisma.item.findMany({
      where: {
        name: {
          contains: name, // Matches anywhere in the string
          mode: "insensitive", // Case-insensitive match
        },
      },
    });
    res.json({ items, status: 200 });
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server error :(", status: 500 });
  }
};
