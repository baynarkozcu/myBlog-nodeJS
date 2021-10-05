const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../uploads/cvs'));
    },

    filename: (req, file, callback) => {
        const currentDate = new Date();
        callback(null, currentDate+"_"+path.extname(file.originalname));
    }

});

const fileFilter = (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if(ext !== '.pdf') {
        return callback(null, false );
    }else{
        callback(null, true);
    }
}


const uploadFile = multer({storage: storage, fileFilter: fileFilter });


module.exports = uploadFile;