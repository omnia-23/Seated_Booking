import jwt from "jsonwebtoken";

class tokenUtil {
  static verifyAndExtract(token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  }
}
export default tokenUtil;
