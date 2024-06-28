import Jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  //get the authorization header

  const authorization = req.headers.authorization;
  if(!authorization) {
    return res.status(401).json({ message: "Unauthorized"})
  }
  const bearerToken = authorization.split(" ");
  if(bearerToken.length !==2) {
    return res.status(401).json({ message: "Unauthorized"})
  }

  Jwt.verify(bearerToken[1], process.env.Jwt_SECRET, (err, decoded) => {
    if(err) {
      return res.status(401).json({ message: "Unauthorized"})
    }
    req.user = decoded
    next()
  })
}