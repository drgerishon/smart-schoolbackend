const { Router } = require("express");
const userController = require("../services/user/userController");
const validateToken = require("../../middleware/validateToken");
const router = Router();

router.get('/test', (req, res) => {
    res.send('running docker');
  });
  

router.post("/create-user", validateToken,  (request, response, next) => {
    userController.createUser(request, response, next);
    }
  );
  
  router.post("/login", function (request, response, next) {
    userController.loginUser(request, response, next);
    }
  );
module.exports = router;
