function index(req, res) {
  res.json({
    message: "Welcome to PodBooth!",
    base_url: "http://podbooth.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
