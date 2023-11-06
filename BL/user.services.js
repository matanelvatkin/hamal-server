const userController = require("../DL/user.controller");
const { sendMail } = require("./email.services");

const getUser = async (fullName, proj) => {
  const user = await userController.readOne({ fullName }, proj);
  if (!user) throw "user nut found";
  return user;
};
const getAllUser = async (admin) => {
  const users = await userController.read({
    organization: admin.organization,
    isDelete: false,
    role:['user', 'admin']
  });
  if (!users) throw "users nut founds";
  return users
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .sort((a, b) => {
      if (!a.isActive && !b.isActive) {
        if (a.position) {
          if (b.position) return a.position.name.localeCompare(b.position.name);
          else return 1
        }
        else{
          if (b.position) return -1;
          else return a.fullName.localeCompare(b.fullName)
        }
      } else return Number(a.isActive) - Number(b.isActive);
    });
};
const getUserForRegister = async (fullName) => {
  const user = await userController.readOne({ fullName, isDelete: false });
  if (user) throw "user already registered";
  return user;
};
const forgetPassword = async (email) => {
  const code = Math.floor(Math.random() * 1000000);
  const subject = "Forget Password";
  const html = `
    <div dir="RTL" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>איפוס סיסמא</h1>
      <p>Dear ${email},</p>
      <p>קיבלנו את בקשתך לאפס את הסיסמה לחשבון שלך..</p>
      <h2>קוד איפוס הסיסמה שלך הוא:${code}</h2>
      <p>לאפס את הקוד אנא הזן קוד זה בטופס איפוס הסיסמה כדי להגדיר סיסמה חדשה.</p>
      <p>אם לא ביקשת איפוס סיסמה, אנא התעלם מאימייל זה.</p>
      <p>,תודה</p>
    </div>`;
  await sendMail(email, subject, html);
  return code;
};
const createUser = async (data, admin) => {
  await getUserForRegister(data.fullName);
  data.organization = admin.organization;
  return await userController.create(data);
};
const updateUser = async (user, dataToUpdate) => {
  return await userController.updateAndReturn({ _id: user._id }, dataToUpdate);
};
const addPosition = async (user, position) => {
  return await userController.updateAndReturn(
    { _id: user._id },
    { position: position._id }
  );
};

const crateAdmin = async (user) => {
  return await userController.updateAndReturn(
    { _id: user._id },
    { role: user.role === "admin" ? "user" : "admin" }
  );
};
const deleteUser = async (user) => {
  return await userController.updateAndReturn(
    { _id: user._id },
    { isDelete: !user.true }
  );
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  getAllUser,
  deleteUser,
  crateAdmin,
  addPosition,
  forgetPassword,
};
