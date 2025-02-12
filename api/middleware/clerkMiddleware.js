import { withAuth } from "@clerk/clerk-sdk-node";

const clerkMiddleware = withAuth(async (req, res, next) => {
  try {
    const { userId } = withAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = { id: userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

export default clerkMiddleware;
