import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { IJwtPayload } from "../protocols";

function generateJWT(payload: IJwtPayload) {
  const secret = process.env.JWT_SECRET || "suaSenhaSecreta";

  const jwtConfig: object = {
    expiresIn: "10h",
    algorithm: "HS256",
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
}

export default generateJWT;
