import { Webhook } from "svix";
import User from "../model/User.js";

// mangae controller from clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // verify headers
    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });

    // getting data from body
    const { data, type } = req.body;

    // swich case for deffrent events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.json({ message: "user created" });
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        res.json({ message: "user updated" });
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({ message: "user deleted" });
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "faild", message: "webhooks Error" });
  }
};
