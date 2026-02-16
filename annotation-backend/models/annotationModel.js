const pool = require("../config/db");

const createAnnotation = async (data) => {
  const { z_coordinate, head_x, head_y, tail_x, tail_y, comment } = data;

  const result = await pool.query(
    `INSERT INTO text_annotations
     (z_coordinate, head_x, head_y, tail_x, tail_y, comment)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [z_coordinate, head_x, head_y, tail_x, tail_y, comment]
  );

  return result.rows[0];
};

const updateAnnotation = async (id, comment) => {
  const result = await pool.query(
    `UPDATE text_annotations
     SET comment = $1,
         edited = TRUE,
         edited_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
    [comment, id]
  );

  return result.rows[0];
};
const updateAnnotationPosition = async (
  id,
  head_x,
  head_y,
  tail_x,
  tail_y
) => {
  const result = await pool.query(
    `UPDATE text_annotations
     SET head_x = $1,
         head_y = $2,
         tail_x = $3,
         tail_y = $4,
         edited = TRUE,
         edited_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`,
    [head_x, head_y, tail_x, tail_y, id]
  );

  return result.rows[0];
};


const getAnnotationsBySlice = async (z) => {
  const result = await pool.query(
    `SELECT * FROM text_annotations
     WHERE ABS(z_coordinate - $1) < 0.001
     ORDER BY created_at ASC`,
    [z]
  );

  return result.rows;
};

const deleteAnnotation = async (id) => {
  await pool.query(
    `DELETE FROM text_annotations WHERE id = $1`,
    [id]
  );
};
module.exports = {
  createAnnotation,
  updateAnnotation,
  updateAnnotationPosition, // 👈 ADD THIS
  getAnnotationsBySlice,
  deleteAnnotation
};
