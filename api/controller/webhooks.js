import { Webhook } from "svix";
import User from "../model/User.js";

// mangae controller from clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const svixId = req.headers["svix-id"];
    const svixTimestamp = req.headers["svix-timestamp"];
    const svixSignature = req.headers["svix-signature"];

    if (!svixId || !svixTimestamp || !svixSignature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing headers" });
    }

    // Verify webhook
    await webhook.verify(req.body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });

    const { data, type } = JSON.parse(req.body);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          photo: data.image_url || "",
          resume: "",
        };
        await User.create(userData);
        return res.status(200).json({ message: "User created successfully" });
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          photo: data.image_url || "",
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({ message: "User updated successfully" });
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ message: "User deleted successfully" });
      }
      default:
        return res.status(400).json({ message: "Unknown event type" });
    }
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ success: false, message: "Webhook Error" });
  }
};
