module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    //   config.entry('src/index');
    console.log("=====");
    console.log(config.entryPoints);
  });
};
