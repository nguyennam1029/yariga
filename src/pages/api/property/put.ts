import { PropertyItemData } from "@/types/property.types";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const filePath = path.join(process.cwd(), "data/properties.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const updateData = req.body;
    const idToUpdate = updateData.id;

    // Find the index of the item to update in jsonData based on the id
    const indexToUpdate = jsonData.findIndex((item: PropertyItemData) => item.id === idToUpdate);

    if (indexToUpdate !== -1) {
      // Update the item with the new data
      jsonData[indexToUpdate] = {
        ...jsonData[indexToUpdate],
        ...updateData,
      };

      fs.writeFileSync(filePath, JSON.stringify(jsonData));

      // Thêm độ trễ 2 giây bằng cách sử dụng setTimeout
      setTimeout(() => {
        res.status(200).json({ message: "Update property successfully!" });
      }, 2000);
    } else {
      res.status(404).json({ message: "Property not found!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
