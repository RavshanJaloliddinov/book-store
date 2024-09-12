const multer = require("multer");
const path = require("path");

// Fayl turini tekshirish (faqat rasm fayllarini qabul qilish)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/; // Ruxsat berilgan fayl turlari
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Fayl kengaytmasini tekshirish
  const mimetype = fileTypes.test(file.mimetype); // MIME turini tekshirish

  if (extname && mimetype) {
    return cb(null, true); // Fayl qabul qilinadi
  } else {
    cb(new Error("Faqat rasm formatidagi fayllarni yuklash mumkin!")); // Xato qaytariladi
  }
};

// Fayllarni saqlash uchun sozlamalar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Fayllar "./uploads" papkasiga saqlanadi
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt); // Fayl nomi
  },
});

// Faqat rasm yuklashga ruxsat beruvchi yuklash sozlamalari
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter // Fayllarni faqat rasm turlariga cheklash
});

module.exports = upload;
