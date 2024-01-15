import fs from "fs";
import path from "path";

const directory = path.join(__dirname, "../data");
const createMockData = (flag: string) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  const filePath = path.join(directory, "bigFile.txt");

  const writeS = fs.createWriteStream(filePath, { flags: flag });
  for (let i = 0; i < 100_00_000; i++) {
    writeS.write(
      `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley\n`
    );
  }

  const secureFilePath = path.join(directory, "secure.txt");
  const writeToSecureFile = fs.createWriteStream(secureFilePath);

  writeToSecureFile.write('user - prince , password - "super secret password"');
};
createMockData("w");
