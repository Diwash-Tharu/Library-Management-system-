import express from "express";

import { borrowedBooks,recordBorrowedBook,  getBorrowedBooksFroAdmin,returnBorrowBook } from "../controllers/borrowControllers.js";

import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/record-borrow-book/:id", isAuthenticated, isAuthorized("Admin"), recordBorrowedBook);
router.get("/borrowed-books-by-users", isAuthenticated, isAuthorized("Admin"),getBorrowedBooksFroAdmin);
router.get("/borrowed-books", isAuthenticated, borrowedBooks);
router.put("/return-borrowed-book/:bookId",isAuthenticated, isAuthorized("Admin"),returnBorrowBook)

export default router;


