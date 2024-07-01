const { masterDbConn } = require("../connector");

const uploadFile = async (fileData) => {
  const { id, userId, fileName, fileType, fileSize, fileBuffer } = fileData;
  const query = `
        INSERT INTO file_data (id, user_id, fileName, fileType, fileSize, file)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  await masterDbConn.query(query, [
    id,
    userId,
    fileName,
    fileType,
    fileSize,
    fileBuffer,
  ]);
};

const getUserFiles = async (userId, showAllFiles, offset = 0, limit = 25) => {
  let query = `
    SELECT id, fileName, fileType, fileSize, created_at, hidden_file
    FROM file_data
    WHERE user_id = ? AND deleted_at IS NULL
`;
  if (!showAllFiles) {
    query += ` AND hidden_file = FALSE`;
  }
  query += ` LIMIT ?, ?`;
  [rows] = await masterDbConn.query(query, [userId, offset, limit]);
  return rows;
};

const hideFiles = async (userId, fileIds) => {
    const query = `
        UPDATE file_data
        SET hidden_file = TRUE
        WHERE user_id = ? AND id IN (?) AND deleted_at IS NULL
    `;
    await masterDbConn.query(query, [userId, fileIds]);
};

const deleteFiles = async (userId, fileIds) => {
    const query = `
        UPDATE file_data
        SET deleted_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND id IN (?) AND deleted_at IS NULL
    `;
    await masterDbConn.query(query, [userId, fileIds]);
};

module.exports = {
  uploadFile,
  getUserFiles,
  hideFiles,
  deleteFiles
};
