const express = require("express");
const router = express.Router();
const controller = require("../controllers/annotationController");

router.post("/", controller.createAnnotation);
router.put("/:id", controller.updateAnnotation);
router.get("/:z", controller.getAnnotations);
router.delete("/:id", controller.deleteAnnotation);
router.put("/:id/position", controller.updateAnnotationPosition);

module.exports = router;
