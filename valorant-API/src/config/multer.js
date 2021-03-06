const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

module.exports = {
    /**
     * Save files on disk
     */
    storage: multer.diskStorage({
        /**
         * Destination path to save files
         */
        destination: path.resolve(__dirname, 'tmp', 'public', 'agents'),

        /**
         * Filename
         */
        filename: (req, file, cb) => {
            crypto.randomBytes(8, (err, res) => {
                if (err) return cb(err);
                const fileName = res.toString('hex') + path.extname(file.originalname)
                cb(null, fileName);
                return fileName;
            });
        },

    }),
};