import chalk from "chalk";

const errorHandler = (error, req, res, next) => {
  //TODO: delete this
  console.log(chalk.red("Error occured: "), error);

  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    message:
      error.message ||
      "There is an internal server error. Please try again later.",
  });
};

export default errorHandler;
