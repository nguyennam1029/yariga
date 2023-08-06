import { PropertyItemData } from "@/types/property.types";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const filePath = path.join(process.cwd(), "data/properties.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const idToDelete = parseInt(req.query.id as string);

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const filteredData = jsonData.filter((item: PropertyItemData) => item.id !== idToDelete);

    if (filteredData.length < jsonData.length) {
      fs.writeFileSync(filePath, JSON.stringify(filteredData));

      res.status(200).json({ message: "Xóa mục thành công!" });
    } else {
      res.status(404).json({ message: "Không tìm thấy mục cần xóa." });
    }
  } else {
    res.status(405).json({ message: "Phương thức không hỗ trợ." });
  }
}