import { Router } from "express";
import { searchItem } from "./controllers";

export const router = Router();

// router.route("/register").post(register);
// router.route("/login").post(login);
// router.use(async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     res.json({ message: "Token not found", status: 403 });
//     return;
//   }
//   jwt.verfiy(token, process.env.SECRET, (err, playload) => {
//     if (err) {
//       res.json({ message: "Invalid token found", status: 500 });
//     }
//     req.user = playload.user;
//     next();
//   });
// });
router.route("/createCategory").post();
router.route("/createSubCategory").post();
router.route("/createItem").post();
router.route("/getCategory/{id}").get();
router.route("/getSubCategory").get();
router.route("/getItem").get();
router.route("/updateCategory").get();
router.route("/updateCategory").get();
router.route("/updateItem/{id}").get();
router.route("/search").get(searchItem);
