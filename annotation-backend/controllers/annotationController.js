const annotationModel = require("../models/annotationModel");

exports.createAnnotation = async (req, res) => {
  try {
    const annotation = await annotationModel.createAnnotation(req.body);
    res.status(201).json(annotation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnnotation = async (req, res) => {
  try {
    const updated = await annotationModel.updateAnnotation(
      req.params.id,
      req.body.comment
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateAnnotationPosition = async (req, res) => {
  try {
    const { head_x, head_y, tail_x, tail_y } = req.body;

    const updated = await annotationModel.updateAnnotationPosition(
      req.params.id,
      head_x,
      head_y,
      tail_x,
      tail_y
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnnotations = async (req, res) => {
  try {
    const data = await annotationModel.getAnnotationsBySlice(req.params.z);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteAnnotation = async (req, res) => {
  try {
    await annotationModel.deleteAnnotation(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
