import fs from 'fs'

export const deleteTempFile = (filePath) => {
    if (filePath) {
        try {
            fs.unlinkSync(filePath); // Delete the file synchronously
            console.log("Temporary file deleted successfully ::", filePath);
        } catch (error) {
            console.error("Error deleting temporary file ::", error.message);
        }
    } else {
        console.warn("No file path provided for deletion :: deleteTempFile");
    }
};