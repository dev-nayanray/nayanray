import { sequelize } from "./models/index.js";
import User from "./models/User.js";

const resetPassword = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    const user = await User.findOne({ where: { email: 'admin@nayanray.com' } });
    if (user) {
      user.password = 'admin123';
      await user.save();
      console.log("Password reset to 'admin123' for admin user.");
    } else {
      console.log("Admin user not found.");
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
};

resetPassword();
