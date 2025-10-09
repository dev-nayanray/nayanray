import { sequelize } from "./models/index.js";
import User from "./models/User.js";

const checkUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    const users = await User.findAll();
    console.log("Users in database:", users.map(u => ({ id: u.id, username: u.username, email: u.email })));

    if (users.length > 0) {
      const user = users[0];
      const isValid = await user.checkPassword('admin123');
      console.log("Password 'admin123' valid:", isValid);

      const isValidAdmin = await user.checkPassword('admin');
      console.log("Password 'admin' valid:", isValidAdmin);
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
};

checkUsers();
