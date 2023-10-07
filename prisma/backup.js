const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

// const path = "./data";
// if (!fs.existsSync(path)) {
//   fs.mkdirSync(path);
// }

async function backupData() {
  try {
    const data = await prisma.users.findMany(); // Replace 'yourModelName' with the actual model you want to backup.

    fs.writeFile(
      "./prisma/data/users.json",
      JSON.stringify(data, null, 2),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
    console.log("Data backup completed.");
  } catch (error) {
    console.error("Error backing up data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

backupData();
