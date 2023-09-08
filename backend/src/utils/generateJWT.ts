import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { IAdminRequest } from "../protocols";

function generateJWT(payload: IAdminRequest) {
  const secret = process.env.JWT_SECRET || "suaSenhaSecreta";

  const jwtConfig: object = {
    expiresIn: "10h",
    algorithm: "HS256",
  };

  const token = jwt.sign({ payload }, secret, jwtConfig);

  return token;
}

export default generateJWT;
