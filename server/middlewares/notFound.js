const notFound = (req, res) => {
  res.status(404).json({
    message: "Path Not Found - " + req.originalUrl,
  });
};
export default notFound;
