import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const filePath = path.join(process.cwd(), "data/properties.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const newData = req.body;

    jsonData.push({
      id: jsonData.length + 1,
      ...newData,
    });

    fs.writeFileSync(filePath, JSON.stringify(jsonData));
 // Thêm độ trễ 2 giây bằng cách sử dụng setTimeout
    setTimeout(() => {
      res.status(200).json({ message: "Add property successfully!" });
    }, 2000);
  } else {
    res.status(405).json({ message: "Error!" });
  }
}