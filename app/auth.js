import { verifyToken } from "./utils"; // 토큰 유효성 검사를 위한 함수 import

// 서버 측 미들웨어 함수
export default async function authMiddleware(req, res, next) {
  // 헤더에서 토큰 추출
  const token = req.headers.authorization?.replace("Bearer ", "");

  // 토큰이 없으면 401 Unauthorized 에러 반환
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 토큰 유효성 검사
    const decoded = await verifyToken(token);
    // 토큰이 유효하지 않으면 401 Unauthorized 에러 반환
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // 유효한 경우 다음 미들웨어로 이동
    return next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}